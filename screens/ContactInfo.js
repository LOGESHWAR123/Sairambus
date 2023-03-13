import { useNavigation } from '@react-navigation/native';
import React, { useState,useLayoutEffect } from 'react';
import { View, Text, Dimensions, StatusBar,TextInput,Button,TouchableOpacity} from 'react-native';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../colors';
import { getAuth} from "firebase/auth";
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where} from 'firebase/firestore';
import { auth, database} from '../config/firebase'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import RazorpayCheckout from 'react-native-razorpay';



const timings = [
  { time: '03:35', stop: 'SRM University Trichy' },
  { time: '03:40', stop: 'No 1 Tollgate' },
  { time: '03:50', stop: 'Trichy TVS Bus Stand' },
  { time: '04:00', stop: 'Central Bus Stand' },
  { time: '04:00', stop: 'Airport' },
];
const payment = () => {
  var options = {
      description: 'BusApp payment',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/61/Sri_Sai_Ram_Engineering_College_logo.png',
      currency: 'INR',
      key: 'rzp_test_AHMQcxkRqC6Spu',
      amount: '500000',
      name: 'Sairam Transport',
      prefill: {
        email: 'void@razorpay.com',
        contact: '8667075377',
        name: 'Razorpay Software'
      },
      theme: {color: '#0672CF'}
    }
    RazorpayCheckout.open(options).then((data) => {
      // handle success
      alert(`Success: ${data.razorpay_payment_id}`);
    }).catch((error) => {
      // handle failure
      alert(`Error: ${error.code} | ${error.description}`);
    });
}
function ContactInfo({route}) {
    const navigation=useNavigation();
    const {seatid}=route.params;
    const {place}=route.params; 
    const {price}=route.params;
  
    const [details, setdetails] = useState({
      mail: "Loading...",
      name: "Loading...",
      mobile: "Loading...",
    });
  
  //const currentmail=getAuth()?.currentUser.email;
  const currentmail="sec20it039@sairamtap.edu.in";
  useLayoutEffect(() => {
    const collectionRef = collection(database, 'users');
      const q = query(collectionRef, where("mail", "==", currentmail));
      const unsubscribe = onSnapshot(q, querySnapshot => {
        setdetails(
          querySnapshot.docs.map(doc => 
            (
            {
            mail:doc.data().mail,
            phone: doc.data().mobile,
            name:doc.data().name
          }))
        ),
        
        console.log(querySnapshot.size);
      });        
    
    return unsubscribe;
    }, 
    
    []);



  return (

    <View style={{flex: 1}}>
    <View style={{flex:1}}>
      <View style={styles.bluecontainer}>
        <Text style={styles.heading}>College  - {place}</Text>
        <Text style={styles.subheading}>12 Jan 2023 | Mon</Text>
        
        <View style={styles.whitebox}>
        
            <View style={{justifyContent:"space-between"}}> 
                {/* <Text style={{fontSize:15}}>Chennai -Trichy</Text> */}
                <Text style={{fontSize:15}}>6:00 PM - 5:00 AM</Text>
                <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>Seat Number : <Text style={{color:colors.primary,fontSize:15,fontWeight:"bold"}}>{seatid}</Text></Text>
            </View>
            <View style={{justifyContent:"space-between"}}>
                {/* <Text style={styles.subheading}>12 Jan 2023 | Mon</Text> */}
                <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>{price}</Text>
                <Text>9h</Text>
            </View>
        </View>
      </View>

    <ScrollView>

    <View style={{padding:15}}>
        <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Traveler Information</Text>
        <Text style={{marginBottom:10,}}>Passenger Name</Text>
        <TextInput
                style={styles.input}
                placeholder="   Your Name"
                keyboardType="default"
                value={details[0]?.name}
                editable={false}
        />

      <Text style={{marginTop:10,marginBottom:20}}>Mobile Number</Text>
        <TextInput
                style={styles.input}
                placeholder="   Your Mobile Number"
                value={details[0]?.phone}
                editable={false}
                keyboardType="default"
        />
      </View>
    </ScrollView>   
</View>
<TouchableOpacity onPress={payment}>

<View style={{backgroundColor:"#2b84ea",position:"absolute",bottom:0,width:"100%",height:55,flexDirection:"row",padding:10,justifyContent:"flex-end"}}>
    <Text style={{alignSelf:"center",fontSize:15,color:"white",marginRight:10}}>  Proceed to Payment </Text>
    <Icon name="arrow-right-alt" size={30} color='#fff' style={{top:2}}/>
    {/* <FontAwesome name="long-arrow-right" size={30} color={"white"} style={{alignSelf:"center",marginRight:15}}/> */}
  {/* <TouchableOpacity>
        <View style={{height:50,width:130,borderColor:"white",borderWidth:1,borderRadius:6,justifyContent:"center",alignItems:"center",marginTop:10}}>
            <Text style={{fontSize:15,color:"white",fontWeight:"bold"}}>Book Ticket</Text>
        </View>
      </TouchableOpacity> */}
  </View>
</TouchableOpacity>
</View>
  );
}

