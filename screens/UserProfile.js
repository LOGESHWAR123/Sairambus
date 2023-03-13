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

const Userprofile = () =>  {
  const navigation=useNavigation();
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
    //navigation.popToTop()

  };

const [details, setDetails] = useState({
  mail: "Loading...",
  name: "Loading...",
  mobile: "Loading...",
});

//const currentMail = getAuth()?.currentUser.email;
const currentMail="sec20it039@sairamtap.edu.in"
console.log(details);

useEffect(() => {
  const collectionRef = collection(database, 'users');
  const q = query(collectionRef, where("mail", "==", currentMail));
  const unsubscribe = onSnapshot(q, querySnapshot => {
    const userData = querySnapshot.docs.map(doc => ({
      mail: doc.data().mail,
      phone: doc.data().mobile,
      name: doc.data().name,
    }));
    setDetails(userData[0]);
 
  });

  return unsubscribe;
}, [currentMail]);

   {
    return (
      <View style={styles.container}>
  

    <View style={styles.body}>


      <View style={styles.bluebox}>

        <View style={{justifyContent:"flex-end",width:"40%",alignItems:"center"}}>
        <Image
              style={styles.avatar}
              source={{
                uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
        />
          
        </View>

        <View style={{width:"50%",justifyContent:"center"}}>
              <Text style={{color:"white",fontSize:20,marginLeft:10,marginBottom:2,fontWeight:"bold"}}>{details.name}</Text>
              <Text style={{color:"white",fontSize:12,marginLeft:10,marginBottom:2}} >{details.mail.split("@")[0]}</Text>
        </View>

      </View>

        <View style={{ width: "100%",height:100,marginTop:20,margin:10}}>

        <Text style={{color: "#5e5e5e" ,fontSize:12,marginBottom:5,marginBottom:10}}>P R O F I L E   S E C T I O N</Text>

      <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}} onPress={()=>navigation.navigate('Home')}>
      <View
        style={{backgroundColor: "white",width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        {/* <FontAwesome name="ticket" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/>  */}
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Your Tickets</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}}>
      <View
        style={{backgroundColor: "white",width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        {/* <FontAwesome name="gear" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/>  */}
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Settings</Text>
      </View>
    </TouchableOpacity>
        
    
    <TouchableOpacity onPress={onSignOut}>
      <View
        style={{
          backgroundColor: colors.primary,
          width: 120,
          height: 40,
          borderRadius:15,
          justifyContent: "center",
          alignItems:"center",
          flexDirection:"row",
          marginTop:40,
          marginLeft:"30%",
        }}
      >
        {/* <FontAwesome name="sign-out" size={22} color={"white"} style={{marginRight:10,justifyContent:"center"}}/> */}
        <Text style={{ color: "white", fontSize: 13, justifyContent:"center",alignItems:"center",}}>LogOut</Text>
      </View>
      <Text style={{color: "#5e5e5e" ,fontSize:13,marginTop:5,textAlign:"center"}}>Do you want to Signout?</Text>
    </TouchableOpacity>

        </View>
        </View>
      </View>
    );
  }
}
export default Userprofile;
const styles = StyleSheet.create({

  container:{
    flex:1
  },
  bluebox:{
    height:"30%",
    backgroundColor:colors.primary,
    flexDirection:"row", 
    alignItems:"center",
    justifyContent:"center"
  },
  header:{
    backgroundColor: 'white',
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    backgroundColor:colors.primary
  },
  body:{
    backgroundColor: "#fff",
    height:"100%",
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  logout:{
   backgroundColor: "#fff",
   width: 100 ,
   height: 50,
   alignItems: "center",
   justifyContent: "center",
   marginTop: 60, 
   backgroundColor: colors.primary, 
   borderColor: "black",
   borderRadius: 10,
}, 
avatar: {
  width: 80,
  height: 80,
  borderRadius: 63,
  borderWidth: 1,
  borderColor: "white",
  marginBottom:10,

},

});


// import React, { Component,useLayoutEffect, useState,useEffect } from 'react';
// import {StyleSheet,Text,View,Image,Button,TouchableOpacity,TextInput} from 'react-native';
// import { getAuth} from "firebase/auth";
// import colors from '../colors';
// import { Dimensions } from "react-native";
// import { auth, database} from '../config/firebase'; 
// import {  fetchSignInMethodsForEmail } from 'firebase/auth';
// import { signOut } from 'firebase/auth';
// import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where} from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const Userprofile = () =>  {
//   const navigation=useNavigation();
//   const onSignOut = () => {
//     signOut(auth).catch(error => console.log('Error logging out: ', error));
//     //navigation.popToTop()

//   };

// const [details,setdetails]=useState([{
//   mail: "Loading...",
//   name: "Loading...",
//   mobile : "Loading...",
// }]);



// const [onEdit,SetOnEdit]=useState(false);
// // const currentmail=getAuth()?.currentUser.email;
// const currentmail = "sec20it035@sairamtap.edu.in"
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
//         );
//       });        
    
//     return unsubscribe;
//     }, 
    
//     []); 

    
//    {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>

//           <View style={styles.headerContent}>
//             <Image
//               style={styles.avatar}
//               source={{
//                 uri: "https://bootdey.com/img/Content/avatar/avatar6.png",
//               }}
//             />
//             <View style={{alignItems:"center",width:"100%"}}>


//             <View style={{height:200,justifyContent:"space-evenly",width:300,alignItems:"center"}}>

//             <TextInput
//                 style={styles.editbox}
//                 placeholder="Edit your Name"
//                 autoCapitalize="none"
//                 value={details[0]?.name}
//                 editable={onEdit}
//                 //onChangeText={(text) => setPassword(text)}
//             />

//             <TextInput
//                 style={styles.editbox}
//                 placeholder="Edit your Name"
//                 autoCapitalize="none"
//                 value={details[0]?.mail}
//                 editable={onEdit}
//                 //onChangeText={(text) => setPassword(text)}
//             />

//           <TextInput
//                 style={styles.editbox}
//                 placeholder="Edit your Name"
//                 autoCapitalize="none"
//                 value={details[0]?.phone}
//                 editable={onEdit}
               
//             />
//             </View>
            
//             </View>


//     <TouchableOpacity onPress={() => SetOnEdit(!onEdit)} style={{display:"flex"}}>
//       <View
//         style={{
//           backgroundColor: colors.primary,
//           width: 120,
//           height: 30,
//           borderRadius:15,
//           justifyContent: "center",
//           alignItems:"center",
//           flexDirection:"row",
//           marginTop:10,
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 13, justifyContent:"center",alignItems:"center",}}>Edit Profile</Text>
//       </View>
//     </TouchableOpacity>

    
//           </View>
//         </View>


