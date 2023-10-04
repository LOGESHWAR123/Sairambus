import { useNavigation } from '@react-navigation/native';
import React, { useState,useLayoutEffect,useEffect } from 'react';
import { View, Text, Dimensions, StatusBar,TextInput,Button,TouchableOpacity,Alert} from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../colors';
import { getAuth} from "firebase/auth";
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where,setDoc,increment,updateDoc} from 'firebase/firestore';
import { auth, database} from '../config/firebase'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import RazorpayCheckout from 'react-native-razorpay';

import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import { encode } from 'base-64';

function ContactInfo({route}) 

{
    const navigation=useNavigation();
    const {time}=route.params;
    const {seatid}=route.params;
    const {place}=route.params; 
    const {price}=route.params;
    const {routeid}=route.params;
    const {day}=route.params;
    const {drivername}=route.params;
    const {drivernumber}=route.params;
    console.log(routeid);
  

    const [details, setdetails] = useState({
      mail: "Loading...",
      name: "Loading...",
      phone: "Loading...",
    });

    const currentMail = getAuth()?.currentUser.email;
    const id=currentMail.split("@")[0];
    const [bookings,setbookings]=useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [booking1,setbookings1] = useState(0);
    const [functions,setfunctions]=useState([]);
 

   

//const docRef = doc(database, "SeatBookingCount", routeid);
//   getDoc(docRef).then((docSnap) => {
//     if(!docSnap.exists()){
      
//       setDoc(doc(database, "SeatBookingCount", routeid), {
//         seats:1, 
//       })
//     }
//     else{
//       console.log("Hii How");
//     }
  
// })

// const docRef = doc(database, `SeatBookingCount/3/3`);
// getDoc(docRef).then((docSnap) => {
//   if(docSnap.exists()){
//     console.log(docSnap.data());
//     console.log("--->");
//   }
//   else{
//     console.log("Hi");
//   }
// })

    
useEffect(() => {
      const collectionRef = collection(database, 'users');
      const q = query(collectionRef, where("mail", "==", currentMail));
      const unsubscribe = onSnapshot(q, querySnapshot => {
        const userData = querySnapshot.docs.map(doc => (
          {
          name:doc.data().name,
          mail: doc.data().mail,
          phone: doc.data().mobile,
          name: doc.data().name,
        }
        ));
        setdetails(userData[0]);
     
});
    
      return unsubscribe;
}, []);

    //console.log(details);
    //console.log(day,"----->.>>>");
  

  useEffect(() => {
      const collectionRef = collection(database, 'Functions',);
      const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
      const func = querySnapshot.docs.map(doc => ({
          
          allow:doc.data().ticketallow,
          key:doc.data().razorpaykey
        }));
        setfunctions(func[0]);
     
      });
    
      return unsubscribe;
    }, []);

    console.log(functions,"--->");
    function findseat(seatcount,routeid){
      for (let i = 0; i < seatcount.length; i++) {
        if (seatcount[i][routeid]>=0) {
          return seatcount[i][routeid]; 
        }
      
      }
    }

    hello = '2021/11/18';
    end = new Date('2002','11','04');
    //console.log(end.toDateString());


  var datesplit=day.split('-');
  console.log(datesplit);
  var dateconvertor=new Date(datesplit[2],datesplit[1],datesplit[0]);
  var tempdate=dateconvertor.toDateString(); 
  var temp1=tempdate.split(" ");

var date=temp1[2]+" "+temp1[1]+" "+temp1[3];
var finalday=temp1[0];

  function formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
      const year = date.getFullYear().toString();
      return `${day}/${month}/${year}`;
  }


