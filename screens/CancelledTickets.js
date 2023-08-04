import {React,useState,useLayoutEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,Platform,Alert} from 'react-native';
import { StyleSheet } from 'react-native';
import colors from '../colors';
import DropCard from '../component/DropCard';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../config/firebase';
import {collection,orderBy,query,onSnapshot, getDoc, getDocs,setDoc,doc} from 'firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share, { Button } from 'react-native-share';
import { ToWords } from 'to-words';

function CancelledTickets() {
 
const navigation= useNavigation();
const [ticket,setTicket]=useState([]);
const [BookedTime,SetBookedTime]=useState("");


const currentmail=auth?.currentUser.email;
//const id="sec20it039";
const id=currentmail.split("@")[0];



const toWords = new ToWords();

let words = toWords.convert(452, { currency: true });
console.log(words);
// words = Four Hundred Fifty Two Rupees Only

const collectionRef = collection(database, `users/${id}/CancelHistory`);
    useLayoutEffect(() => {
       const q = query(collectionRef, orderBy("time","desc"));
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setTicket(
            querySnapshot.docs.map(doc => 
              (
              {
                day:doc.data().day,
                name:doc.data().name, 
                Email:doc.data().Email,
                destination:doc.data().destination,
                time:doc.data().time,
                price:doc.data().price,
                transactionId:doc.data().transactionId
            }
            ))
          )
            console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []); 
console.log(ticket);

  return (

       <View style={{flex:1}}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={{paddingTop:20,fontSize:15,fontWeight:"bold",paddingLeft:20}}>Cancelled Tickets</Text>

        </View>
        
        {
          (ticket.length==0) ?(<Text style={{textAlign:"center",padding:30,color:"black"}}>No Tickets Cancelled </Text>) :
          (

            <ScrollView>

            {ticket?.map((value,key) =>
            
            //onPress={ ()=> selectlist({transactionId:value.transactionId,id:id,Email:currentmail,destination:value.destination,time:value.time,price:value.price,name:value.name,day:value.day})           
            <TouchableOpacity key={value.transactionId}  >
                    <DropCard  place={value.destination} time={value.time} price={value.price} h={120} seat={"CANCELLED"} day={value.day}/>
            </TouchableOpacity>
            )
        }
        
        </ScrollView>

)
        }
   
    </View>
  );
}

const styles = StyleSheet.create({

  addbus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'flex-end',
    marginTop: '5%',
    marginHorizontal: 20,
  },
  removeBus: {
    backgroundColor: '#0672CF',
    padding: 10,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
    borderRadius: 5,
  },

 
});

export default CancelledTickets;



