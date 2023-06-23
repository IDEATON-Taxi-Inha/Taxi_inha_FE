import User from './screens/User'; 
import Enroll from './screens/Enroll'; 
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, Button, View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.219.104:8080/room/list');
        const json = await response.json();

        // 객체를 배열로 변환
        const dataArray = Object.values(json);

        setData(dataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (data.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={style}>
      {data.map((room) => (
        <View style={style} key={room.roomId}>
          <Text>roomId: {room.roomId} hostID: {room.hostId.userId}</Text>
          <Text>{room.start} -- {room.destination}</Text>
        </View>
      ))}
      {/* <Button
        title="Go to User"
        onPress={() => navigation.navigate('User')}
      /> */}
      <Button
        title="Go to enroll"
        onPress={() => navigation.navigate('Enroll')}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Enroll" component={Enroll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

const style = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      flex: 1,
      alignSelf: 'stretch',
      margin: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
    }
  });