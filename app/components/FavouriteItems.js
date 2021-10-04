import React from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import Color from "../classes/Color";
import tools from "../tools";
import SideMenuList from "./common/SideMenuList";
import UserFavItem from "./UserFavItem";

const FavouriteItems = ({ listState, userState }) => {
  const handleAdd = (title) => {
    tools.item.addItem(title, listState, "list");
  };

  const handleDelete = (id) => {
    tools.item.deleteItems([id], userState);
  };

  return (
    <View style={styles.container}>
      <SideMenuList
        title="Favourite items"
        scrollBoxStyle={{ maxHeight: "90%" }}
        data={userState[0].item_set.sort((a, b) =>
          a.title.localeCompare(b.title)
        )}
        render={(item) => (
          <UserFavItem
            item={item}
            key={item.id}
            onAdd={handleAdd}
            onDelete={handleDelete}
            showAdd={listState[0].id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    padding: 10,
  },
});

export default FavouriteItems;
