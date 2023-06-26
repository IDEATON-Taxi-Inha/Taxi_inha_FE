import React, { useState } from 'react';
import { Button,Text, TextInput, View, StyleSheet,Alert } from 'react-native';
import { IP } from "../config"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App({ route, navigation}) {

  const paramRoomId = route.params.paramRoomId;
  const sendData = async () => {


    const data = {
    };

    try {
      const userid = await AsyncStorage.getItem("userid");
      const response = await fetch("http://"+IP+":8080/participant/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'userid' : userid,
          'roomid' : paramRoomId,
        },
        body: JSON.stringify(data),
      });

        console.log(userid);
      if (response.ok) {
        console.log('Data sent successfully!');
      } else {
        console.log('Failed to send data:', response.status);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  sendData();

  return (
    
    Alert.alert(
      '참가 완료!',
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});