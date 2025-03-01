import pickle
import re
import requests
from flask import Flask, jsonify
from telethon import TelegramClient
import asyncio

# Load the trained phishing detection model
with open("spam_classifier.pkl", "rb") as file:
    model = pickle.load(file)

# Telegram API credentials
API_ID = 21434478
API_HASH = "b98eb6065609c23fc1e7a88427f5e693"
CHANNEL_ID = 2316273702  # Ensure it's negative for supergroups/channels

# VirusTotal API Key
VIRUSTOTAL_API_KEY = "eb43169cd25590190195a00ad3c12f9d718892da9c792511bcfb4326cbd0a4e8"

# Flask app
app = Flask(__name__)

# Function to preprocess the message
def preprocess_message(text):
    return [text]  # Modify if preprocessing is required

# Function to extract URLs from a message
def extract_url(text):
    url_pattern = r"https?://[^\s]+"  # Regex pattern to detect URLs
    return re.findall(url_pattern, text) or None

# Function to check URL on VirusTotal
def check_url_virustotal(url):
    url_scan_endpoint = "https://www.virustotal.com/api/v3/urls"
    headers = {"x-apikey": VIRUSTOTAL_API_KEY}
    data = {"url": url}

    response = requests.post(url_scan_endpoint, headers=headers, data=data)
    if response.status_code == 200:
        result = response.json()
        url_id = result["data"]["id"]

        # Fetch scan results
        scan_result_endpoint = f"https://www.virustotal.com/api/v3/analyses/{url_id}"
        result_response = requests.get(scan_result_endpoint, headers=headers)
        
        if result_response.status_code == 200:
            analysis = result_response.json()
            malicious_count = analysis["data"]["attributes"]["stats"]["malicious"]
            return {"url": url, "malicious_count": malicious_count}
    return {"url": url, "error": "Error checking URL"}

# Function to fetch and predict phishing messages
async def fetch_and_predict():
    async with TelegramClient("session_name", API_ID, API_HASH) as client:
        messages = await client.get_messages(CHANNEL_ID, limit=10)  # Fetch last 10 messages
        results = []
        
        for msg in messages:
            text = msg.text
            if not text:
                continue

            message_result = {"message": text, "urls": [], "is_phishing": False}
            urls = extract_url(text)
            
            if urls:
                for url in urls:
                    url_result = check_url_virustotal(url)
                    message_result["urls"].append(url_result)

            non_url_text = re.sub(r"https?://[^\s]+", "", text).strip()
            if non_url_text:
                prediction = model.predict(preprocess_message(non_url_text))
                message_result["is_phishing"] = bool(prediction[0] == 1)  # Ensure JSON compatibility

            results.append(message_result)
        return results

@app.route("/check_messages", methods=["GET"])
def check_messages():
    messages_data = asyncio.run(fetch_and_predict())
    return jsonify({"messages": messages_data})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
