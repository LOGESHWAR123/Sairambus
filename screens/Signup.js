import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert,  } from "react-native";
import { signInWithEmailAndPassword,fetchSignInMethodsForEmail,createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase";
import colors from "../colors";
import { doc, setDoc } from "firebase/firestore"; 
const backImage = require("../assets/backImage.png");
import { useNavigation } from "@react-navigation/native";

export default function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setname]=useState(); 
  const [phone,setphone]=useState();
  const navigation = useNavigation();

 

  const onHandleSignUp = () => {
    if ((email !== "" && password !== "" && phone!=="" && name!=="") && email.split('@')[1]=='sairamtap.edu.in') {

      createUserWithEmailAndPassword(auth, email, password)
            .then(() => setDoc(doc(database, "users", email.split('@')[0]), {
              name: name,
              mail: email, 
              mobile:phone 
            }))
            .catch((err) => Alert.alert("Login error", err.message));
    }
    else{
      Alert.alert(
        'Sign up Failed',
        'Kindly Enter your Details Correctly ',
        [
          { text: 'OK', style: 'OK' },
          
        ]
      );
      // Alert.alert("Enter the Details Correctly");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sairam Bus </Text>
      <View style={styles.subcontainer}>
      <Text style={{fontSize:25,fontWeight:"bold",color:colors.primary,textAlign:"center",paddingTop:10}}>Sign Up</Text>
      <View style={styles.logincontainer}> 
      <TextInput
                style={styles.loginbox}
                placeholder="Enter your college mail id"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={(text) => setEmail(text)}
        />

        <TextInput
                  style={styles.loginbox}
                  placeholder="Enter your Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={name}
                  onChangeText={(text) => setname(text)}
        /> 

      <TextInput
                style={styles.loginbox}
                placeholder="Enter your Mobile Number"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="numeric"
                value={phone}
                maxLength={10}
                onChangeText={(text) => setphone(text)}
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

      </View>
      <View style={{justifyContent:"center",alignItems:"center",bottom:40}}  >
        <TouchableOpacity style={{height:60,width:150,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",marginTop:50}} onPress={onHandleSignUp}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center',marginBottom:10}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Already having an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{color: colors.primary, fontWeight: '600', fontSize: 14}}>Login</Text>
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
    height: 500,
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

    height:300, 
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


// const onHandleLogin = () => {
//   if ((email !== "" && password !== "") && email.split('@')[1]=='sairamtap.edu.in') {
    
//     fetchSignInMethodsForEmail(auth,email)
//     .then((signInMethods) => {
//       if (signInMethods.length === 0) {
//         createUserWithEmailAndPassword(auth, email, password)
//       .then(() => console.log("success"))
//       navi.navigate('FormPage',{mail:email})
//       .catch((err) => Alert.alert("Login error", err.message));
//       } 
      
//       else {
//         signInWithEmailAndPassword(auth, email, password)
//         .then(() => console.log("Login success"))
//         .catch((err) => Alert.alert("Enter correct mailid/Password"));
//       }
//     })
//     .catch((error) => {
//       console.log('Erro r fetching sign-in methods for email', error);
//     });
//   }
//   else{
//     Alert.alert("Enter your College mail id");
//   }
// };