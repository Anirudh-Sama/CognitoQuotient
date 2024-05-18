def analyze_stutter(audio):

    audio_duration = len(audio)
    stutter_count = 0
    stutter_threshold = 0.5  # You may need to adjust this based on your analysis

    words = audio.split()  # Using 'audio.text' to access the transcribed text
    expected_word_duration = audio_duration / len(words)

    for word in words:
        actual_word_duration = len(word) * expected_word_duration / len(audio)
        if abs(actual_word_duration - expected_word_duration) > stutter_threshold:
            stutter_count += 1

    if stutter_count > 0:
        return f"Stuttering detected with {stutter_count} instances."
    else:
        return "No stuttering detected."

