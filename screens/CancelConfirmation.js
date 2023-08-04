import React, { Component,useLayoutEffect, useState,useEffect } from 'react';
import {StyleSheet,Text,View,Image,Button,TouchableOpacity,TextInput, BackHandler,Alert} from 'react-native';
import { getAuth} from "firebase/auth";
import colors from '../colors';
import { Dimensions } from "react-native";
import { auth, database} from '../config/firebase'; 
import {  fetchSignInMethodsForEmail } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,setDoc,getDoc,doc,where,updateDoc,deleteDoc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

const CancelConfirmation = ({route}) =>  {
  const navigation=useNavigation();
  const {ticketdetails}=route.params;
  const{mail}=route.params;

  const id=mail.split('@')[0];

  const [func,setfunc]=useState([]);


  useEffect(() => {
    const collectionRef = collection(database, 'Functions',);
    const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
      const functions = querySnapshot.docs.map(doc => ({
        
        // allow:doc.data().ticketallow,
        // key:doc.data().razorpaykey
        cancelallow:doc.data().cancelallow
      }));
      setfunc(functions[0]);
   
    });
  
    return unsubscribe;
  }, []);
  
  console.log(func.cancelallow);

  
 function checkalert(){


  if(func.cancelallow){


    Alert.alert(
      "Cancellation Failed",
      "Cancellation Time Period Over",
      [
        {
          text: "Back",
          onPress: () => {
              
          },
        },
      ],
    )

    return;
  }

    Alert.alert(
        "Cancel Confirmation",
        "Do you want to cancel your Ticket?",
        [
          {
            text: "Ok",
            onPress: () => {
                cancelticket()
            },
          },
          {
            text: "Back",
            onPress: () => {
                
            },
          },
        ],
      )
 }

 function cancelticket(){


  const docRef = doc(database, "BookingHistory",id);
          getDoc(docRef).then((docSnap) => {
            if(docSnap.exists()){
              updateDoc(docRef, {
                cancelstatus:true
            }); 
            }
            else{

              Alert.alert(
                "Something Went Wrong",
                "Please Try Again Later",
                [
                  {
                    text: "Back",
                    onPress: () => {
                        
                    },
                  },
                ],
              )


            }
            
        })

        deleteDoc(doc(database, `users/${id}/BookingHistory`,ticketdetails.transactionId));

        const collectionRef1 = collection(database, `users/${id}/CancelHistory`);

        setDoc(doc(collectionRef1,'cancel_'+ticketdetails.transactionId), {
          name:ticketdetails.name,
          time: new Date().toLocaleTimeString(),
          day:  new Date().toLocaleDateString(),
          transactionId: ticketdetails.transactionId, 
          price:ticketdetails.price, 
          destination:ticketdetails.destination,
          Email: mail
      })

        Alert.alert(
          "Your Ticket Cancelled Successfully",
          "You will Recieve your Refund within 1 Week",
          [
            {
              text: "Back",
              onPress: () => {
                navigation.goBack();
                  
              },
            },
          ],
        )
    console.log("Function started....!!!")

 }
const [tableHead, setTableHead] = useState(['Passenger Details']);
    const [tableData, setTableData] = useState([
        ['Name', ticketdetails.name],
        ['Destination',ticketdetails.destination],
        ['Mail', mail,],
        ['Transaction Id', ticketdetails.transactionId],
        ['Time',ticketdetails.time ],
        ['Day',ticketdetails.day],
        ['Price',ticketdetails.price ],
    ]);

   {
    return (

       // <View style={styles.container}>
      //    <Text style={{paddingTop:10,fontSize:15,fontWeight:"bold",paddingLeft:5}}>Ticket Information</Text>
      //    <View style={{flexDirection:"row",justifyContent:"space-evenly",padding:20}}>
      //     <View style={{flex:1,height:300,justifyContent:"space-around"}}>
      //     <Text style={{fontSize:15}}>Name</Text> 
      //     <Text style={{fontSize:15}}>Email</Text>
      //     <Text style={{fontSize:15}}>Transaction ID</Text>
      //     <Text style={{fontSize:15}}>Destination</Text>
      //     <Text style={{fontSize:15}}>Time</Text>
      //     <Text style={{fontSize:15}}>Day</Text>
      //     <Text style={{fontSize:15}}>Price</Text>
      //     </View>
      
      //     <View style={{flex:1,height:300,justifyContent:"space-around"}}>
      //     <Text style={{fontSize:15}}>{ticketdetails.name}</Text>
      //     <Text style={{fontSize:15}}>{mail}</Text>
      //     <Text style={{fontSize:15}}>{ticketdetails.transactionId}</Text>
      //     <Text style={{fontSize:15}}>{ticketdetails.destination}</Text>
      //     <Text style={{fontSize:15}}>{ticketdetails.time}</Text>
      //     <Text style={{fontSize:15}}>{ticketdetails.day}</Text>
      //     <Text style={{fontSize:15}}>{ticketdetails.price}</Text>
      //     </View>

      //    </View>

        //  <View style={{justifyContent:"center",height:100,alignItems:"center"}}>
        //  <TouchableOpacity style={{width:150,height:50,backgroundColor:colors.primary,alignItems:"center",justifyContent:"center",borderRadius:10}}>
        //     <Text style={{color:"white"}}>Cancel your Ticket</Text>
        //  </TouchableOpacity>
        //  </View>
         
      // </View>
      <View style={styles.container}>
          <Text style={{paddingBottom:10,fontSize:15,fontWeight:"bold",paddingLeft:5}}>Ticket Information</Text>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead}  style={styles.head} textStyle={styles.text} />
                <TableWrapper style={styles.wrapper}>
                    <Rows data={tableData} flexArr={[0.5,1]} style={styles.row} textStyle={styles.text} />
                </TableWrapper>
            </Table>

            <View style={{justifyContent:"center",height:100,alignItems:"center"}}>
         <TouchableOpacity style={{width:150,height:50,backgroundColor:colors.primary,alignItems:"center",justifyContent:"center",borderRadius:10}} onPress={checkalert}>
            <Text style={{color:"white"}}>Cancel your Ticket</Text>
         </TouchableOpacity>
         </View>
        </View>
      
    );
  }
}
export default CancelConfirmation;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 16,
      paddingTop: 40,
  },
  head: {  
      height: 40, 
      backgroundColor: colors.primary,
  },
  wrapper: { 
      flexDirection: 'row',
  },
  title: { 
      flex: 1, 
      backgroundColor: '#f6f8fa',
      color:'white'
  },
  row: {  
      height: 40,  
  },
  text: { 
      textAlign: 'center',
      
  },
});