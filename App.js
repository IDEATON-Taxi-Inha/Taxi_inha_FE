import User from './screens/User'; 
import { StatusBar, StyleSheet, Text, Button,View, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 2,
      alignItems: 'center',
      justifyContent: 'center'}}>
      <Button
        title="Go to User"
        onPress={ () => navigation.navigate('User')}
      />
      <Button
        title="Room enroll"
        onPress={ () => navigation.navigate('User')}
      />

    </View>
  )
}
const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="User" component={User}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:Platform.OS === 'android' ? StatusBar.currentHeight : 0, }
})