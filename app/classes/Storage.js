import AsyncStorage from '@react-native-async-storage/async-storage';

module.exports = {
    keys: {
        allItems: "allitems",
        favourite: "favourite"
    },
    all: {
        set: async (items)=>{
        try { await AsyncStorage.setItem("allitems", JSON.stringify({items: items}));} 
        catch (error) { console.log("error",error); }
        },
        remove: async (itemId) => {
            try { await AsyncStorage.setItem("allitems", JSON.stringify({items: [...Items.filter(e => e.id !== itemId)]})); }
            catch (error) { console.log("error",error); }
        },
        delete: async () => {
            try { await AsyncStorage.removeItem("allitems"); console.log("all deleted") }
            catch (error) { console.log("error",error); }
        },
        get: async () => {
            try {
                const value = await AsyncStorage.getItem("allitems");
                if (value !== null) {
                    let fetched = JSON.parse(value)
                    return fetched.items
                }
            }
            catch (error) {
                console.log("error",error)
            }
        }
    }
    
}