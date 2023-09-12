import {React,useState,useLayoutEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,Platform,Alert,Modal,Pressable,Linking,LogBox} from 'react-native';
import { StyleSheet } from 'react-native';

import colors from '../colors';
import DropCard from '../component/DropCard';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../config/firebase';
import {collection,orderBy,query,onSnapshot, getDoc, getDocs,setDoc,doc} from 'firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share, { Button } from 'react-native-share';
import { ToWords } from 'to-words';

function Ticket() {
 
const navigation= useNavigation();
const [ticket,setTicket]=useState([]);
const [BookedTime,SetBookedTime]=useState("");
const [selectedTicketIndex, setSelectedTicketIndex] = useState(null);


const currentmail=auth?.currentUser.email;
//const id="sec20it039";
const id=currentmail.split("@")[0];

const [modalVisible, setModalVisible] = useState(false);



const toWords = new ToWords();

let words = toWords.convert(452, { currency: true });
console.log(words);
// words = Four Hundred Fifty Two Rupees Only

const collectionRef = collection(database, `users/${id}/BookingHistory`);
    useLayoutEffect(() => {
       const q = query(collectionRef, orderBy("bookingtime","desc"));
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
                seatNumber:doc.data().seatNumber,
                transactionId:doc.data().transactionId,
                drivername:doc.data().drivername,
                drivernumber:doc.data().drivernumber,
            }))
          )
          console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []);

console.log(ticket);

async function generateTicket(ticket1,index) {
  const ticket = ticket1[index];

        if (!ticket) {
          console.error(`Ticket with ID ${id} not found`);
          return;
        } 

    let options = {
      html:`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <style>
          th,td{
             border:1px solid black; 
             vertical-align: top;
             padding-left: 10px;
          }
          #tu{
              text-align: left;
          }
          *{
              font-family: Arial, Helvetica, sans-serif;
          }
      </style>
      
          <header>
              <img style="width: 102%;" src="https://firebasestorage.googleapis.com/v0/b/sairambusapp.appspot.com/o/Group%20622header.jpg?alt=media&token=d18314f0-1461-4a0d-b15a-c7c3bc74b90d">
          </header>
          <div style="display: flex;justify-content: space-between;padding: 0 40px 0 40px; margin-bottom: 20px;" >
         <div>
              
              <div style="display: flex;">
                  <p style="font-weight: bold;">Name : </h1>
                  <p>&nbsp${ticket.name}</p>
              </div>
              <div style="display: flex;">
                  <p  style="font-weight: bold;">Student Id : </h1>
                  <p>&nbsp${id}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Transaction Id : </h1>
                  <p>&nbsp${ticket.transactionId}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Email : </h1>
                  <p>&nbsp${currentmail}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Driver Name: </h1>
                  <p>&nbsp${ticket.drivername}</p>
              </div>

          </div>
          <div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Destination : </h1>
                  <p>&nbsp${ticket.destination}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">SeatNumber : </h1>
                  <p style="padding-left: px;">&nbsp${ticket.seatNumber}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Date : </h1>
                  <p>&nbsp${ticket?.day}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Time : </h1>
                  <p>&nbsp ${ticket?.time}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Driver Mobile No:  </h1>
                  <p>&nbsp ${ticket?.drivernumber}</p>
              </div>
          </div>
      </div>
      <table style="border: 1px solid black;width: 100%;border-collapse: collapse;">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Fee description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody style="height: 150px;">
            <tr>
              <td>1</td> 
              <td>Bus payment</td>
              <td>₹ ${ticket.price}</td>
            </tr>
          </tbody>
          <tbody>
              <tr>
                  <td colspan="2" style="text-align: right; padding-right: 20px ;">Total Amount</td>
                  <td>₹${ticket.price}</td>
              </tr>
          </tbody>
        </table>
        
        
      <div style="margin-top: 20px;">
          <div style="display: flex;justify-content: center;">
              <p>Amount in word:</p>
              <p style="font-weight: bold;padding-left: 10px;">${ toWords.convert(ticket.price, { currency: true })}</p>
          </div>
          <div  style="display: flex;justify-content: center;">
              <p>Mode of payment:</p>
              <p style="font-weight: bold;padding-left: 10px;">Online</p>
          </div>
      </div>
      </html>
      `
      ,
      fileName: ticket?.transactionId,
      directory: 'Documents',
    };
  
    let file = await RNHTMLtoPDF.convert(options)
    // console.log(file.filePath);
    const pdfPath = file.filePath;
    const sharePDF = async () => {
      const shareOptions = {
        type: 'application/pdf',
        url: `file://${pdfPath}`,
        title: 'Share PDF',
      };
      try {
        await Share.open(shareOptions);
      } catch (error) {
        console.log('Error sharing PDF: ', error);
      }
    };
    sharePDF();
    //alert(file.filepath);
}


