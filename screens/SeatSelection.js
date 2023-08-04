import React, { useState,useLayoutEffect,useEffect   } from 'react';
import { View, Text, Dimensions, StatusBar, Button, TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
import { StyleSheet } from 'react-native';
import colors from '../colors';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc, QuerySnapshot,collectionGroup,getCountFromServer,where} from 'firebase/firestore';
import { auth, database } from '../config/firebase';


const {width, height} = Dimensions.get('window')


const SeatSelection = ({route}) => { 

  const {place}=route.params; 
  const {time}=route.params;
  const{price}=route.params;
  const navigation=useNavigation();
  const [selectedseat,setselectedseat]=useState([{id:"0,0"}]);
  const [seatsplace,setseatsplace]=useState([]);
//console.log(selectedseat[0].id);



const collectionRef = collection(database, 'Route1 Seats');
    useEffect(() => {


        const q = query(collectionRef, where("seatType", "!=", ""));
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setseatsplace(
            querySnapshot.docs.map(doc => 
              (
              {
              seatNumber: doc.data().seatNumber,
              seatType:doc.data().seatType 
            }))
          ),
          console.log(querySnapshot.size);
          //return;
        });
      return unsubscribe;
      }, 
      []);





//console.log(typeof(seatsplace));

function seatNumber(text){
  if(text!=undefined){
    var x=text?.split(","); 
 
  var a=x[0]; 
  var b=x[1];
  return String.fromCharCode(64 + parseInt(x))+b;

  }
  else{
    return " ";
  }
  
}





  return (
    <View style={styles.container}>
      
      <View>
      
    </View>
    <View style={{flexDirection:"row",justifyContent:"space-between",padding:20}}>
        <View style={{flexDirection:"row"}}>
            <View style={{backgroundColor:"red",height:20,width:20,marginRight:10}}></View>
            <Text>Booked</Text>
        </View>

        <View style={{flexDirection:"row",}}>
            <View style={{backgroundColor:colors.gray,height:20,width:20,marginRight:10}}></View>
            <Text>Available</Text>
        </View>

        <View style={{flexDirection:"row"}}>
            <View style={{backgroundColor:"green",height:20,width:20,marginRight:10}}></View>
            <Text>Your Seat</Text>
        </View>
    </View>

    <View style={styles.selectseat}>
      <ScrollView>
      <SeatsLayout
    row={14}
    layout={{ columnOne: 2, columnTwo: 3 }}
    selectedSeats={[
      { seatNumber: 1,  seatType: 'booked' },
      { seatNumber: 11, seatType: 'blocked' },
      { seatNumber: 17, seatType: 'women' },
      { seatNumber: 43, seatType: 'booked' },
    ]}
    BlockedSeat={{ image: "C:/Users/Public/BusApp/BusAppMain/assets/seat.png", tintColor: 'black' }}
    maxSeatToSelect={1}
    numberTextStyle={{ fontSize: 12 }}
    AvaiableSeat={{ image: "C:/Users/Public/BusApp/BusAppMain/assets/seat.png", tintColor: 'yellow' }}
    getBookedSeats={(seats) => {
        setselectedseat(seats);
        console.log('getBookedSeats :: ', seats);
    }}
/>

      </ScrollView>
      </View>
      <View style={styles.bottom}>
      <View style={{justifyContent:"center",alignItems:"center"}}>
      {/* <Text>College - Trichy</Text>
      <Text>12 Jan 2023 | Mon</Text> */}
      <Text style={{fontSize:17,color:"green"}} >Selected Seat: {seatNumber(selectedseat[0]?.id)}</Text>
      </View>
      <View style={{justifyContent:"center",alignItems:"center"}}>
      <TouchableOpacity
      onPress={() => {
    try {
      navigation.navigate('ContactInfo', {
        seatid: seatNumber(selectedseat[0].id),
        place: place,
        price: price,
      });
    } catch (error) {
        alert('Please Select Your Seat');
    }
  }}>
  <View
    style={{
      height: 40,
      width: 150,
      backgroundColor: colors.primary,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>
      Book Ticket
    </Text>
  </View>
</TouchableOpacity>
        
      </View>
      
      </View>
      
      </View>
  );
}


// selectedSeats={[
//   { seatNumber: 1,  seatType: 'booked' },
//   { seatNumber: 11, seatType: 'blocked' },
//   { seatNumber: 17, seatType: 'women' },
//   { seatNumber: 43, seatType: 'booked' },
// ]}
const styles = StyleSheet.create({
container:{
    width: width,
    height:height-250
},
bluecontainer:{
    backgroundColor:colors.primary, 
    height:150,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:20

},

heading:{
    color:"white", 
    fontSize:25, 
    fontWeight:"bold",
},
subheading:{
    marginTop:10,
    color:"white", 
    fontSize:15, 
},
bottom:{
    height:100, 
 
    flexDirection:"row", 
    justifyContent:"space-between",
    padding:10
}


 
});

export default SeatSelection;


