import {React,useState,useLayoutEffect} from 'react';
import { View, Text,TouchableOpacity,ScrollView,Platform } from 'react-native';
import { StyleSheet } from 'react-native';
import colors from '../colors';
import DropCard from '../component/DropCard';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from '../config/firebase';
import {collection,orderBy,query,onSnapshot, getDoc, getDocs,setDoc,doc} from 'firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

function Ticket() {
 
const navigation= useNavigation();
const [ticket,setTicket]=useState([]);
const [BookedTime,SetBookedTime]=useState("");


const currentmail=auth?.currentUser.email;
//const id="sec20it039";
const id=currentmail.split("@")[0];


const collectionRef = collection(database, `users/${id}/BookingHistory`);
    useLayoutEffect(() => {

        const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
          setTicket(
            querySnapshot.docs.map(doc => 
              (
              {
                Name:doc.data().Name, 
                Email:doc.data().Email,
                destination:doc.data().destination ,
                time:doc.data().time,
                price:doc.data().price,
                transactionId:doc.data().transactionId
            }))
          )
          
          
          console.log(querySnapshot.size);
        });        
      
      return unsubscribe;
      }, 
      
      []); 
console.log(ticket);
      async function generateTicket(ticket) {

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
              <img style="width: 102%;" src="https://firebasestorage.googleapis.com/v0/b/taxautomation-1214c.appspot.com/o/Group%20622header.jpg?alt=media&token=1a8d4207-2939-43fc-80ff-25ac5b85df1a">
          </header>
          <div style="display: flex;justify-content: space-between;padding: 0 40px 0 40px; margin-bottom: 20px;" >
         <div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Transaction Id : </h1>
                  <p>&nbsp${ticket.transactionId}</p>
              </div>
              <div style="display: flex;">
                  <p  style="font-weight: bold;">Student Id : </h1>
                  <p>&nbsp${id}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Name : </h1>
                  <p>&nbsp${ticket.Name}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Email : </h1>
                  <p>&nbsp${currentmail}</p>
              </div>
          </div>
          <div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Destination : </h1>
                  <p>&nbsp${ticket.destination}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Price : </h1>
                  <p style="padding-left: px;">&nbsp${ticket.price}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Date : </h1>
                  <p>&nbsp${ticket?.time}</p>
              </div>
              <div style="display: flex;">
                  <p style="font-weight: bold;">Time : </h1>
                  <p>&nbsp ${ticket?.time}</p>
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
              <p style="font-weight: bold;padding-left: 10px;">Two Thousand and Hundred</p>
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
       <View>
        <Text style={{paddingTop:20,fontSize:15,fontWeight:"bold",paddingLeft:20}}>Booked Tickets</Text>
        {
          (ticket.length==0) ?(<Text style={{textAlign:"center",padding:30,color:"black"}}>No Tickets Booked </Text>) :
          (
          
            <ScrollView>
                
            {ticket.map((value,key)=>
            //onPress={()=>navigation.navigate('BusRoute',{place:value.name,time:value.time,price:value.price})}
            //onPress={()=> generateTicket(value)}
            //onePress={()=>createPDF({transactionId:'SBP1234',id:12345,Email:'sec20it035@sairamtap.edu.in',destination:'Kelambakkam',time:'04:00PM',tickettime:'09.00AM',price:3000,totalamt:3000})}
                <TouchableOpacity key={key} onePress={ ()=> generateTicket({transactionId:value.transactionId,id:id,Email:currentmail,destination:value.destination,time:value.time,price:value.price})} >
                    <DropCard  place={value.destination} time={value.time} price={value.price} h={120}/>
                </TouchableOpacity>
            )
        }
            
            </ScrollView>
            
          )
        } 
        {/* transactionId:ticket.transactionId,Email:currentmail,destination:ticket.destination,time:ticket.time,price:ticket.price */}
        {/* transactionId:'SBTAP1234',id:12345,Email:'sec20it035@sairamtap.edu.in',destination:'Kelambakkam',time:'04:00PM',tickettime:'09.00AM',price:3000,totalamt:3000 */}
        <TouchableOpacity onPress={ ()=>  generateTicket({transactionId:ticket.transactionId,Email:currentmail,destination:ticket.destination,time:ticket.time,price:ticket.price})
        
//         generateTicket({
//   mail: "Loading...",
//   name: "Loading...",
//   mobile: "Loading...",
// })
}
>
      <DropCard  place={"Kelambakkam"} time={"04:00PM"} price={"3000"} h={120}/>
        </TouchableOpacity>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({

 
});

export default Ticket;