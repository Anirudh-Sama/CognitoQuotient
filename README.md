
# CognitoQuotient: Understanding minds at a Glance
<img align="right" height="100" src="frontend/assets/images/readme_icon.png"  />


CognitoQuotient is a React Native application that enables users to take a quiz, record their responses via video, and upload the video for analysis. The results are then displayed on a separate screen. The project includes a Python backend for handling video uploads and analysis.

The landscape of talent assessment has evolved significantly in response to the demands
of today's competitive job market and the emergence of advanced technologies. In this
context, a range of related work encompasses cutting-edge practices and methodologies
aimed at enhancing the efficacy, fairness, and objectivity of talent assessment processes.
From the utilization of psychometric assessments to the integration of AI-driven
algorithms and predictive analytics, organizations are leveraging innovative tools to
identify, evaluate, and select top-tier talent. Furthermore, ethical considerations play a
crucial role in shaping the implementation and governance of these technologies, ensuring
transparency, fairness, and compliance with privacy regulations.

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg" height="40" alt="babel logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" height="40" alt="tailwindcss logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height="40" alt="python logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height="40" alt="flask logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" height="40" alt="opencv logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" height="40" alt="pytorch logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" height="40" alt="tensorflow logo"  />
</div>


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [APIs](#apis)
- [Dependencies](#dependencies)


## Installation

To set up this project locally, follow these steps:

### Frontend

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Pirates-of-The-Galaxy/CognitoQuotient.git
   cd CognitoQuotient
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Expo CLI** (if not already installed):
   ```bash
   npm install -g expo-cli
   ```

4. **Start the project**:
   ```bash
   expo start
   ```

### Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Set up a virtual environment**:
   ```bash
   python3 -m venv venv
   source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the backend server**:
   ```bash
   python app.py
   ```

## Usage

1. **Home Screen**: Choose options and navigate through different screens.
2. **Quiz Screen**: Take the quiz with the provided questions.
3. **Recording Screen**: Record your response via the camera.
4. **Upload Screen**: Upload the recorded video.
5. **Result Screen**: View the analysis results of your uploaded video.

## Project Structure

### Frontend

```
/src
  /assests
    /images
  /components
    Box_EQ.js
    Box.js
  /constants
    theme.js
  /data
    EQquizdata.js
    quizdata.js
  /screens
    Home.js
    Disc.js
    Option.js
    Quiz.js
    Tst.js
    Try.js
    Result.js
  App.js
  app.json
  package.json

```

### Backend

```
/backend
  app.py
  requirements.txt
  AudioSenti.py
  StutterCheck.py
  .gitignore
```

### Components

#### `Result.js`
Displays the results of the video analysis. It uses `useRoute` to get the passed data and `useLayoutEffect` to hide the header.

#### `Try.js`
Handles the quiz questions and video recording functionality. It requests camera and microphone permissions and provides buttons to start/stop recording.

#### `FileUpload.js`
Allows users to pick a video from the library and upload it to the server. After successful upload, it navigates to the `Result` screen with the response data.


### APIs

- **POST /upload**
  - Description: Uploads a video file for processing.
  - Request: Multipart form data with a key `video` containing the video file.
  - Response: JSON indicating success or failure.

### Dependencies

#### Frontend

- react-native
- expo
- @react-navigation/native
- @react-navigation/native-stack
- expo-camera
- expo-media-library
- axios

#### Backend

- Flask
- flask_cors
- moviepy
- nltk
- speech_recognition
- opencv-python
- numpy
- roboflow