//     <View style={styles.body}>

//         <View style={{ width: "80%",height:100,backgroundColor:"#fff",marginLeft: 30}}>
        
    
//     <TouchableOpacity onPress={onSignOut}>
//       <View
//         style={{
//           backgroundColor: colors.primary,
//           width: 120,
//           height: 40,
//           borderRadius:15,
//           justifyContent: "center",
//           alignItems:"center",
//           flexDirection:"row",
//           marginTop:40,
//           marginLeft:"30%",
//         }}
//       >
//         <Text style={{ color: "white", fontSize: 13, justifyContent:"center",alignItems:"center",}}>LogOut</Text>
//       </View>
//       <Text style={{color: "#5e5e5e" ,fontSize:13,marginTop:5,textAlign:"center"}}>Do you want to Signout?</Text>
//     </TouchableOpacity>

//         </View>
//         </View>
//       </View>
//     );
//   }
// }
// export default Userprofile;
// const styles = StyleSheet.create({
//   header:{
//     backgroundColor: 'white',
//   },
//   headerContent:{
//     padding:30,
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 63,
//     borderWidth: 1,
//     borderColor: "white",
//     marginBottom:10,
//   },
//   name:{
//     fontSize:22,
//     color:"#000",
//     fontWeight:'400',
//     marginTop: 5,

//   },
//   userInfo:{
//     fontSize:16,
//     color:"white",
//     fontWeight:'600',
//   },
//   userInfoHeading:{
//     fontSize:15,
//     color:"#5e5e5e",
//     fontWeight:'bold',
    
//   },
//   body:{
//     backgroundColor: "#fff",
//     height:500,
//     //alignItems:'center',

//   },
//   item:{
//     flexDirection : 'row',
//   },
//   infoContent:{
//     flex:1,
//     alignItems:'flex-start',
//     paddingLeft:5
//   },
//   iconContent:{
//     flex:1,
//     alignItems:'flex-end',
//     paddingRight:5,
//   },
//   icon:{
//     width:30,
//     height:30,
//     marginTop:20,
//   },
//   info:{
//     flex:1,
//     alignItems:'flex-end',
//     paddingRight:5,
//     fontSize:18,
//     marginTop:20,
//     color: "#FFFFFF",
//   },
//   logout:{
//    backgroundColor: "#fff",
//    width: 100 ,
//    height: 50,
//    alignItems: "center",
//    justifyContent: "center",
//    marginTop: 60, 
//    backgroundColor: colors.primary, 
//    borderColor: "black",
//    borderRadius: 10,
// }, 
// editbox:{
//   borderWidth:1,
//   borderColor:colors.primary, 
//   width:"90%", 
//   height:40,  
//   borderRadius:5,
//   paddingHorizontal:10
  
// }, 
// });