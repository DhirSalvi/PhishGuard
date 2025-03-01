from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
import os
import tldextract
import re

# Define paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.abspath(os.path.join(BASE_DIR, "../models"))

# Model paths
url_model_path = os.path.join(MODEL_DIR, "phishing_url_model.pkl")
email_model_path = os.path.join(MODEL_DIR, "phishing_email_model.pkl")
scaler_path = os.path.join(MODEL_DIR, "scaler.pkl")
vectorizer_path = os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl")

# Ensure all models exist
for path in [url_model_path, email_model_path, scaler_path, vectorizer_path]:
    if not os.path.exists(path):
        raise FileNotFoundError(f"❌ Required model file not found: {path}. Train the models first.")

# Load trained models and pre-processing tools
url_model = joblib.load(url_model_path)
email_model = joblib.load(email_model_path)
scaler = joblib.load(scaler_path)
vectorizer = joblib.load(vectorizer_path)

# FastAPI app
app = FastAPI(title="Phishing Detection API", version="1.0")

# Label Mapping
url_label_mapping = {0: "Benign", 1: "Defacement", 2: "Malware", 3: "Phishing"}
email_label_mapping = {0: "Safe Email", 1: "Phishing Email"}

# Request Body Models
class URLRequest(BaseModel):
    url: str

class EmailRequest(BaseModel):
    email_text: str

def extract_url_features(url):
    """
    Extract numerical and categorical features from a URL for prediction.
    """
    features = {
        "url_length": len(url),
        "num_dots": url.count("."),
        "num_hyphens": url.count("-"),
        "num_slashes": url.count("/"),
        "num_at": url.count("@"),
        "num_percent": url.count("%"),
        "num_equals": url.count("="),
        "num_question": url.count("?"),
        "num_ampersand": url.count("&"),
        "num_digits": sum(c.isdigit() for c in url),
        "https": 1 if url.startswith("https") else 0
    }

    extracted = tldextract.extract(url)
    features["subdomain_length"] = len(extracted.subdomain)
    features["domain_length"] = len(extracted.domain)
    features["tld_length"] = len(extracted.suffix)

    return pd.DataFrame([features])

def preprocess_email(email_text):
    """
    Preprocess email text and transform it using the TF-IDF vectorizer.
    """
    if pd.isna(email_text) or not isinstance(email_text, str):
        email_text = ""

    email_text = re.sub(r"\s+", " ", email_text).strip().lower()  # Normalize spaces & convert to lowercase
    email_text = re.sub(r"[^\w\s]", "", email_text)  # Remove punctuation/special characters

    # Transform using the trained TF-IDF vectorizer
    email_features = vectorizer.transform([email_text])

    return email_features

@app.post("/predict/url/")
async def predict_url(request: URLRequest):
    """
    Predict if a URL is Phishing, Benign, Malware, or Defacement.
    """
    url = request.url.strip()
    features_df = extract_url_features(url)

    # Standardize features
    features_scaled = scaler.transform(features_df)

    # Predict
    prediction = url_model.predict(features_scaled)[0]
    prediction_label = url_label_mapping[prediction]

    return {"url": url, "prediction": prediction_label}

@app.post("/predict/email/")
async def predict_email(request: EmailRequest):
    """
    Predict if an email is phishing or safe.
    """
    email_text = request.email_text.strip()
    features_df = preprocess_email(email_text)

    # Predict
    prediction = email_model.predict(features_df)[0]
    prediction_label = email_label_mapping[prediction]

    return {"email": email_text[:50] + ('...' if len(email_text) > 50 else ''), "prediction": prediction_label}

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Phishing Detection API is running!"}
