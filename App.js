import React, { useState, createContext, useContext, useEffect} from 'react';
import { Component } from 'react';
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
import Ticket from './screens/Ticket';
import SplashScreen from 'react-native-splash-screen';
import CancelConfirmation from './screens/CancelConfirmation';
import CancelledTickets from './screens/CancelledTickets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from './colors';
import EditProfile from './screens/EditProfile';
const Tab = createBottomTabNavigator();



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
      <Stack.Screen name='BottomTab' component={BottomTab} options={{ headerShown: false }}/>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='BusRoute' component={BusRoute}/>
      <Stack.Screen name='SeatSelection' component={SeatSelection}/>
      <Stack.Screen name='ContactInfo' component={ContactInfo}/>
      <Stack.Screen name='Userprofile' component={Userprofile}/>
      <Stack.Screen name='Ticket' component={Ticket}/>
      <Stack.Screen name='CancelConformation' component={CancelConfirmation}/>
      <Stack.Screen name='CancelledTickets' component={CancelledTickets}/>
      <Stack.Screen name='EditProfile' component={EditProfile}/>
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} defaultScreenOptions={Login}>
      <Stack.Screen name='Login' component={Login} screenOptions={{headerShown: true}} />
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='ForgetPassword' component={ForgetPassword}/>
    </Stack.Navigator>
  );
}

function BottomTab(){
  return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle:  { height: 60,alignItems:"center"}
    
      }}
      
      
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={Ticket}
        options={{
          tabBarLabel: 'Tickets',
          tabBarIcon: ({ color, size }) => (
            <Icon name="ticket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Userprofile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
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
      {user ? 
      <HomeStack /> : <AuthStack />} 
      
      
    </NavigationContainer>
  );
}

export default function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
     }, 1500);
   }, []) 

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
    
  );
}