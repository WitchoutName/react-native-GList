import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, Animated } from 'react-native';
import CircleButton from "./CircleButton"


function OpacityCircleButton(props){
    const opaAnim = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        if (props.isVisible)
            show(150);
        else{
            hide(150);
        }

    }, [props.isVisible])

    function show(time, callback){
        Animated.timing(opaAnim, {
            toValue: 1,  
            duration: time,
            useNativeDriver: true
          }).start(callback);
    }
    function hide(time, callback){
        Animated.timing(opaAnim, {
            toValue: 0,
            duration: time,
            useNativeDriver: true
          }).start(callback);
    }

    return (
        <Animated.View style={{...styles.container, ...props.style, ...{transform: [{scale: opaAnim}]}}}>
            <CircleButton onPress={props.onPress} color={props.color} icon={props.icon}/>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});

export default OpacityCircleButton;