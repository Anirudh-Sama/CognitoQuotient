import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as MediaLibrary from 'expo-media-library';
import { COLORS, SIZES } from '../constants/theme';
import quizData from '../data/EQquizdata';

const Try = () => {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    const [isRecording, setIsRecording] = useState(false);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [record, setRecord] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const [cameraStatus, audioStatus] = await Promise.all([
                Camera.requestCameraPermissionsAsync(),
                Camera.requestMicrophonePermissionsAsync(),
                Audio.requestPermissionsAsync(),
            ]);
            setHasCameraPermission(cameraStatus.status === 'granted');
            setHasAudioPermission(audioStatus.status === 'granted');
        })();
    }, []);

    const startRecording = async () => {
        setIsRecording(true);
        try {
            if (!hasCameraPermission || !hasAudioPermission) {
                Alert.alert('Permission denied', 'Camera and microphone permissions are required to record video with audio.');
                setIsRecording(false);
                return;
            }
            if (!cameraRef.current) {
                Alert.alert('No camera', 'Camera reference is null');
                setIsRecording(false);
                return;
            }

            const data = await cameraRef.current.recordAsync();
            console.log('Recording started:', data);
            const recordingUri = String(data.uri);
            setRecord(recordingUri);
            console.log(data.uri);

        } catch (error) {
            console.error('Error starting recording:', error);
            setIsRecording(false);
            Alert.alert('Error', 'Failed to start recording. Please try again.');
        }
    };

    const stopRecording = async () => {
        if (cameraRef.current) {
            try {
                await cameraRef.current.stopRecording();
                console.log('Recording stopped');
                setIsRecording(false);
                if (!record) {
                    Alert.alert('No data', 'No data recorded');
                    return;
                }
                await saveRecording(record);
            } catch (error) {
                console.error('Error stopping recording:', error);
                Alert.alert('Error', 'Failed to stop recording. Please try again.');
            }
        }
    };

    const saveRecording = async (videoUri) => {
        try {
            if (typeof videoUri !== 'string') {
                throw new Error('Invalid video URI format');
            }
    
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                throw new Error('Permission to access the Media Library was denied');
            }
    
            const asset = await MediaLibrary.createAssetAsync(videoUri);
            const albumName = 'Camera';
            const album = await MediaLibrary.getAlbumAsync(albumName);
            if (album === null) {
                await MediaLibrary.createAlbumAsync(albumName, asset, false);
            } else {
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }

            Alert.alert('Recording Saved', 'Your recording has been saved to the gallery successfully.');
        } catch (error) {
            console.error('Error saving recording:', error);
            Alert.alert('Error', 'Failed to save recording. Please try again.');
        }
    };

    const goToNextQuestion = async () => {
        if (currentQuestionIndex < quizData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            Alert.alert(
                'Quiz Completed',
                'You have completed the quiz.',
                [
                    {
                        text: 'Upload & View Result',
                        onPress: async () => {
                            const result = await saveRecording(record);
                            navigation.navigate('test');
                        }
                    }
                ]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.quizContent}>
                <Text style={styles.questionText}>{quizData[currentQuestionIndex].question}</Text>
            </View>
            {hasCameraPermission && hasAudioPermission && (
                <View style={styles.cameraPreview}>
                    <Camera style={{ flex: 1 }} type={Camera.Constants.Type.front} ref={cameraRef} />
                </View>
            )}
            {hasCameraPermission && hasAudioPermission && !isRecording && (
                <TouchableOpacity onPress={startRecording}>
                    <View style={[styles.actionButton, { backgroundColor: COLORS.success }]}>
                        <Text style={styles.buttonText}>Start Recording</Text>
                    </View>
                </TouchableOpacity>
            )}
            {isRecording && (
                <TouchableOpacity onPress={stopRecording}>
                    <View style={[styles.actionButton, { backgroundColor: COLORS.error }]}>
                        <Text style={styles.buttonText}>Stop Recording & Submit</Text>
                    </View>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={goToNextQuestion}>
                <View style={styles.nextButton}>
                    <Text style={styles.buttonText}>Next</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.base * 2,
    },
    quizContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        color: COLORS.white,
        fontSize: SIZES.base * 2,
    },
    cameraPreview: {
        flex: 1,
    },
    actionButton: {
        backgroundColor: COLORS.primary,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.base * 2,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.base * 1.5,
    },
    nextButton: {
        backgroundColor: COLORS.secondary,
        padding: SIZES.base * 2,
        borderRadius: SIZES.base,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SIZES.base * 2,
    },
});

export default Try;