const styles = StyleSheet.create({

bluecontainer:{
    backgroundColor:colors.primary, 
    height:260,
    justifyContent:"center",
    alignItems:"center"
},
heading:{
    color:"white", 
    fontSize:25, 
    fontWeight:"bold",
    // color:"black",
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
 
});

export default ContactInfo;



// import { useNavigation } from '@react-navigation/native';
// import React, { useState,useLayoutEffect } from 'react';
// import { View, Text, Dimensions, StatusBar,TextInput,Button,TouchableOpacity} from 'react-native';
// import { StyleSheet } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
// import colors from '../colors';
// import { getAuth} from "firebase/auth";
// import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where} from 'firebase/firestore';
// import { auth, database} from '../config/firebase'; 
// import RazorpayCheckout from 'react-native-razorpay';


// const timings = [
//   { time: '03:35', stop: 'SRM University Trichy' },
//   { time: '03:40', stop: 'No 1 Tollgate' },
//   { time: '03:50', stop: 'Trichy TVS Bus Stand' },
//   { time: '04:00', stop: 'Central Bus Stand' },
//   { time: '04:00', stop: 'Airport' },
// ];
// const payment = () => {
//   var options = {
//       description: 'BusApp payment',
//       image: 'https://i.imgur.com/3g7nmJC.png',
//       currency: 'INR',
//       key: 'rzp_test_AHMQcxkRqC6Spu',
//       amount: '500000',
//       name: 'foo',
//       prefill: {
//         email: 'void@razorpay.com',
//         contact: '8667075377',
//         name: 'Razorpay Software'
//       },
//       theme: {color: '#0672CF'}
//     }
//     RazorpayCheckout.open(options).then((data) => {
//       // handle success
//       alert(`Success: ${data.razorpay_payment_id}`);
//     }).catch((error) => {
//       // handle failure
//       alert(`Error: ${error.code} | ${error.description}`);
//     });
// }

// function ContactInfo({route}) {
//     const navigation=useNavigation();
//     const {place}=route.params; 
//     const {price}=route.params;
  
//   const [details,setdetails]=useState();
  
//  //const currentmail=getAuth()?.currentUser.email.split('@')[0];
//  const currentmail = "sec20it035@sairamtap.edu.in"
//   console.log(currentmail);
//   useLayoutEffect(() => {
//     const collectionRef = collection(database, 'users');
//       const q = query(collectionRef, where("mail", "==", currentmail));
//       const unsubscribe = onSnapshot(q, querySnapshot => {
//         setdetails(
//           querySnapshot.docs.map(doc => 
//             (
//             {
//             mail:doc.data().mail,
//             phone: doc.data().mobile,
//             name:doc.data().name
//           }))
//         ),
//         console.log(querySnapshot.size);
//       });        
    
//     return unsubscribe;
//     }, 
    
//     []);

//   return (
    
//     <View>

//     <View>
      
//       <View style={styles.bluecontainer}>
//         <Text style={styles.heading}>College  - {place}</Text>
//         {/* <Text style={styles.heading}>College  - Trichy</Text> */}
//         <Text style={styles.subheading}>12 Jan 2023 | Mon</Text>
        
//         <View style={styles.whitebox}>
        
//             <View style={{justifyContent:"space-between"}}> 
//                 <Text style={{fontSize:15}}>Chennai -Trichy</Text>
//                 <Text style={{fontSize:15}}>6:00 PM - 5:00 AM</Text>
//                 <Text style={{fontSize:15,fontWeight:"bold",color:"black"}}>Seat Number : <Text style={{color:colors.primary,fontSize:15,fontWeight:"bold"}}>CE</Text></Text>
//             </View>
//             <View style={{justifyContent:"space-between"}}>
//                 <Text style={styles.subheading}>12 Jan 2023 | Mon</Text>
//                 <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>{price}</Text>
//                 <Text style={{fontWeight:"bold",fontSize:20,color:colors.primary}}>2000</Text>
//                 <Text>9h</Text>
//             </View>
//         </View>
//       </View>

//       <ScrollView>
//       <View style={{padding:15}}>
//         <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Traveller Information</Text>


//         <View style={{flexDirection:"row",justifyContent:"space-around"}}>

//         <View>
//         <Text style={{marginBottom:10,fontSize:16}}>College ID</Text>
//         <Text style={{marginBottom:10,fontSize:16}}>Place</Text>
//         <Text style={{marginBottom:10,fontSize:16}}>Price</Text>
//         <Text style={{marginBottom:10,fontSize:16}}>Time</Text>


//         </View>

//         <View>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>

//         </View>


//         <View>
//         <Text style={{marginBottom:10,fontSize:17}}>{currentmail}</Text>
//         <Text style={{marginBottom:10,fontSize:17}}>{place}</Text>
//         <Text style={{marginBottom:10,fontSize:17}}>{price}</Text>
//         <Text style={{marginBottom:10,fontSize:17}}>{currentmail}</Text>
//         {/* <Text style={{marginBottom:10,fontSize:17}}>sec20i035@sairamtap.edu.in</Text>
//         <Text style={{marginBottom:10,fontSize:17}}>Trichy</Text>
//         <Text style={{marginBottom:10,fontSize:17}}>2000</Text>
//         <Text style={{marginBottom:10,fontSize:17}}>9.00PM</Text> */}
//         </View>

//         </View>
//       </View>

//       {/* <View style={{padding:15}}>
//         <Text style={{fontSize:18,fontWeight:"bold",color:"black",marginBottom:20}}>Bus Information</Text>


//         <View style={{flexDirection:"row",justifyContent:"space-around"}}>

//         <View>
//         <Text style={{marginBottom:10,fontSize:16}}>Bus Driver Name</Text>
//         <Text style={{marginBottom:10,fontSize:16}}>Bus Number</Text>
//         <Text style={{marginBottom:10,fontSize:16}}>Bus Registration Id</Text>


//         </View>

//         <View>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>
//         <Text style={{marginBottom:10,fontSize:17}}>: </Text>

//         </View>


//         <View>
//         <Text style={{marginBottom:10,fontSize:17}}>Temp Name</Text>
//         <Text style={{marginBottom:10,fontSize:17}}></Text>
//         <Text style={{marginBottom:10,fontSize:17}}>{price}</Text>


//         </View>

//         </View>
//       </View> */}

//       </ScrollView>
 
//     </View>

//       {/* <View style={{backgroundColor:"white"}}> */}
//       <TouchableOpacity style={{alignItems:"center"}}>
//         <View style={{height:50,width:170,backgroundColor:colors.primary,borderRadius:6,justifyContent:"center",alignItems:"center",margin:20}}>
//             <Text style={{fontSize:15,color:"white",fontWeight:"bold"}} onPress={payment}>Proceed  Payment</Text>
//         </View>
//       </TouchableOpacity>
//       {/* </View> */}

//     </View>
//   );
// }

// const styles = StyleSheet.create({

// bluecontainer:{
//     backgroundColor:colors.primary, 
//     height:250,
//     justifyContent:"center",
//     alignItems:"center"
// },
// heading:{
//     color:"white", 
//     fontSize:25, 
//     fontWeight:"bold",
//     // color:"black",
// },
// subheading:{
//     color:"white", 
//     fontSize:15, 
//     marginTop:10,

// },
// whitebox:{
//     height:100, 
//     backgroundColor:"white",
//     width:"90%", 
//     borderRadius:10,
//     marginTop:20,
//     flexDirection:"row",
//     justifyContent:"space-between",
//     padding:20
// }, 
// input:{
//     height:40, 
//     backgroundColor:colors.lightGray, 
//     borderRadius:5, 
//     borderColor:"black",
//     width:"80%", 
// },
// input1:{
//     //bottom:10,
//     height:40, 
//     backgroundColor:colors.lightGray, 
//     borderRadius:10, 
//     borderColor:"black",
//     width:"90%", 
// },
 
// });

// export default ContactInfo;