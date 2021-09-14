import React from 'react';
import { StyleSheet, View } from 'react-native';

function Card(props){
	return (
		<View style={{...styles.card, ...props.style}}>{props.children}</View>
	);
};

const styles = StyleSheet.create({
	card: {
        elevation: 10,
        width: "80%",
        alignItems: "center",
        alignContent: "stretch",
        justifyContent: "flex-start",
        marginTop: 10,
        padding: 20
    }
})

export default Card;