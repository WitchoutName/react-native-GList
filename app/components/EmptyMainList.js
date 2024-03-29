import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Icon from "../assets/Icons/Icon";
import Color from "../classes/Color";
import CircleButton from "./CircleButton";

const screenWidth = Dimensions.get("window").width;

function EmptyMainList(props) {
  return (
    <View style={{ ...styles.container, width: screenWidth }}>
      <View style={styles.inner}>
        <Text style={styles.text}>Start adding new items by clicking </Text>
        <CircleButton icon={{ name: "plus" }} onPress={props.onPress} />
        {props.wtf}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    height: "100%",
    width: "100%",
    backgroundColor: "dodgerblue",
  },
  button: {
    borderColor: "black",
    //borderWidth: 0.5,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    elevation: 5,
    backgroundColor: "white",
    width: 50,
    height: 50,
    margin: 10,
  },
  text: {
    fontSize: 20,
    color: Color.text,
  },
  inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    //elevation: 5,
    //backgroundColor: "white",
    width: "80%",
  },
});

export default EmptyMainList;
