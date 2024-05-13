from flask import Flask, request, jsonify
from flask_cors import CORS
from moviepy.editor import VideoFileClip
from collections import Counter
import nltk
nltk.download('vader_lexicon')
import speech_recognition as sr
from nltk.sentiment import SentimentIntensityAnalyzer
import cv2
import numpy as np
from roboflow import Roboflow
from AudioSenti import analyze_sentiment
from StutterCheck import analyze_stutter


rf = Roboflow(api_key="R_API_KEY")

project_f = rf.workspace().project("face-emotion-s9kw9")
model_f = project_f.version(1).model

project_d = rf.workspace().project("dress-model-gknib")
model_d = project_d.version(1).model

def highest_confidence_class(model,image):
    predictions = model.predict(image).json()['predictions']
    max_confidence = float('-inf')
    max_class = None
    
    for prediction in predictions:
        if 'predictions' in prediction:
            for class_name, data in prediction['predictions'].items():
                confidence = data.get('confidence', 0)
                if confidence > max_confidence:
                    max_confidence = confidence
                    max_class = class_name
    
    return max_class


def get_best(model,vid):
    cap = cv2.VideoCapture(vid)
    frame_total=int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    step=int(0.1*frame_total)
    result_list=[]
    for i in range(0,frame_total,step):
        cap.set(1,i)
        ret, frame = cap.read()
        if not ret:
            break
        result = highest_confidence_class(model,frame)
        result_list.append(np.argmax(result))

    return Counter(result).most_common(1)[0][0]




app=Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/')
def home():
  return jsonify({"hello":"world"})
app.route('/upload',methods=['POST'])
def upload():
  if request.method=='POST':
    if 'video' not in request.files:
            return jsonify({"error": "No file part"})
    vid = request.files['video']
    if vid.filename == '':
        return jsonify({"error": "a error occured"})

    vid.save('temp.mp4')
    vid_path='temp.mp4'

    vidf=VideoFileClip(vid_path)
    aud=vidf.audio

    aud.write_audiofile('temp.wav')
    audf='temp.wav'


    emotion=get_best(model_f,vid)[1::]
    dress_code=get_best(model_d,vid)
    sentiment=analyze_sentiment(audf)
    stutter=analyze_stutter(audf)


    if dress_code=="0Coat" or dress_code=="1Shirt":
        dress="Formal"
    else:
        dress="Informal"

  return jsonify({"Emotion":emotion,
                  "Dress":dress,
                  "Sentiment":sentiment,
                  "Stutter":stutter})

if __name__=='__main__':
  app.run()