const payment = () => {
     var seatc=55-findseat(seatcount,routeid);
     var bookedcount=findseat(seatcount,routeid);
     console.log(seatc,'---->>');

     if(functions.allow)
     {
      Alert.alert(
        'Booking Failed',
        'Booking Time is Closed ',
        [
          { text: 'OK', style: 'OK' },
        ]
      );
      return;
}

if(seatc>0){

      var options = {
        description: 'BusApp payment',
        image: "https://sairamgroup.in/wp-content/themes/sairamgroup/images/footer-logo.png",
        currency: 'INR',
        key: 'rzp_test_AHMQcxkRqC6Spu',
        amount: price+"00",
        name: 'Sairam Transport',
        prefill: {
          email: details?.mail,
          //contact: details?.phone,
          name: details?.name
        },
       // #0672CF
        theme: {color: 'blue'}
      }
      RazorpayCheckout.open(options).then((data) => { 

         console.log(data.razorpay_payment_id);

        const collectionRef = collection(database, `users/${id}/BookingHistory`);

        setDoc(doc(collectionRef, data.razorpay_payment_id), {
          name:details.name,
          bookingtime:new Date().toLocaleTimeString(),
          bookingDay: formatDate(new Date()),
          time: time,
          day: day, 
          transactionId: data.razorpay_payment_id, 
          price:price, 
          seatNumber:bookedcount, 
          destination: place,
          Email: currentMail,
          drivername:drivername,
          drivernumber:drivernumber,
          Attendence:true,
          routeid:routeid
}) 


const collectionRef1 = collection(database, 'BookingHistory');

  setDoc(doc(collectionRef1,id), {
    name:details.name,
    bookingtime:new Date().toLocaleTimeString(),
    bookingDay: formatDate(new Date()),
    time: time,
    day: day, 
    transactionId: data.razorpay_payment_id, 
    price:price, 
    seatNumber:bookedcount, 
    destination: place,
    Email: currentMail,
    routeid:routeid
})

          const docRef = doc(database, "SeatBookingCount", routeid);
          getDoc(docRef).then((docSnap) => {
            if(docSnap.exists()){
              updateDoc(docRef, {
                seats: increment(1)
            }); 
            }
            else{
              setDoc(docRef, {
                seats: increment(1)
            }); 
            }
        })

        setTimeout(() => {
          Alert.alert(
            "Payment Successful",
            "Kindly Download your ticket in User Profile Section",
            [
              {
                text: "Ok",
                onPress: () => {
                    navigation.navigate('Ticket')
                },
              },
              {
                text: "Back",
                onPress: () => {
                    
                },
              },
            ],
          )
        }, 10)
        //alert(`Success: ID${data.razorpay_payment_id}`);
        //return;

      }).catch((error) => {
        //alert(`Error: ${error.code} | ${error.description.code}`);
        //console.log(error.error.description);
        console.log(error);
        setTimeout(() => {
          Alert.alert(
            "Payment Unsuccessful",
            `${error.error.description}`,
            [
              {
                text: "Ok",
                onPress: () => {
      
                },
              },
            ],
          )
        }, 10)
        
      });


     }
     else{

      Alert.alert(
        'Booking Failed',
        'All seats are booked ',
        [
          { text: 'OK', style: 'OK' },
          
        ]
      );

     }
      
    }
  
    const [seatcount,addseatcount]=useState([{"0":0}]);
    const collectionRef1 = collection(database, "SeatBookingCount");
    useLayoutEffect(() => {
      //const collectionRef = collection(database, "Route 1");
      //const q = query(collectionRef1, orderBy("time", "desc"));
      const unsubscribe = onSnapshot(collectionRef1, (querySnapshot) => {
        addseatcount(
          querySnapshot.docs.map((doc) => ({
            [doc.id]:doc.data().seats
          }))
        ),
          
  
        console.log(querySnapshot.size,"--->");
      });
  
      return unsubscribe;
    }, []);

    
    console.log(findseat(routeid));
    console.log(seatcount);

    const [tableHead, setTableHead] = useState(['Driver Details']);
    const [tableData, setTableData] = useState([
        ['Mr.C.Ebinaser','9840449697'],
        ['Mr.R.Arul','9840449697']
    ]);




  return (

    <View style={{flex: 1}}>
    <View style={{flex:1}}>
      <View style={styles.bluecontainer}>
        <Text style={styles.heading}>College  - {place}</Text>
        <Text style={styles.subheading}>{date} | {finalday}</Text>
        
        <View style={styles.whitebox}>
        
            <View style={{justifyContent:"space-between"}}> 
                {/* <Text style={{fontSize:15}}>Chennai -Trichy</Text> */}
                <Text style={{fontSize:15}}>{time} PM - 5:00 AM</Text>
                <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>Seats Left : <Text style={{color:colors.primary,fontSize:15,fontWeight:"bold"}}>{Math.abs(findseat(seatcount,routeid)-55)}</Text></Text>
            </View>
            <View style={{justifyContent:"space-between"}}>
                {/* <Text style={styles.subheading}>12 Jan 2023 | Mon</Text> */}
                <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>₹{price}</Text>
                <Text>TN 64 P 7997</Text>
            </View>
        </View>
      </View>

    <ScrollView>

    <View style={{padding:15}}>
        <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Traveller Information</Text>
        <Text style={{marginBottom:10,}}>Passenger Name</Text>
        <TextInput
                style={styles.input}
                placeholder="   Your Name"
                keyboardType="default"
                value={details?.name}
                editable={false}
        />

      <Text style={{marginTop:10,marginBottom:20}}>Mobile Number</Text>
        <TextInput
                style={styles.input}
                placeholder="   Your Mobile Number"
                value={details?.phone}
                editable={false}
                keyboardType="default"
        /> 

      {/* <Text style={{marginTop:10,marginBottom:20}}>Email ID</Text>
        <TextInput
                style={styles.input}
                placeholder="   Your Email ID"
                value={details?.mail}
                editable={false}
                keyboardType="default"
        /> */}
      </View>

      <View style={{padding:15}}>
      <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:0}}>Bus Driver Information</Text>
      
      <Text style={{marginTop:10,marginBottom:10}}>{drivername}</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <TextInput
                style={styles.input}
                placeholder="   Your Mobile Number"
                value={drivernumber}
                editable={false}
                keyboardType="default"
        />
      </View>

      

      <Text style={{marginTop:10,marginBottom:10}}>Mr.R.Arul</Text>
      <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <TextInput
                style={styles.input}
                placeholder="   Your Mobile Number"
                value={drivernumber}
                editable={false}
                keyboardType="default"
        />
      </View>
      
 
      
      </View>
      
     

      
    </ScrollView>   
