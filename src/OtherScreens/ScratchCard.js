import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, ActivityIndicator } from 'react-native';
import { ScratchCard } from "rn-scratch-card"

const ScratchCardScreen = () => {
    const [isScratched, setScratched] = useState(false);
    const [content, setContent] = useState('Scratch to reveal');
    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (!isScratched) {
    //         // Fetch content from the backend when the component mounts
    //         fetchContentFromBackend();
    //     }
    // }, [isScratched]);

    // const fetchContentFromBackend = async () => {
    //     try {
    //         setLoading(true);

    //         // Replace the URL with your actual backend API endpoint
    //         //   const response = await fetch('https://your-backend-api/scratch-card-content');
    //         //   const data = await response.json();

    //         //   // Set the fetched content in the state
    //         //   setContent("Ashish");
    //         // setContent("Ashish");
    //     } catch (error) {
    //         console.error('Error fetching content from backend:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleScratch = () => {
       console.log("hiiii")
    };

    // const panResponder = PanResponder.create({
    //     onStartShouldSetPanResponder: () => true,
    //     onMoveShouldSetPanResponder: () => true,
    //     onPanResponderMove: (evt, gestureState) => {
    //         // Check if the user is scratching and update content accordingly
    //         if (!isScratched) {
    //             const percentageScratched =
    //                 (gestureState.moveX / 200) * 100; // Assuming the component width is 200
    //             if (percentageScratched > 30) {
    //                 console.log("scratch card")
    //                 setScratched(true);
    //                 fetchContentFromBackend();
    //             }
    //         }
    //     },
    // });

    return (
        <View style={styles.container}>
            <ScratchCard
                source={require('../../assets/scratch_foreground.png')}
                brushWidth={50}
                onScratch={handleScratch}
                style={styles.scratchArea}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scratchArea: {
        width: 300,
        height: 300,
    },
    scratchCard: {
        flex: 1,
        backgroundColor: 'silver',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scratchText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ScratchCardScreen;
