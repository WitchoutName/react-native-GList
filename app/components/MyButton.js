import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

function MyButton(props){
	return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} style={{...styles.button, ...props.buttonStyle}}>
            <View >
                <Text style={{...styles.text, ...props.textStyle}}>{props.text}</Text>
            </View>
        </TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
        elevation: 0,
        borderColor: "gray",
        borderRadius: 2.5,
        alignItems: "center",
        marginTop: 10,
        padding: 10,
        paddingHorizontal: 25,
        backgroundColor: "#f4287b"
    },
    text: {
        fontWeight: "700",
        color: "white"
    }
})

export default MyButton;