import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import { useBackHandler } from "@react-native-community/hooks";

import api from "../services/api";
import Loader from "../components/Loader";
import Screen from "../components/common/Screen";
import Navbar from "../components/Navbar";
import SideMenu from "./../components/common/SideMenu";
import Modal from "../components/Modal";
import DataManagement from "../components/managers/DataManagement";
import ItemList from "../components/ItemList";
import FavouriteItems from "../components/FavouriteItems";

const ListScreen = ({ scrollToIndex }) => {
  const [list, setList] = useState({
    title: "GList",
    item_set: [],
    members: [],
  });
  const [lists, setLists] = useState([]);
  const [user, setUser] = useState({});
  const [inputVisible, setInputVisible] = useState(false);
  const [inputContent, setInputContent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerDeleteOnHide, setDrawerDeleteOnHide] = useState(true);
  const [drawerAnimationHidden, setDrawerAnimationHidden] = useState(true);
  const [drawerRightVisible, setDrawerRightVisible] = useState(false);
  const [drawerRightContent, setDrawerRightContent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statesToToggleOnBack, setStatesToToggleOnBack] = useState([]);
  const [ads, setAds] = useState(false);

  const handleLogout = () => {
    api.auth.logout().then(() => {
      setUser({});
      scrollToIndex(0);
    });
  };

  useBackHandler(() => {
    //console.log(statesToToggleOnBack[0][0]);
    for (let [state, setState] of [
      [loading, setLoading],
      [modalVisible, setModalVisible],
      [inputVisible, setInputVisible],
      [drawerVisible, setDrawerVisible],
      [drawerRightVisible, setDrawerRightVisible],
      ...statesToToggleOnBack,
    ]) {
      if (state) {
        setState(false);
        return true;
      }
    }
    return false;
  });

  useEffect(() => {
    api.list.getLists().then(({ data: rLists }) => {
      setLists(rLists.sort((a, b) => a.title.localeCompare(b.title)));
      //console.log(rLists);
      let listToLoad = null;
      api.list.getActiveList().then((newId) => {
        if (newId) {
          if (!rLists.map((rl) => rl.id).includes(parseInt(newId))) {
            api.list.setActiveList(null);
            if (rLists.length > 0) {
              listToLoad = rLists[0].id;
              api.list.setActiveList(listToLoad);
            }
          } else listToLoad = newId;
        } else if (rLists.length > 0) {
          listToLoad = rLists[0].id;
          api.list.setActiveList(listToLoad);
        }
        console.log(listToLoad);
        if (listToLoad) {
          const cached = api.cache.getDetailedList(listToLoad);
          if (cached) {
            // console.log("cached: ", cached);
            setList(cached);
            console.log("loaded cached");
          }

          api.list.getList(listToLoad).then(({ data: l }) => {
            setList(l);
            // console.log("api list: ", l);
            console.log("loaded from api");
          });
        }
      });
    });
    api.auth.getUser().then((u) => {
      setUser(u);
    });
  }, []);

  // useEffect(() => {
  //   console.log("list changed: ", list);
  // }, [list]);

  return (
    <Screen>
      <Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        content={modalContent}
      />
      <SideMenu
        isOpen={inputVisible}
        onClose={() => setDrawerVisible(false)}
        width="100%"
        component={inputContent}
        duration={200}
      >
        <Navbar
          list={list}
          onOpenDrawer={() => {
            setDrawerVisible(!drawerVisible);
            setDrawerRightVisible(false);
          }}
          onOpenDrawerRight={() => {
            setDrawerRightVisible(!drawerRightVisible);
            setDrawerVisible(false);
          }}
        />

        <SideMenu
          isOpen={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          setAnimationHidden={setDrawerAnimationHidden}
          deleteOnHide={drawerDeleteOnHide}
          component={
            <DataManagement
              userState={[user, setUser]}
              listState={[list, setList]}
              listsState={[lists, setLists]}
              drawerControls={[
                setDrawerVisible,
                setDrawerDeleteOnHide,
                drawerAnimationHidden,
              ]}
              setModal={[setModalVisible, setModalContent]}
              setInput={[setInputVisible, setInputContent]}
              onLogout={handleLogout}
              setLoading={setLoading}
            />
          }
        >
          <SideMenu
            isOpen={drawerRightVisible}
            onClose={() => setDrawerRightVisible(false)}
            reverse={true}
            component={
              <FavouriteItems
                userState={[user, setUser]}
                listState={[list, setList]}
              />
            }
          >
            <ItemList
              listState={[list, setList]}
              ads={ads}
              userState={[user, setUser]}
              addStateToOnBack={(s) => {
                setStatesToToggleOnBack([...statesToToggleOnBack, s]);
              }}
            />
          </SideMenu>
        </SideMenu>
      </SideMenu>
      <Loader visible={loading} duration={250} />
      {ads && (
        <View style={{ marginBottom: 24 }}>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-5488365505117873/9963946005"
          />
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 35,
  },
});

export default ListScreen;
