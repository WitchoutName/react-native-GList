import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyButton from "./MyButton"

function ButtonGroup(props){
	let buttons = []
	
	for (let button of props.buttons){
		buttons.push(
			<MyButton 
				text={button.text} 
				onPress={button.onPress} 
				style={button.style}
				key={buttons.length > 0 ? buttons[buttons.length-1] + 1 : 0}
			/>
		)
	}

	return (
		<View style={styles.buttonWrap}>
			{buttons}
		</View>

	);
};

const styles = StyleSheet.create({
	buttonWrap: {
		width: '100%',
		justifyContent: "space-evenly",
		alignItems: 'center',
		flexDirection: "row",
		marginTop: 10
  }
})

export default ButtonGroup;