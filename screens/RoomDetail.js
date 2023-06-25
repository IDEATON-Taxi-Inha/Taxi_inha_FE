import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function App() {
  const route = useRoute();
  const roomId = route.params.roomId;

  //자기 집 주소 넣으시면 될듯!
  const  IP = "192.168.0.2";

  const [room, setRoom] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://"+IP`:8080/room/${roomId}`);
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
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View key={room.roomId} style={styles.roomContainer}>
        <Text style={styles.roomId}>{room.roomId} {room.status}</Text>
        {/* <Text style={styles.infoText}>{`${room.hostId.userId} ${room.hostId.nickname} ${room.hostId.gender}`}</Text>  */}
        <Text style={styles.infoText}>{`${room.maxNum}  ${room.start} ${room.destination}`}</Text>
        {/* {room.participants.map(participant => (
          <Text key={participant.participant_id} style={styles.participantText}>{`${participant.user_id.userId} ${participant.user_id.nickname} ${participant.user_id.gender}`}</Text>
        ))} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  roomId: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
  },
});
