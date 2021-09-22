import React from 'react'
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../redux/reducer'
import Header from '../components/Header'
import { LinearGradient } from "expo-linear-gradient";
import monkey from "../../assets/monkey.jpg";
function ListView() {
  const listItems = useSelector(state => state.itemList)
  console.log({ listItems })
  const dispatch = useDispatch()
  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20
      }}>
      <ImageBackground source={monkey} style={styles.imgBackground}>
        <LinearGradient
          colors={["#301934", "#537895"]}
          start={[0.1, 0.1]}
          style={styles.linearGradient}
        >
        {listItems.length !== 0 ? (
          <FlatList
            data={listItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.listItemContainer}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeItem(item.id))}
                  style={styles.button}>
                  <Ionicons name='ios-trash' color='#fff' size={20} />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={{ fontSize: 30, color: 'white' }}>All tasks completed!</Text>
        )}
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}
function ListScreen({ navigation }) {
  return (
    <>
      <StatusBar barStyle='light-content' />
      <View style={styles.container}>
        <Header title={'To-Do List'} />
        <ListView />
        <View style={styles.fabContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Modal')}
            style={styles.fabButton}>
            <Ionicons name='ios-add' color='#fff' size={70} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple'
  },
  fabContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    right: 30,
    bottom: 30
  },
  fabButton: {
    backgroundColor: 'purple',
    borderRadius: 35,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 5,
    paddingRight: 5,
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 0.25
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: 'white',
    marginRight: 15
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#ff333390',
    padding: 5
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
export default ListScreen