import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Card from "./Card"

function NumberLabel(props){
	return (
        <Card style={styles.card}>
                <Text style={styles.text}>{props.number}</Text>
            </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        borderColor: "#f4287b", 
        borderWidth: 2, 
        width: "25%"
    },
    text: {
        fontSize: 30, 
        color: "#f4287b"
    }
    
})

export default NumberLabel;