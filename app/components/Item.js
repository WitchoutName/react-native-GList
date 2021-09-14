import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, TouchableWithoutFeedback, Text, Alert, Animated, Button, Dimensions } from 'react-native';
import Checkbox from 'expo-checkbox';
import Color from "../classes/Color"
import Icon from "../assets/Icons/Icon"
import CircleButton from './CircleButton';
import ItemOptionsButton from "./ItemOptionsButton"




function Item(props){
    const [isChecked, setChecked] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const wasActive = useRef(true);
    const [renderOptions, setRenderOptions] = useState(null);
    const options = (<View style={styles.overflowBox}>
        <Animated.View style={{...styles.overflowContent, ...{transform: [{translateX: fadeAnim}]}}}>
            <ItemOptionsButton icon={{name: "heart"}} onPress={() => onPressHeart()}/>
            <ItemOptionsButton icon={{name: "edit"}} onPress={() => onPressEdit()}/>
        </Animated.View>
    </View>)


    useEffect(()=>{
        hide(0)
        setChecked(props.isChecked)
        console.log(props.isChecked)
    }, [])

    useEffect(()=>{
        setChecked(props.isChecked)
    }, [props.isChecked])

    useEffect(()=>{
        if (props.isVisible){
            wasActive.current = true;
            setRenderOptions(options)
            show(250);
        }
        else{
            if (wasActive.current){
                hideWithCallback()
            }
            else{
                setRenderOptions(null)
            }
        }

    }, [props.isVisible, wasActive.current])

    function hideWithCallback(){
        hide(250, ()=>{;wasActive.current = false})
        setRenderOptions(options)
    }

    function onPressHeart(){
        hide(250)
    }

    function onPressDelete(){
        hide(250, ()=>{props.onPressDelete(props.id)})
    }

    function onPressEdit(){
        hide(250)
        props.onPressEdit(props.id)
    }

    function onPressCheckbox(bool){
        setChecked(bool)
        props.onPressCheckbox(bool)
    }

    function show(time, callback){
        Animated.timing(fadeAnim, {
            toValue: 0,  
            duration: time,
            useNativeDriver: true
          }).start(callback);
    }
    function hide(time, callback){
        Animated.timing(fadeAnim, {
            toValue: 150,
            duration: time,
            useNativeDriver: true
          }).start(callback);
    }


	return (
		<View style={{...styles.card, ...props.style, ...{backgroundColor: isChecked ? Color.checked : "#ffffff"}}}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onPressCheckbox} color={isChecked ? Color.heading : Color.bg}/>
            <Text style={styles.count} numberOfLines={1}>{`${props.count}x`}</Text>
            <Text style={styles.title}>{props.title}</Text>
            <View style={styles.options}>
                {renderOptions}
                <TouchableOpacity style={styles.dots} onPress={()=>{props.isVisible ? props.onPressDots(false) : props.onPressDots(true)}}>
                    <Icon name="dots" height={20} width={20}/>
                </TouchableOpacity>
            </View>        
        </View>
	);
};

/*

*/



const styles = StyleSheet.create({
	card: {
        marginHorizontal: 5,
          height: 50,
          justifyContent: "flex-start",
          flexDirection: "row",
          alignItems: 'center',
          alignContent: "flex-start",
          marginTop: 5,
          elevation: 5,
          paddingLeft: 10,
          backgroundColor: "white"
    },
    checkbox: {
      textAlign: "center",
      textAlignVertical: "center",
      //marginLeft: 5,
      //backgroundColor: "blue"
    },
    count: {
        width: 30,
        height: 30,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 16,
    },
    title: {
        height: 50,
        textAlignVertical: "center",
        color: Color.secondary,
        fontSize: 16,
        //backgroundColor: "blue",
        left: 5,
        maxWidth: Dimensions.get("window").width - 110,
    },
    options: {
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "row",
        //backgroundColor: "gray",
        position: "absolute",
        right: 0
    },
    slide: {
        width: 3,
        height: "100%",
        backgroundColor: Color.text,
    },
    dots: {
        padding: 10,
        marginRight: 10,
        borderLeftWidth: 3,
        borderLeftColor: Color.text



    },
    overflowBox: {
        //position: "absolute",
        //left: -80,
        //transform: [{translateX: -150}],
        height: 40,
        flexDirection: "row",
        overflow: "hidden",
    },
    overflowContent: {
        position: "relative",
        backgroundColor: Color.text,
        height: 40,
        flexDirection: "row",
        alignItems: 'center',
        alignContent: "center",
        justifyContent: "center",
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        paddingHorizontal: 5,
        paddingBottom: 5
    },
    display: {
        height: 50,
        alignItems: 'center',
        flexDirection: "row",
        alignSelf: 'flex-start',
        alignContent: 'space-between',
        paddingLeft: 0,
        //backgroundColor: "red",
    }
})

export default Item;