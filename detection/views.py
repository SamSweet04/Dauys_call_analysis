# from django.shortcuts import render
# from transformers import pipeline
# import speech_recognition as sr
# from pydub import AudioSegment
# import librosa
# import numpy as np
# import os
# from googletrans import Translator

# translator = Translator()
# emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")

# def analyze_audio(request):
#     if request.method == 'POST' and request.FILES['audio']:
#         audio_file = request.FILES['audio']

#         input_audio_path = 'temp_audio_input'
#         output_audio_path = 'temp_audio.wav'

#         # Save the uploaded audio file
#         with open(input_audio_path, 'wb') as f:
#             f.write(audio_file.read())

#         try:
#             audio = AudioSegment.from_file(input_audio_path)
#             audio.export(output_audio_path, format="wav")
#         except Exception as e:
#             return render(request, 'detection/index.html', {'error': f'Ошибка преобразования аудио: {str(e)}'})

#         try:
#             y, sample_rate = librosa.load(output_audio_path)
#             pitch = librosa.yin(y, fmin=50, fmax=300)
#             volume = np.mean(librosa.feature.rms(y=y))

#             acoustic_emotion = "Neutral"
#             if np.mean(pitch) > 200 and volume > 0.02:
#                 acoustic_emotion = "Anger"
#             elif np.mean(pitch) < 150 and volume < 0.015:
#                 acoustic_emotion = "Calm/Satisfaction"
#             elif np.mean(pitch) > 180 and volume > 0.02:
#                 acoustic_emotion = "Fear"
#             elif np.mean(pitch) < 120 and volume < 0.01:
#                 acoustic_emotion = "Sadness"
#             elif np.mean(pitch) > 220 and volume > 0.025:
#                 acoustic_emotion = "Surprise"
#         except Exception as e:
#             return render(request, 'detection/index.html', {'error': f'Ошибка анализа акустических характеристик: {str(e)}'})

#         # Преобразование аудио в текст на русском языке
#         recognizer = sr.Recognizer()
#         with sr.AudioFile(output_audio_path) as source:
#             audio_data = recognizer.record(source)
#             try:
#                 text = recognizer.recognize_google(audio_data, language="ru-RU")
#                 translated_text = translator.translate(text, src="ru", dest="en").text
#                 # Определение эмоций на основе переведенного текста
#                 text_emotion = emotion_classifier(translated_text)
#             except sr.UnknownValueError:
#                 text = "Речь не распознана"
#                 text_emotion = [{"label": "Neutral", "score": 1.0}]
#             except sr.RequestError:
#                 return render(request, 'detection/index.html', {'error': 'Ошибка при использовании API распознавания речи'})

#         os.remove(input_audio_path)
#         os.remove(output_audio_path)

#         final_emotion = acoustic_emotion
#         if text_emotion[0]['label'] == "anger" and acoustic_emotion == "Anger":
#             final_emotion = "High Anger"
#         elif text_emotion[0]['label'] == "joy" and acoustic_emotion == "Calm/Satisfaction":
#             final_emotion = "High Satisfaction"
#         elif text_emotion[0]['label'] == "fear" and acoustic_emotion == "Fear":
#             final_emotion = "High Fear"
#         elif text_emotion[0]['label'] == "sadness" and acoustic_emotion == "Sadness":
#             final_emotion = "High Sadness"
#         elif text_emotion[0]['label'] == "surprise" and acoustic_emotion == "Surprise":
#             final_emotion = "High Surprise"
#         elif text_emotion[0]['label'] == "anger":
#             final_emotion = "Moderate Anger"
#         elif text_emotion[0]['label'] == "joy":
#             final_emotion = "Moderate Satisfaction"
#         elif text_emotion[0]['label'] == "fear":
#             final_emotion = "Moderate Fear"
#         elif text_emotion[0]['label'] == "sadness":
#             final_emotion = "Moderate Sadness"
#         elif text_emotion[0]['label'] == "surprise":
#             final_emotion = "Moderate Surprise"

#         if text_emotion[0]['label'] == 'anger':
#             confidence_class = 'anger'
#         elif text_emotion[0]['label'] == 'joy':
#             confidence_class = 'joy'
#         elif text_emotion[0]['label'] == 'fear':
#             confidence_class = 'fear'
#         elif text_emotion[0]['label'] == 'sadness':
#             confidence_class = 'sadness'
#         elif text_emotion[0]['label'] == 'surprise':
#             confidence_class = 'surprise'
#         elif text_emotion[0]['label'] == 'calm':
#             confidence_class = 'calm'
#         else:
#             confidence_class = 'neutral'

