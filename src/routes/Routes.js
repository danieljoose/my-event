import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import Icon from 'react-native-vector-icons/Entypo'
import IconAnt from 'react-native-vector-icons/AntDesign'
import Home from '../pages/Home'
import Ingressos from '../pages/Ingressos'
import Favorites from '../pages/Favorites'
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
      <Stack.Screen name="HomeStack" options={{ headerShown: false }} component={Home} />
      <Stack.Screen name="Evento Empresarial" component={Event} />
      <Stack.Screen name="Evento Universitário" component={Event} />
    </Stack.Navigator>
  );
}

const IngressosStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="IngressosStack" options={{ headerShown: false }} component={Ingressos} />
      <Stack.Screen name="Evento Empresarial" component={Event} />
      <Stack.Screen name="Evento Universitário" component={Event} />
    </Stack.Navigator>
  );
}

const FavsStackNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={screenOptionStyle}>
      <Stack.Screen name="FavsStack" options={{ headerShown: false }} component={Favorites} />
      <Stack.Screen name="Evento Empresarial" component={Event} />
      <Stack.Screen name="Evento Universitário" component={Event} />
    </Stack.Navigator>
  );
}


function Routes(){

    return(
        <Tab.Navigator
          screenOptions={{ headerShown: false, activeTintColor: '#f4511e', tabBarActiveTintColor: '#f4511e'}}
          initialRouteName="Home"
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
            name="Ingressos" 
            component={IngressosStackNavigator} 
            options={{
              unmountOnBlur: true,
              tabBarLabel: 'Ingressos',
              tabBarIcon: ({ color, size }) => (
                <Icon name="ticket" size={size} color={color} />
              ),
            }}
          />

           <Tab.Screen 
            name="Favoritos" 
            component={FavsStackNavigator} 
            options={{
              unmountOnBlur: true,
              tabBarLabel: 'Favoritos',
              tabBarIcon: ({ color, size }) => (
                <IconAnt name="heart" size={size} color={color} />
              ),
            }}
          />
         
        </Tab.Navigator>
    )
}

export default Routes;