</View>
    <TouchableOpacity onPress={payment}>
        <View style={{backgroundColor:"#2b84ea",position:"absolute",bottom:0,width:"100%",height:55,flexDirection:"row",padding:10,justifyContent:"flex-end"}}>
            <Text style={{alignSelf:"center",fontSize:15,color:"white",marginRight:10}}>  Proceed to Payment </Text>
            <Icon name="arrow-right-alt" size={30} color='#fff' style={{top:2}}/>
        </View>
    </TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({

bluecontainer:{
    backgroundColor:colors.primary, 
    height:220,
    justifyContent:"center",
    alignItems:"center"
},
heading:{
    color:"white", 
    fontSize:25, 
    fontWeight:"bold",
},
subheading:{
    color:"white", 
    fontSize:15, 
    marginTop:10,

},
whitebox:{
    height:100, 
    backgroundColor:"white",
    width:"90%", 
    borderRadius:10,
    marginTop:20,
    flexDirection:"row",
    justifyContent:"space-between",
    padding:20
}, 
input:{
    height:40, 
    backgroundColor:colors.lightGray, 
    borderRadius:5, 
    borderColor:"black",
    width:"80%", 
    paddingHorizontal:10
},
input1:{
    //bottom:10,
    height:40, 
    backgroundColor:colors.lightGray, 
    borderRadius:10, 
    borderColor:"black",
    width:"90%", 
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
  backgroundColor: colors.primary,
  color:'white'
},
row: {  
  height: 40,  
},
text: { 
  textAlign: 'center',
  
},
texthead: { 
  textAlign: 'center',
  fontSize:16, 
  color:"white",
  fontWeight:"bold"
},
});

export default ContactInfo;