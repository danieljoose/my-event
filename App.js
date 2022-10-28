import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import Routes from './src/routes/Routes';
import { GlobalProvider } from "./src/contexts/Auth";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Medium': require('./assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GlobalProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </GlobalProvider>      
    </SafeAreaView>     
  );
}

 

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#e1e8ee",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
