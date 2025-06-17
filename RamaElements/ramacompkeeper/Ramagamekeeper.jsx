import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, ImageBackground, Image, Animated, PanResponder, Dimensions } from "react-native";
import { shared, game, background, form } from "../ramaconstkeeper/ramastyles";
import { gameback, gameBackBlured, plant1, plant2, plant3, wateringcan } from "../ramaconstkeeper/ramaimageskeeper";
import Ramaheading from "../ramakeeper/Ramaheading";
import Ramanavigation from "../ramakeeper/Ramanavigation";

const { width } = Dimensions.get('window');

const Ramagamekeeper = () => {
    const [plantGame, setPlantGame] = useState(false);
    const [plantGameFinished, setPlantGameFinished] = useState(false);
    const [currentStage, setCurrentStage] = useState(0);
    const [countdown, setCountdown] = useState(30);
    const [canDragEnabled, setCanDragEnabled] = useState(false);
    const [hasWatered, setHasWatered] = useState(false);

    const pan = useRef(new Animated.ValueXY()).current;

    const getPlantForStage = () => {
        const plantStyles = [
            { img: plant1, size: 146 },
            { img: plant1, size: 206 },
            { img: plant1, size: 257 },
            { img: plant2, size: 242 },
            { img: plant2, size: 294 },
            { img: plant3, size: 318 }
        ];
        return plantStyles[currentStage] || plantStyles[5];
    };

    const handleWateringSuccess = () => {
        setHasWatered(true);
        setTimeout(() => {
            if (currentStage < 5) {
                setCurrentStage(prev => prev + 1);
                setCountdown(30);
                setHasWatered(false);
                setCanDragEnabled(false);
                pan.setValue({ x: 0, y: 0 });
            } else {
                setPlantGameFinished(true);
                setPlantGame(false);
            }
        }, 1000);
    };

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => canDragEnabled,
        onPanResponderGrant: () => {
            pan.setOffset({
                x: pan.x._value,
                y: pan.y._value
            });
        },
        onPanResponderMove: Animated.event(
            [null, { dx: pan.x, dy: pan.y }],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gesture) => {
            pan.flattenOffset();
            if (gesture.dy < -100) {
                handleWateringSuccess();
            } else {
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 5,
                    useNativeDriver: false
                }).start();
            }
        }
    });

    useEffect(() => {
        let timer;
        if (plantGame && !plantGameFinished && !hasWatered) {
            timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setCanDragEnabled(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [plantGame, currentStage, hasWatered]);

    const renderProgressBars = () => (
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
            {[...Array(6)].map((_, i) => (
                <View key={i} style={{
                    width: 40, height: 10,
                    marginHorizontal: 4,
                    backgroundColor: i <= currentStage ? '#22A700' : '#ccc',
                    borderRadius: 5
                }} />
            ))}
        </View>
    );

    const { img, size } = getPlantForStage();

    const resetGame = () => {
        setPlantGameFinished(false);
        setCurrentStage(0);
        setCountdown(30);
        setCanDragEnabled(false);
        setHasWatered(false);
        pan.setValue({ x: 0, y: 0 });
    };

    return (
        <ImageBackground source={(plantGame || plantGameFinished) ? gameBackBlured : gameback} style={{ flex: 1 }}>
            <View style={[shared.container, { paddingTop: 130 }]}>

                <View style={background.heading}>
                    <Ramaheading text={'Game'} back={plantGame} />
                </View>

                {(!plantGame && !plantGameFinished) && (
                    <TouchableOpacity
                        style={game.playButton}
                        onPress={() => setPlantGame(true)}
                    >
                        <Text style={game.playButtonText}>Play</Text>
                    </TouchableOpacity>
                )}

                {(!plantGame && !plantGameFinished) && (
                    <View style={background.navi}>
                        <Ramanavigation />
                    </View>
                )}

                {plantGame && !plantGameFinished && (
                    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                        {renderProgressBars()}
                        <View style={{
                            width: '90%', padding: 15,
                            borderRadius: 16, backgroundColor: '#E8BB08', alignItems: 'center', marginVertical: 24
                        }}>
                            <Text style={{ fontSize: 18, marginVertical: 10, color: '#151515', fontWeight: '900' }}>
                                Watering the plant after: {countdown}s
                            </Text>

                            {!canDragEnabled && countdown > 0 && (
                                <Text style={{ fontStyle: 'italic', color: '#151515' }}>Please wait...</Text>
                            )}
                        </View>
                        {canDragEnabled && !hasWatered && (
                            <Text style={{ color: '#FF9800', marginBottom: 10, fontWeight: 'bold' }}>
                                Drag the watering can up to the plant!
                            </Text>
                        )}

                        <Image
                            source={img}
                            style={{ 
                                width: size, 
                                height: size, 
                                marginVertical: 20,
                                marginTop: 60
                            }}
                            resizeMode="contain"
                        />

                        <Animated.View
                            style={[
                                {
                                    transform: [{ translateX: pan.x }, { translateY: pan.y }],
                                    position: 'absolute',
                                    bottom: 50,
                                    left: width / 2 - 94,
                                    zIndex: 10,
                                }
                            ]}
                            {...panResponder.panHandlers}
                        >
                            <Image 
                                source={wateringcan} 
                                style={{ 
                                    width: 188, 
                                    height: 188,
                                    opacity: canDragEnabled ? 1 : 0.7
                                }} 
                                resizeMode="contain" 
                            />
                        </Animated.View>
                    </View>
                )}

                {plantGameFinished && (
                    <View style={{ 
                        flex: 1, 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <View style={{ 
                            backgroundColor: '#FFD700', 
                            padding: 20, 
                            borderRadius: 16,
                            width: '90%',
                            alignItems: 'center'
                        }}>
                            <Text style={{ 
                                fontSize: 24, 
                                fontWeight: '900', 
                                color: '#000',
                                textAlign: 'center'
                            }}>
                                Congratulations!
                            </Text>
                            <Text style={{ 
                                fontSize: 18, 
                                marginTop: 10,
                                textAlign: 'center'
                            }}>
                                You've successfully grown your plant!
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[form.saveButton, { marginTop: 30, width: '90%', position: 'absolute', alignSelf: 'center', bottom: 70 }]}
                            onPress={() => {
                                resetGame();
                                setPlantGame(true);
                            }}
                        >
                            <Text style={form.saveButtonText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ImageBackground>
    )
};

export default Ramagamekeeper;