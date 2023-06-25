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
  Alert,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const HomeScreen = ({ navigation }) => {
  // 자기 집 주소 넣으시면 될듯!
  const IP = '192.168.219.101';

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
      { text: 'OK', onPress: () => navigation.navigate('Participate', { roomId }) },
    ]
    );
    
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
                // onPress={() => navigation.navigate('Participate', { roomId: room.roomId } )}
                onPress={() => handleParticipate(room.roomId)}
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
      </ScrollView>
      <View style={styles.enrollButtonContainer}>
        <Button
          title="Go to Enroll"
          onPress={() => navigation.navigate('Enroll')}
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
  enrollButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
