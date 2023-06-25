import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.219.101:8080/user/list');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
    {
      data.map((user)=>
      <View key ={user.userId} >
          <Text >{user.userId}  {user.nickname}  {user.gender}</Text>
          <View >
          </View>
      </View>
      )
    }
    </View>
  );
}


