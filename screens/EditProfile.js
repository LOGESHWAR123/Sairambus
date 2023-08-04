import React, { Component,useLayoutEffect, useState,useEffect } from 'react';
import {StyleSheet,Text,View,Image,Button,TouchableOpacity,TextInput, BackHandler} from 'react-native';
import { getAuth} from "firebase/auth";
import colors from '../colors';
import { Dimensions } from "react-native";
import { auth, database} from '../config/firebase'; 
import {  fetchSignInMethodsForEmail } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';

const EditProfile = () =>  {
  const navigation=useNavigation();
 

// useEffect(() => {
//   const collectionRef = collection(database, 'users');
//   const q = query(collectionRef, where("mail", "==", currentMail));
//   const unsubscribe = onSnapshot(q, querySnapshot => {
//     const userData = querySnapshot.docs.map(doc => ({
//       mail: doc.data().mail,
//       phone: doc.data().mobile,
//       name: doc.data().name,
//     }));
//     setDetails(userData[0]);
 
//   });

//   return unsubscribe;
// }, [currentMail]);

   {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}
export default EditProfile;
const styles = StyleSheet.create({

  container:{
    flex:1
  },
  

});
