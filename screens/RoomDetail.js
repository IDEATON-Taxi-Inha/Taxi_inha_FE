import React, { useEffect, useState } from 'react';
import { Text, View,TextInput,Button } from 'react-native';
import { useRoute } from '@react-navigation/native';


export default function App() {
    const route = useRoute();
    const roomId = route.params.roomId;

  const [room, setRoom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.219.104:8080/room/${roomId}`);
        const json = await response.json();
        setRoom(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!room) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
    {
      <View key ={room.roomId} >
          <Text >{room.roomId}   </Text>
          <Text >{room.hostId.userId} {room.hostId.nickname} {room.hostId.gender} {room.maxNum}  {room.status}  {room.start} {room.destination} </Text>
          <Text >{room.maxNum}  {room.status}  {room.start} {room.destination} </Text>
          {/* <Text >{room.maxNum-room.participant.size()} </Text> */}
          <View >
          </View>
      </View>
    }
    </View>
  );
}



  // const style = StyleSheet.create({
  //   container: {
  //     flex:1,
  //     backgroundColor : '#fff',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   item: {
  //     flex: 1,
  //     alignSelf: 'stretch',
  //     margin: 10,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#eee'
  //   }
  // });