#         return render(request, 'detection/result.html', {
#             'emotion': final_emotion,
#             'confidence': text_emotion[0]['score'],
#             'confidence_class': confidence_class,
#             'original_text': text,
#             'acoustic_emotion': acoustic_emotion,
#             'text_emotion': text_emotion[0]['label']
#         })

#     return render(request, 'detection/index.html')

from django.http import JsonResponse
from transformers import pipeline
import speech_recognition as sr
from pydub import AudioSegment
import librosa
import numpy as np
import os
from googletrans import Translator
import base64
import tempfile
from django.views.decorators.csrf import csrf_exempt

# Initialize translation and emotion classifiers
translator = Translator()
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")


@csrf_exempt
def analyze_audio(request):
    if request.method == 'POST':
        try:
            # Retrieve the uploaded audio file
            audio_file = request.FILES['audio']
            with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_audio:
                for chunk in audio_file.chunks():
                    temp_audio.write(chunk)
                input_audio_path = temp_audio.name
            print(f"Audio saved to temporary file: {input_audio_path}")

            # Convert to WAV format if necessary
            output_audio_path = input_audio_path.replace(".wav", "_converted.wav")
            audio = AudioSegment.from_file(input_audio_path)
            audio.export(output_audio_path, format="wav")
            print(f"Audio converted to WAV format: {output_audio_path}")

            # Load audio for acoustic analysis
            y, sample_rate = librosa.load(output_audio_path)
            pitch = librosa.yin(y, fmin=50, fmax=300)
            volume = np.mean(librosa.feature.rms(y=y))

            # Analyze acoustic features for emotion
            acoustic_emotion = "Neutral"
            if np.mean(pitch) > 200 and volume > 0.02:
                acoustic_emotion = "Anger"
            elif np.mean(pitch) < 150 and volume < 0.015:
                acoustic_emotion = "Calm/Satisfaction"
            elif np.mean(pitch) > 180 and volume > 0.02:
                acoustic_emotion = "Fear"
            elif np.mean(pitch) < 120 and volume < 0.01:
                acoustic_emotion = "Sadness"
            elif np.mean(pitch) > 220 and volume > 0.025:
                acoustic_emotion = "Surprise"
            print(f"Acoustic emotion determined: {acoustic_emotion}")

            # Convert audio to text and translate
            recognizer = sr.Recognizer()
            with sr.AudioFile(output_audio_path) as source:
                audio_data = recognizer.record(source)
                try:
                    text = recognizer.recognize_google(audio_data, language="ru-RU")
                    translated_text = translator.translate(text, src="ru", dest="en").text
                    text_emotion = emotion_classifier(translated_text)
                except sr.UnknownValueError:
                    text = "Speech not recognized"
                    text_emotion = [{"label": "Neutral", "score": 1.0}]
                except sr.RequestError:
                    return JsonResponse({'error': 'Speech recognition API error'}, status=500)

            # Remove temporary files
            os.remove(input_audio_path)
            os.remove(output_audio_path)

            # Final emotion analysis based on text and acoustic features
            final_emotion = determine_final_emotion(text_emotion[0]['label'], acoustic_emotion)
            confidence_class = text_emotion[0]['label']

            return JsonResponse({
                'emotion': final_emotion,
                'confidence': text_emotion[0]['score'],
                'confidence_class': confidence_class,
                'original_text': text,
                'acoustic_emotion': acoustic_emotion,
                'text_emotion': text_emotion[0]['label']
            })

        except KeyError:
            print("Error: Invalid input data.")
            return JsonResponse({'error': 'Invalid input data'}, status=400)
        except Exception as e:
            print(f"Error processing audio: {str(e)}")
            return JsonResponse({'error': f'Error processing audio: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)


def determine_final_emotion(text_emotion, acoustic_emotion):
    # Determine final emotion based on both text and acoustic analysis
    print(f"Determining final emotion from text: {text_emotion}, acoustic: {acoustic_emotion}")
    if text_emotion == "anger" and acoustic_emotion == "Anger":
        return "High Anger"
    elif text_emotion == "joy" and acoustic_emotion == "Calm/Satisfaction":
        return "High Satisfaction"
    elif text_emotion == "fear" and acoustic_emotion == "Fear":
        return "High Fear"
    elif text_emotion == "sadness" and acoustic_emotion == "Sadness":
        return "High Sadness"
    elif text_emotion == "surprise" and acoustic_emotion == "Surprise":
        return "High Surprise"
    elif text_emotion == "anger":
        return "Moderate Anger"
    elif text_emotion == "joy":
        return "Moderate Satisfaction"
    elif text_emotion == "fear":
        return "Moderate Fear"
    elif text_emotion == "sadness":
        return "Moderate Sadness"
    elif text_emotion == "surprise":
        return "Moderate Surprise"
    else:
        return "Neutral"

