import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

const VirtualizedList = ({ children }) => {
  return (
    <FlatList
      data={[]}
      renderItem={null}
      ListHeaderComponent={<>{children}</>}
      horizontal={true}
    />
  );
};

const styles = StyleSheet.create({});

export default VirtualizedList;
