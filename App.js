import User from './screens/User';
import Enroll from './screens/Enroll';
import Participate from './screens/Participate';
import RoomDetail from './screens/RoomDetail.js';
import Login from './screens/Login.js'
import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IP } from "./config"
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {



  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch('http://' + IP + ':8080/room/list');
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

  const handleParticipate = (roomId) => {

    Alert.alert(
      'Participate',
      '참가하시겠습니까?',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => navigation.navigate('Participate', { paramRoomId:roomId }) },
    ]
    );
    
  };

  return (
    <View style={styles.container}>
      <Text>{}</Text>
      <ScrollView>
        {data.map((room) => (
          <View style={styles.roomContainer} key={room.roomId}>
            <Text style={styles.roomId}>
              roomId: {room.roomId} ---------- 모임장: {room.hostId.nickname}
            </Text>
            <Text style={styles.roomInfo}>
              {room.start} ------ {room.destination}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="참가하기"
                // onPress={() => navigation.navigate('Participate', { roomId: room.roomId } )}
                onPress={() => handleParticipate(room.roomId)}
              />
              <Button
                title="모임 세부사항"
                onPress={() =>
                  navigation.navigate('RoomDetail', { roomId: room.roomId })
                }
              />
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.enrollButtonContainer}>
        <Button
          title="모임 등록하기"
          onPress={() => navigation.navigate('Enroll')}
        />
        <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="택시인下" component={HomeScreen} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="Participate" component={Participate} />
        <Stack.Screen name="RoomDetail" component={RoomDetail} />
        <Stack.Screen name="Enroll" component={Enroll} />
        <Stack.Screen name="Login" component={Login} />
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
  enrollButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