// function selectlist(ticket){

//   Alert.alert(
//     "Download or Cancel the Ticket",
//     "Kindly choose the below options",

//     [
//       {
//         text: "Back",
//         onPress: () => {
            
//         },
//       },
//       {
//         text: "Cancel Ticket",
//         onPress: () => { navigation.navigate('CancelConformation',{ticketdetails:ticket,mail:currentmail})},
//       },
//       {
//         text: "Download Ticket",
//         onPress: () => { generateTicket(ticket)},
//       },  
      
      
//     ],
//   )

// }

//destination,totalamt,price,transactionId,id,Email,time,tickettime
  //  async function createPDF(value) {
  //   let options = {
  //     html:`
  //     <!DOCTYPE html>
  //     <html lang="en">
  //     <head>
  //         <meta charset="UTF-8">
  //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>Document</title>
  //     </head>
  //     <style>
  //         th,td{
  //            border:1px solid black; 
  //            vertical-align: top;
  //            padding-left: 10px;
  //         }
  //         #tu{
  //             text-align: left;
  //         }
  //         *{
  //             font-family: Arial, Helvetica, sans-serif;
  //         }
  //     </style>
      
  //         <header>
  //             <img style="width: 102%;" src="https://firebasestorage.googleapis.com/v0/b/taxautomation-1214c.appspot.com/o/Group%20622header.jpg?alt=media&token=1a8d4207-2939-43fc-80ff-25ac5b85df1a">
  //         </header>
  //         <div style="display: flex;justify-content: space-between;padding: 0 40px 0 40px; margin-bottom: 20px;" >
  //        <div>
  //             <div style="display: flex;">
  //                 <p style="font-weight: bold;">Transaction Id : </h1>
  //                 <p>&nbsp${ticket.transactionId}</p>
  //             </div>
  //             <div style="display: flex;">
  //                 <p  style="font-weight: bold;">Student Id : </h1>
  //                 <p>&nbsp${id}</p>
  //             </div>
  //             <div style="display: flex;">
  //                 <p style="font-weight: bold;">Name : </h1>
  //                 <p>&nbsp DEMO NAME</p>
  //             </div>
  //             <div style="display: flex;">
  //                 <p style="font-weight: bold;">Email : </h1>
  //                 <p>&nbsp${ticket.Email}</p>
  //             </div>
  //         </div>
  //         <div>
  //             <div style="display: flex;">
  //                 <p style="font-weight: bold;">Destination : </h1>
  //                 <p>&nbsp${ticket.destination}</p>
  //             </div>
  //             <div style="display: flex;">
  //                 <p style="font-weight: bold;">Price : </h1>
  //                 <p style="padding-left: px;">&nbsp₹2100</p>
  //             </div>
  //             <div style="display: flex;">
  //                 <p style="font-weight: bold;">Date : </h1>
  //                 <p>&nbsp${ticket.time}</p>
  //             </div>
  //             <div style="display: flex;">
  //                 <p style="font-weight: bold;">Time : </h1>
  //                 <p>&nbsp ${ticket.time}</p>
  //             </div>
  //         </div>
  //     </div>
  //     <table style="border: 1px solid black;width: 100%;border-collapse: collapse;">
  //         <thead>
  //           <tr>
  //             <th>S.No</th>
  //             <th>Fee description</th>
  //             <th>Amount</th>
  //           </tr>
  //         </thead>
  //         <tbody style="height: 150px;">
  //           <tr>
  //             <td>1</td>
  //             <td>Bus payment</td>
  //             <td>₹ ${ticket.price}</td>
  //           </tr>
  //         </tbody>
  //         <tbody>
  //             <tr>
  //                 <td colspan="2" style="text-align: right; padding-right: 20px ;">Total Amount</td>
  //                 <td>₹${ticket.price}</td>
  //             </tr>
  //         </tbody>
  //       </table>
        
        
  //     <div style="margin-top: 20px;">
  //         <div style="display: flex;justify-content: center;">
  //             <p>Amount in word:</p>
  //             <p style="font-weight: bold;padding-left: 10px;">Two Thousand and Hundred</p>
  //         </div>
  //         <div  style="display: flex;justify-content: center;">
  //             <p>Mode of payment:</p>
  //             <p style="font-weight: bold;padding-left: 10px;">Online</p>
  //         </div>
  //     </div>
  //     </html>
  //     `
  //     ,
  //     fileName: ticket?.transactionId,
  //     directory: 'Documents',
  //   };
  
  //   let file = await RNHTMLtoPDF.convert(options)
  //   // console.log(file.filePath);
  //   const pdfPath = file.filePath;
  //   const sharePDF = async () => {
  //     const shareOptions = {
  //       type: 'application/pdf',
  //       url: `file://${pdfPath}`,
  //       title: 'Share PDF',
  //     };
  //     try {
  //       await Share.open(shareOptions);
  //     } catch (error) {
  //       console.log('Error sharing PDF: ', error);
  //     }
  //   };
  //   sharePDF();
  //   //alert(file.filepath);
  // }
  //generateTicket({transactionId:ticket.transactionId,Email:currentmail,destination:ticket.destination,time:ticket.time,price:ticket.price});
  
  
  console.log(ticket);
  return (

       <View>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
        <Text style={{paddingTop:20,fontSize:15,fontWeight:"bold",paddingLeft:20,color:colors.primary}}>Booked Tickets</Text>

      <TouchableOpacity style={{padding:15,alignSelf:"center"}} onPress={()=> navigation.navigate('CancelledTickets')}>
        <Text style={{fontWeight:"bold",fontSize:14,backgroundColor:colors.primary,color:"white",width:130,height:30,textAlign:"center",borderRadius:5,padding:3}}>Cancelled Tickets</Text>
      </TouchableOpacity>
        {/* <Text style={{paddingTop:20,paddingRight:20}}>Cancel Ticket</Text> */}
        </View>
        
        {
          (ticket.length==0) ?(<Text style={{textAlign:"center",padding:30,color:"black"}}>No Tickets Booked </Text>) :
          (

            <ScrollView>

            {ticket?.map((value,key) =>

            <View >

            <TouchableOpacity key={value.transactionId} onPress={ ()=>{setSelectedTicketIndex(key); setModalVisible(true);}} >
                    <DropCard  place={value.destination} time={value.time+" PM"} price={value.price} h={120} seat={"BOOKED"} day={value.day} callicon={"phone"}/>
                </TouchableOpacity>

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
            <Text style={{fontSize:20,textAlign:"center",fontWeight:"bold",marginBottom:15}}>Click Below</Text>
            {/* <Text style={{marginTop:20,marginBottom:10,fontSize:15}}>Name</Text> */}
            {/* <TextInput
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
            />   */}
            <View style={{flexDirection:"column",justifyContent:"space-between",flex:1}}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={ ()=>generateTicket(ticket,selectedTicketIndex)} >
              <Text style={styles.textStyle}>Download Ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() =>{navigation.navigate('CancelConformation',{ticketdetails:{transactionId:value.transactionId,id:id,Email:currentmail,destination:value.destination,time:value.time,price:value.price,name:value.name,day:value.day},mail:currentmail});setModalVisible(!modalVisible)}}>
              <Text style={styles.textStyle}>Cancel Ticket</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => Linking.openURL(`tel:${'+91 '+value.drivernumber}`)}>
              <Text style={styles.textStyle}>Call Bus Driver</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button1, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </Modal>

            </View>
)
        }
        </ScrollView>
)
        }

        {/* <TouchableOpacity onPress={ ()=>  generateTicket({transactionId:ticket.transactionId,Email:currentmail,destination:ticket.destination,time:ticket.time,price:ticket.price})}>
            <DropCard  place={"Kelambakkam"} time={"04:00PM"} price={"3000"} h={120} />
        </TouchableOpacity>  */}
        {/* transactionId:ticket.transactionId,Email:currentmail,destination:ticket.destination,time:ticket.time,price:ticket.price */}
        {/* transactionId:'SBTAP1234',id:12345,Email:'sec20it035@sairamtap.edu.in',destination:'Kelambakkam',time:'04:00PM',tickettime:'09.00AM',price:3000,totalamt:3000 */}

        
   
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  modalView: {
  
    margin: 60,
    backgroundColor: colors.mediumGray,
    alignItems:"center",
    borderRadius: 10,
    width:320,
    height:300,
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
    width:200,
    height:40,
   
  },
  button1: {
    borderRadius: 5,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    width:100,
    height:35,
   
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

export default Ticket;



