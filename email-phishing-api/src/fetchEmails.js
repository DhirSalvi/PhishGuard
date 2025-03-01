const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

// Load credentials
const TOKEN_PATH = path.join(__dirname, "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "client_secret.json");

// Authenticate Google API
async function authorize() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH, "utf8"));
    
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
    oAuth2Client.setCredentials(token);
    
    return oAuth2Client;
}

// Function to extract URLs from a string
function extractUrls(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
}

// Fetch emails from Gmail
async function fetchEmails() {
    try {
        const auth = await authorize();
        const gmail = google.gmail({ version: "v1", auth });

        const res = await gmail.users.messages.list({
            userId: "me",
            maxResults: 5, // Fetch latest 5 emails
        });

        const messages = res.data.messages || [];
        if (messages.length === 0) {
            return { message: "No emails found." };
        }

        // Fetch full email details
        const emailData = [];
        for (const msg of messages) {
            const email = await gmail.users.messages.get({ userId: "me", id: msg.id });
            
            // Extract important fields
            const headers = email.data.payload.headers;
            const from = headers.find(h => h.name === "From")?.value || "Unknown";
            const subject = headers.find(h => h.name === "Subject")?.value || "No Subject";
            const snippet = email.data.snippet || ""; // Short preview of the email content
            
            // Extract email body (only if available in text format)
            let emailBody = "";
            if (email.data.payload?.body?.data) {
                emailBody = Buffer.from(email.data.payload.body.data, "base64").toString("utf-8");
            } else if (email.data.payload?.parts) {
                for (const part of email.data.payload.parts) {
                    if (part.mimeType === "text/plain" && part.body?.data) {
                        emailBody = Buffer.from(part.body.data, "base64").toString("utf-8");
                        break;
                    }
                }
            }

            // Extract URLs from the email body
            const urls = extractUrls(emailBody);

            emailData.push({ from, subject, snippet, urls });
        }

        return emailData;
    } catch (error) {
        console.error("Error fetching emails:", error);
        return { error: "Failed to fetch emails" };
    }
}

module.exports = fetchEmails;
