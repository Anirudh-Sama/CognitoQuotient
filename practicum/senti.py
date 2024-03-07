from flask import Flask, render_template, request
import librosa
from textblob import TextBlob
import speech_recognition as sr

app = Flask(__name__)

def extract_text_from_audio(audio_path):
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_path) as source:
        audio_data = recognizer.record(source)

    try:
        # Use Google Speech Recognition
        text = recognizer.recognize_google(audio_data)
        return text
    except sr.UnknownValueError:
        print("Speech recognition could not understand audio")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")
        return ""
    except Exception as e:
        print(f"Error: {e}")
        return ""

def analyze_sentiment(text):
    blob = TextBlob(text)
    sentiment_score = blob.sentiment.polarity
    
    if sentiment_score > 0.7:
        sentiment_label = "Positive"
    elif sentiment_score < 0.2:
        sentiment_label = "Negative"
    else:
        sentiment_label = "Neutral"

    return sentiment_score, sentiment_label

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            return render_template('index.html', error="No file part")

        file = request.files['file']

        if file.filename == '':
            return render_template('index.html', error="No selected file")

        if file:
            audio_path = "uploaded_audio.wav"
            file.save(audio_path)

            # Extract text from audio
            audio_text = extract_text_from_audio(audio_path)

            if audio_text:
                # Analyze sentiment
                sentiment_score, sentiment_label = analyze_sentiment(audio_text)
                return render_template('index.html', sentiment_score=sentiment_score, sentiment_label=sentiment_label)
            else:
                return render_template('index.html', error="No text extracted from the audio.")

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=100)
