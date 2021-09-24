import { isLoaded } from "expo-font";
import React, { useState } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";

import api from "../services/api";
import GlistItem from "./GListItem";
import VirtualizedList from "./common/VirtualizedList";

const screenWidth = Dimensions.get("window").width;

const ItemList = ({ listState, userId }) => {
  const [list, setList] = listState;
  const [refreshing, setRefreshing] = useState(false);

  const handleCheck = (id) => {
    console.log("check", id);
  };

  const handleLike = (id) => {
    console.log("Like", id);
  };

  console.log("------------------------------");

  return (
    <View style={[styles.scrollBox]}>
      <VirtualizedList>
        <FlatList
          style={{ width: screenWidth }}
          contentContainerStyle={{ paddingVertical: 10 }}
          key={"0"}
          data={list.item_set}
          renderItem={({ item: i }) => (
            <GlistItem
              item={i}
              checkedBy={list.members.filter((m) => m.id === i.checked_by)[0]}
              userId={userId}
              onCheck={handleCheck}
              onLike={handleLike}
            />
          )}
          keyExtractor={(i) => i.id.toString()}
          refreshing={refreshing}
          onRefresh={() => {
            api.list.getList(list.id).then(({ data: l }) => {
              console.log(
                l.members.map((m) => m.id),
                l.item_set.map((i) => i.checked_by)
              );
              setList(l);
            });
          }}
        />
      </VirtualizedList>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollBox: {
    flex: 1,
  },
  lists: {
    flex: 1,
    overflow: "hidden",
  },
});

export default ItemList;
