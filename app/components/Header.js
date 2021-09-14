import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Color from "../classes/Color"
import CircleButton from "./CircleButton"

//<TouchableOpacity style={styles.fav}></TouchableOpacity>
/* Send */

function Header(props){
	return (
			
			<View style={{width: "100%"}}>
				<View style={{height: 25, backgroundColor: Color.bg, alignSelf: "stretch"}}></View>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>{props.title}</Text>
					<Text></Text>
				</View>
			</View>
	);
};

const styles = StyleSheet.create({
		header: {
			height: 90,
			width: "100%",
			padding: 10,
			paddingTop: 36,
			flexDirection: "row",
			justifyContent: "space-between",
			backgroundColor: Color.secondary
		},
		headerTitle: {
			color: Color.bg,
			fontSize: 24
		}
})

export default Header;