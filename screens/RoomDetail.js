import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { IP } from "../config"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const route = useRoute();
  const roomId = route.params.roomId;

  const [room, setRoom] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${IP}:8080/room/${roomId}`);
        const json = await response.json();
        setRoom(json);
        // 객체를 배열로 변환
        const dataArray = Object.values(json.participants);
        setData(dataArray);
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
          <Text style={styles.roomId}>모집중</Text>
          <Text></Text>
          {/* <Text style={styles.infoText}>{`${room.hostId.userId} ${room.hostId.nickname} ${room.hostId.gender}`}</Text> */}
          <Text style={styles.infoText}>{`정원 : ${room.maxnum} / 출발 : ${room.start} / 도착 : ${room.destination}`}</Text>
          {data.map((participant, index) => (
              <View key={index} style={styles.participantContainer}>
                <Text style={styles.infoText}>{`이름 : ${participant.user_id.nickname}`}</Text>
                <Text style={styles.infoText}>{`성별 : ${participant.user_id.gender}`}</Text>
              </View>
          ))}
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
  participantContainer: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
});
