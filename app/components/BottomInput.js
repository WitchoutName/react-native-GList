import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, View, FlatList, Text, Dimensions, Alert, Animated, TextInput, TouchableOpacity } from 'react-native';
import Icon from "../assets/Icons/Icon"
import Color from "../classes/Color"

function BottomInput(props){
    const hideAnim = useRef(new Animated.Value(0)).current;
    const [enteredCount, setEnteredCount] = useState("1")
    const [enteredTitle, setEnteredTitle] = useState("")

    useEffect(()=>{
        hide(0)
    }, [])

    useEffect(()=>{
        if (props.isVisible)
            show(200);
        else{
            hide(200);
        }

    }, [props.isVisible])

    function show(time, callback){
        Animated.timing(hideAnim, {
            toValue: 0,  
            duration: time,
            useNativeDriver: true
          }).start(callback);
    }
    function hide(time, callback){
        Animated.timing(hideAnim, {
            toValue: 60,
            duration: time,
            useNativeDriver: true
          }).start(callback);
    }

    function changeCount(text){
        setEnteredCount(text.replace(/[^0-9]/g, ""))
    }

    function changeTitle(text){
        setEnteredTitle(text)
    }

    function onPressAdd(){
        if(enteredTitle){
            console.log("wtf")
            props.getValues(enteredCount ? enteredCount : "1", enteredTitle);
            console.log("wtf")
            setEnteredTitle("")
            setEnteredCount("")
        }
    }


    return (
        <Animated.View style={[styles.container, {transform: [{translateY: hideAnim}]}]}>
            <View style={styles.wrap}>
                <TextInput 
                    style={styles.count} 
                    placeholder="1"
                    keyboardType="number-pad" 
                    maxLength={2}
                    value={enteredCount}
                    onChangeText={changeCount}
                />
                <TextInput 
                    style={styles.title}
                    placeholder="Item name..."
                    value={enteredTitle}
                    onChangeText={changeTitle}  
                />
            </View>
            <TouchableOpacity activeOpacity={1} onPress={onPressAdd} style={[styles.plus, {marginLeft: (60 - props.icon.width) / 2}]}>
                <Icon name={props.icon.name} width={props.icon.width} height={props.icon.height} color={enteredTitle ? props.icon.color.f : props.icon.color.s}/>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "white",
        flexDirection: "row",
        bottom: 0,
        position: "absolute",
        elevation: 5,
        width: "100%",
        padding: 10
    },
    count: {
        fontSize: 20
    },
    title: {
        fontSize: 20,
        width: Dimensions.get("window").width - 110,
        marginLeft: 10
    },
    wrap: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "black",
        padding: 5,
    },
    plus: {
        marginLeft: 10,
        position: "relative",
        right: 0,
        width: "100%",
    }
});

export default BottomInput;