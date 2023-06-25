import User from './screens/User';
import Enroll from './screens/Enroll';
import Participate from './screens/Participate';
import RoomDetail from './screens/RoomDetail.js';
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.219.101:8080/room/list');
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
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data.map((room) => (
        <View style={styles.roomContainer} key={room.roomId}>
          <Text style={styles.roomId}>
            roomId: {room.roomId} hostID: {room.hostId.userId}
          </Text>
          <Text style={styles.roomInfo}>
            {room.start} -- {room.destination}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Go To participate"
              onPress={() => navigation.navigate('Participate')}
            />
            <Button
              title="Details"
              onPress={() =>
                navigation.navigate('RoomDetail', { roomId: room.roomId })
              }
            />
          </View>
        </View>
      ))}
      {/* <Button
        title="Go to User"
        onPress={() => navigation.navigate('User')}
      /> */}
      <Button
        title="Go to Enroll"
        onPress={() => navigation.navigate('Enroll')}
      />
    </ScrollView>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Participate" component={Participate} />
        <Stack.Screen name="RoomDetail" component={RoomDetail} />
        <Stack.Screen name="Enroll" component={Enroll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  roomContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
  },
  roomId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  roomInfo: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});