import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Entypo'
import Home from '../pages/Home'
import Ingressos from '../pages/Ingressos'
import Explorar from '../pages/Explorar'
import Event from '../pages/Event'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#fff',
  },
  headerTintColor: 'black',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitle: "Voltar",
  headerTitleStyle: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 18,
  },
  headerTitleAlign: 'center'

};
const MainStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
      <Stack.Screen name="Evento Empresarial" component={Event} />
      <Stack.Screen name="Evento Universitário" component={Event} />
    </Stack.Navigator>
  );
}

function Routes(){

    return(
        <Tab.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#f4511e',
          }}
        >
          <Tab.Screen 
            name="Home" 
            component={MainStackNavigator}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" size={size} color={color} />
              ),
            }}
          />
           <Tab.Screen 
            name="Explorar" 
            component={Explorar} 
            options={{
              tabBarLabel: 'Explorar',
              tabBarIcon: ({ color, size }) => (
                <Icon name="direction" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen 
            name="Ingressos" 
            component={Ingressos} 
            options={{
              tabBarLabel: 'Ingressos',
              tabBarIcon: ({ color, size }) => (
                <Icon name="ticket" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
    )
}

export default Routes;