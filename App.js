import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import BusRoute from './screens/BusRoute';
import SeatSelection from './screens/SeatSelection';
import ContactInfo from './screens/ContactInfo';
import Userprofile from './screens/UserProfile';
import ForgetPassword from './screens/ForgetPassword';



const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='BusRoute' component={BusRoute}/>
      <Stack.Screen name='SeatSelection' component={SeatSelection}/>
      <Stack.Screen name='ContactInfo' component={ContactInfo}/>
      <Stack.Screen name='Userprofile' component={Userprofile}/>
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} defaultScreenOptions={Login}>
      <Stack.Screen name='Login' component={Login} screenOptions={{headerShown: false}} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='ForgetPassword' component={ForgetPassword}/>
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
// unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

return (
    <NavigationContainer>
      {/* {user ? <HomeStack /> : <AuthStack />} */}
      <HomeStack/>
    </NavigationContainer>
    
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>
  );
}