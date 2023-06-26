import React, { useState } from 'react';
import { Button, TextInput, View,Alert, StyleSheet } from 'react-native';
import { IP } from "../config"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({navigation}) {
  const [maxnum, setMaxNum] = useState('');
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');

  const sendData = async () => {

    //자기 집 주소 넣으시면 될듯!
    const data = {
      maxnum : parseInt(maxnum),
      start : start,
      destination : destination,
    };

    try {
      const host  = await AsyncStorage.getItem("userid");
      const response = await fetch("http://"+IP+":8080/room/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'hostid' : host,
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      if (response.ok) {
        console.log('Data sent successfully!');
        Alert.alert(
          '등록 완료!',
          '',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          { 
            cancelable: false 
          }
        )
      } else {
        console.log('Failed to send data:', response.status);
      }

    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Start"
        value={start}
        onChangeText={setStart}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Max Number of Participants"
        value={maxnum}
        onChangeText={setMaxNum}
        keyboardType="numeric"
      />
      <Button title="Send Data" onPress={sendData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});
