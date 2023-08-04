import React, { Component,useLayoutEffect, useState,useEffect } from 'react';
import {StyleSheet,Text,View,Image,Button,TouchableOpacity,TextInput, BackHandler,Modal,Alert, Pressable,Linking} from 'react-native';
import { getAuth} from "firebase/auth";
import colors from '../colors';
import { Dimensions } from "react-native";
import { auth, database} from '../config/firebase'; 
import {  fetchSignInMethodsForEmail } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import {collection,addDoc,orderBy,query,onSnapshot,getDocs,docRef,getDoc,doc,where,updateDoc} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome'

const Userprofile = () =>  {
  const navigation=useNavigation();
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
    //navigation.popToTop()

  };

const [details, setDetails] = useState({
  mail: "Loading...",
  name: "",
  mobile: "Loading...",
});

const [editName,seteditName]=useState(details?.name);
const [editMobile,seteditMobile]=useState(0);


const currentMail = getAuth()?.currentUser.email;
const id= currentMail.split("@")[0];

console.log(details);


const [modalVisible, setModalVisible] = useState(false);

const [modalVisible1, setModalVisible1] = useState(false);

const { width } = Dimensions.get("window");

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


function editdetails(){

  const docRef = doc(database, "users",id);
          getDoc(docRef).then((docSnap) => {
            if(docSnap.exists()){
              updateDoc(docRef, {
                name:editName,
                mobile:editMobile
            }); 
            

            Alert.alert(
              "Edit Profile",
              "Profile Edited Successfully",
              [
                {
                  text: "Ok",
                  onPress: () => {
                      
                  },
                },
              ],
            )


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


}

   {
    return (
      <View style={styles.container}>
  

    <View style={styles.body}>


      <View style={styles.bluebox}>

        <View style={{justifyContent:"flex-end",width:"40%",alignItems:"center"}}>
        <Image
              style={styles.avatar}
              source={{
                uri:  "https://bootdey.com/img/Content/avatar/avatar6.png",
              }}
        />
        
          
        </View>

        <View style={{width:"50%",justifyContent:"space-evenly",height:120,flexDirection:"column"}}>
              <Text style={{color:"white",fontSize:22,marginLeft:10,marginBottom:2,fontWeight:"bold"}}>{details?.name}</Text>
              <Text style={{color:"white",fontSize:13,marginLeft:10,marginBottom:2}} ><Text style={{fontSize:15}}>College Id:  </Text>{details?.mail.split("@")[0].toUpperCase()}</Text>
              <Text style={{color:"white",fontSize:13,marginLeft:10,marginBottom:2}} ><Text style={{fontSize:15}}>Mobile No:  </Text>{details?.phone}</Text>
        </View>

      </View>

        <View style={{ width: "100%",height:100,marginTop:20,margin:10}}>

        <Text style={{color: "#5e5e5e" ,fontSize:12,marginBottom:5,marginBottom:10}}>P R O F I L E   S E C T I O N</Text>

      <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}} onPress={() => setModalVisible(true)}>
      <View
        style={{backgroundColor: "white",width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        <Icon name= "edit" size={25} olor={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/>
        {/* <FontAwesome name="ticket" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/>  */}
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Edit Profile</Text>
      </View>
    </TouchableOpacity>

    <TouchableOpacity style={{borderColor:"blue",borderColor:"green", marginTop:10}} onPress={()=>setModalVisible1(true)}>
      <View
        style={{backgroundColor: "white",width: "100%",height:50,borderColor: "black",flexDirection:"row",}}>
        
        <Icon name= "phone" size={25} olor={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/>
      { /* <FontAwesome name="gear" size={25} color={"#5e5e5e"} style={{marginLeft: 10,marginTop:10}}/>  */}
        <Text style={{ color: "#5e5e5e", fontSize: 16,marginLeft:10 ,marginTop:10}}>Customer Support</Text>
      </View>
    </TouchableOpacity>
        
    
    <View>
      <TouchableOpacity onPress={onSignOut} 
        style={{
          backgroundColor: colors.primary,
          width: 120,
          height: 40,
          borderRadius:15,
          justifyContent: "center",
          alignItems:"center",
          flexDirection:"row",
          marginTop:40,
          //marginLeft:"30%",
          alignSelf:"center"
        }}
      >
        <Icon name= "log-out" size={20} color={"white"}/>
        {/* <FontAwesome name="sign-out" size={22} color={"white"} style={{marginRight:10,justifyContent:"center"}}/> */}
        <Text style={{ color: "white", fontSize: 13, justifyContent:"center",alignItems:"center",}}>LogOut</Text>
      </TouchableOpacity>
      <Text style={{color: "#5e5e5e" ,fontSize:13,marginTop:5,textAlign:"center"}}>Do you want to Signout?</Text>
    </View>

        </View>


        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text style={{fontSize:20,textAlign:"center",fontWeight:"bold"}}>Edit Details</Text>
            <Text style={{marginTop:20,marginBottom:10,fontSize:15}}>Name</Text>
            <TextInput
                    style={styles.input}
                    placeholder="   Enter your Name"
                    keyboardType="default"
                    value={editName}
                    onChangeText={(text) => seteditName(text)}
                    editable={true}
            />

            <Text style={{marginTop:20,marginBottom:10,fontSize:15}}>Mobile Number</Text>
            <TextInput
                    style={styles.input}
                    placeholder="   Enter your Number"
                    keyboardType="numeric"
                    value={editMobile}
                    editable={true}
                    maxLength={10}
                    onChangeText={(text) => seteditMobile(text)}
            />  
            <View style={{flexDirection:"row",justifyContent:"space-evenly",margin:30}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={ () =>{setModalVisible(!modalVisible);editdetails()}} >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Back </Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </Modal>





      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text style={{fontSize:20,textAlign:"center",fontWeight:"bold"}}>Customer Support</Text>

            <View style={{flexDirection:"row",justifyContent:"space-evenly",margin:30}}> 

            <Pressable onPress={()=> Linking.openURL('mailto:sec20it039@sairamtap.edu.in')}>
            <Icon name="mail" color={colors.primary} size={50} />
            
            </Pressable>
            <Pressable onPress={()=> Linking.openURL('tel:+91 7550005050')}>
            <Icon name="phone" color={colors.primary} size={50} />
            </Pressable>
            {/* <Icon name="phone" color={colors.primary} size={50} /> */}
            </View>
            
            <View style={{flexDirection:"row",justifyContent:"space-evenly",margin:10}}>
          
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible1(!modalVisible1)}>
              <Text style={styles.textStyle}>Back </Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </Modal>

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
  width: 100,
  height: 100,
  borderRadius: 63,
  borderWidth: 1,
  borderColor: "white",
},


centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
 
},
modalView: {

  margin: 60,
  backgroundColor: colors.mediumGray,
  borderRadius: 20,
  width:350,
  height:350,
  padding:20,
  shadowColor: '#fff',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 1,
  shadowRadius: 20,
  elevation: 40,
},

modalView1: {

  margin: 60,
  backgroundColor: colors.mediumGray,
  borderRadius: 20,
  width:350,
  height:240,
  padding:20,
  shadowColor: '#fff',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 1,
  shadowRadius: 20,
  elevation: 40,
},
button: {
  borderRadius: 5,
  alignItems:"center",
  justifyContent:"center",
  width:100,
  height:40,
 
},
viewWrapper: {
  
  flex:1,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
},
buttonOpen: {
  backgroundColor: colors.primary,
},
buttonClose: {
  backgroundColor: colors.primary,
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},

input:{
  height:40, 
  backgroundColor:colors.mediumGray, 
  borderWidth:1,
  borderRadius:5, 
  borderColor:colors.primary,
  width:"90%", 
  paddingHorizontal:10
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