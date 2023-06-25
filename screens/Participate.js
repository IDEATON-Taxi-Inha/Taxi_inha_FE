import React, { useState } from 'react';
import { Button,Text, TextInput, View, StyleSheet,Alert } from 'react-native';

export default function App({ route, navigation }) {
  
  const { paramRoomId } = route.params;

  const sendData = async () => {

    //자기 집 주소 넣으시면 될듯!
    const  IP = "192.168.219.101";

    const data = {
      roomid: parseInt(paramRoomId),
      
    };

    try {
      const response = await fetch("http://"+IP+":8080/participate/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'hostid' : 1,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data sent successfully!');
      } else {
        console.log('Failed to send data:', respnse.status);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


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