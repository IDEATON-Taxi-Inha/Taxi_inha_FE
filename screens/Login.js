import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        AsyncStorage.setItem('userid',username);
        const keys = await AsyncStorage.getItem("userid");
        console.log(keys);
        Alert.alert(
            '로그인 완료!',
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
        
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="아이디"
                value={username}
                onChangeText={setUsername}
            />
        
            <Button title="로그인" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;