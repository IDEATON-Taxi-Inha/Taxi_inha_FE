// import React, { useState } from 'react';
// import { Button, TextInput } from 'react-native';

// export default function App() {
  
//   const [maxNum, setMaxNum] = useState('');
//   const [start, setStart] = useState('');
//   const [destination, setDestination] = useState('');

//   const sendData = async () => {
//     const data = {
//       maxNum: parseInt(maxNum),
//       start: start,
//       destination: destination
//     };

//     try {
//       const response = await fetch('http://192.168.219.101:8080/room/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.ok) {
//         console.log('Data sent successfully!');
//       } else {
//         console.log('Failed to send data:', response.status);
//       }
//     } catch (error) {
//       console.error('Error sending data:', error);
//     }
//   };

//   return (
//     <>
//       <TextInput
//         placeholder="start"
//         value={start}
//         onChangeText={setStart}
//       />
//       <TextInput
//         placeholder="destination"
//         value={destination}
//         onChangeText={setDestination}
//       />
//       <TextInput //탑승위치로 바꿔야 할 필요도 있음.
//         placeholder="정원"
//         value={maxNum}
//         onChangeText={setMaxNum}
//         keyboardType="numeric"
//       />
//       <Button title="Send Data" onPress={sendData} />
//     </>
//   );
// }

import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';

export default function App() {
  const [maxNum, setMaxNum] = useState('');
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');

  const sendData = async () => {
    const data = {
      maxNum: parseInt(maxNum),
      start: start,
      destination: destination,
    };

    try {
      const response = await fetch('http://192.168.219.101:8080/room/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data sent successfully!');
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
        value={maxNum}
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
