import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Icon from "../assets/Icons/Icon"


function CircleButton(props){
	return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={{...styles.button, ...props.style}}>
            <Icon name={props.icon.name} width={props.icon.width} height={props.icon.height}/>
        </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
        elevation: 5,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "white",
        width: 60,
        height: 60,
        margin: 10
    }
})

export default CircleButton;