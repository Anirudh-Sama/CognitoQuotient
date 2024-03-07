import speech_recognition as sr
from transformers import pipeline

def analyze_audio(audio_path):
    audio = "C:\\Users\\shiva\\Downloads\\WhatsApp Ptt 2024-02-14 at 10.19.45 PM.wav"

    audio_duration = len(audio)

    # Initialize variables for stuttering analysis
    stutter_count = 0

    # Define a threshold for pause duration (adjust as needed)
    stutter_threshold = 0.5  # You may need to adjust this based on your analysis

    # Split the audio into words
    words = audio.split()  # Using 'audio.text' to access the transcribed text

    # Calculate the expected duration of each word based on the total duration and the number of words
    expected_word_duration = audio_duration / len(words)

    # Check if the actual duration of each word deviates significantly from the expected duration
    for word in words:
        actual_word_duration = len(word) * expected_word_duration / len(audio)
        if abs(actual_word_duration - expected_word_duration) > stutter_threshold:
            stutter_count += 1

    # Determine if stuttering is present based on the stutter count
    if stutter_count > 0:
        return f"Stuttering detected with {stutter_count} instances."
    else:
        return "No stuttering detected."



if __name__ == "__main__":
    # Analyze Audio
    audio_analysis_result = analyze_audio("C:\\Users\\shiva\\Downloads\\WhatsApp Ptt 2024-02-14 at 10.19.45 PM.wav")


    # Displaying the results
    print(f"Audio Analysis Result: {audio_analysis_result}")

