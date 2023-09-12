import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert} from "react-native";
import { signInWithEmailAndPassword,fetchSignInMethodsForEmail,createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase";
import colors from "../colors";
import { doc, setDoc } from "firebase/firestore"; 
const backImage = require("../assets/backImage.png");
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login({navigation}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navi = useNavigation();

 

  // const onHandleLogin = () => {
  //   if ((email !== "" && password !== "") && email.split('@')[1]=='sairamtap.edu.in') {

  //         signInWithEmailAndPassword(auth, email, password)
  //         .then(() => console.log("Login success"))
  //         .catch((err) => Alert.alert(
  //           'Login Failed',
  //           'Kindly check your College mail id and Password ',
  //           [
  //             { text: 'OK', style: 'OK' },
              
  //           ]
  //         ));
  //   }
  //   else{

  //     Alert.alert(
  //       'Login Failed',
  //       'Kindly check your College mail id and Password ',
  //       [
  //         { text: 'OK', style: 'OK' },
          
  //       ]
  //     );
  //     //Alert.alert("Enter your College mail id");
  //   }
  // };

  const onHandleLogin = () => {
    if ((email !== "" && password !== "") && email.split('@')[1] === 'sairamtap.edu.in') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          AsyncStorage.setItem('userLoggedIn', 'true'); // Save login state
          //navi.navigate('Busroute');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Alert.alert('Login Failed...', 'Kindly Check your Mail id and Password', [{ text: 'OK' }]);
    }
  };
  
  return (
    <View style={styles.container}>
      <Image 
      source={{uri:"https://sairamgroup.in/wp-content/themes/sairamgroup/images/footer-logo.png"}}
      style={{width:155,height:100,bottom:50}}
      
      />
      <Text style={styles.heading}>Sairam Bus</Text>
      <View style={styles.subcontainer}>
      <Text style={{fontSize:25,fontWeight:"bold",color:colors.primary,textAlign:"center",paddingTop:10}}>Login</Text>
      <View style={styles.logincontainer}> 
      <TextInput
                style={styles.loginbox}
                placeholder="Enter your college id"
                autoCapitalize="none"
                autoCorrect={false}
                
                value={email}
                onChangeText={(text) => setEmail(text)}
        />

      <TextInput
                style={styles.loginbox}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
              
                onChangeText={(text) => setPassword(text)}
       />
      <TouchableOpacity onPress={()=> navigation.navigate('ForgetPassword')}>
      <Text>Forgot Password? <Text style={{color:colors.primary}}>Click here</Text></Text>
      </TouchableOpacity>
      
      </View>
      

      <View style={{justifyContent:"center",alignItems:"center"}}  >
        <TouchableOpacity style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",margin:20}} onPress={onHandleLogin}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center',marginBottom:10}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{color: colors.primary, fontWeight: '600', fontSize: 14}}> Sign Up</Text>
        </TouchableOpacity>
      </View>

      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent:"center", 
    alignItems:"center"
  },
  subcontainer:{
    width:340,
    height: 450,
    backgroundColor:"white",
    borderRadius:15, 
    padding:10
  }, 
  heading:{
    fontSize:40, 
    fontWeight:"bold",
    color:"white", 
    fontStyle:"italic", 
    bottom:20
  },
  logincontainer:{

    height:200, 
    backgroundColor:"white", 
    justifyContent:"space-evenly",  
    alignItems:"center"
  },

  loginbox:{
    borderWidth:1,
    borderColor:colors.primary, 
    width:"90%", 
    height:50,  
    borderRadius:5,
    paddingHorizontal:10
    
  }, 
  
});
