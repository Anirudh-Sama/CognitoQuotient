import nltk
import speech_recognition as sr
from nltk.sentiment import SentimentIntensityAnalyzer

# Function to perform sentiment analysis on text
def analyze_sentiment(text):
    sid = SentimentIntensityAnalyzer()
    sentiment_score = sid.polarity_scores(text)['compound']
    return sentiment_score

# Function to convert audio to text
def audio_to_text(audio_file):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)
    return text

# Specify the path to your audio file
audio_file_path = "C:\\Users\\shiva\\Downloads\\WhatsApp Audio 2024-02-24 at 1.39.15 PM.wav"

# Convert audio to text
audio_text = audio_to_text(audio_file_path)

# Analyze sentiment to classify the audio text as formal or informal
sentiment_score = analyze_sentiment(audio_text)

# Define a threshold for sentiment score
threshold = 0.5  # Adjust this threshold based on your data and requirements

# Classify the text based on sentiment score
if sentiment_score >= threshold:
    classification = "formal"
else:
    classification = "informal"

# Print the classification
print(classification)
