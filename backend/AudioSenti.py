import nltk
import speech_recognition as sr
from nltk.sentiment import SentimentIntensityAnalyzer

def analyze_sentiment(audio_file):   
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
        text = recognizer.recognize_google(audio_data)

        sid = SentimentIntensityAnalyzer()
        sentiment_score = sid.polarity_scores(text)['compound']

        threshold = 0.5

        if sentiment_score >= threshold:
            classification = "formal"
        else:
             classification = "informal"

        return classification