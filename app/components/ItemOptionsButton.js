import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from "../assets/Icons/Icon"
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);


class ItemOptionsButton extends Component{
    render(){
        return(
            <AnimatedTouchable activeOpacity={0.5} onPress={this.props.onPress} style={{...styles.button, ...this.props.style}}>
                <Icon name={this.props.icon.name} width={this.props.icon.width} height={this.props.icon.height}/>
            </AnimatedTouchable>
        )
    }
}

const styles = StyleSheet.create({
	button: {
        elevation: 5,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "white",
        width: 35,
        height: 35,
        margin: 5,
        
        zIndex: -50
    }
})

export default ItemOptionsButton;