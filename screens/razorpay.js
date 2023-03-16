import React from 'react';
import { View, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import { auth, database } from '../config/firebase';
import {collection,orderBy,query,onSnapshot, getDoc, getDocs,setDoc,doc} from 'firebase/firestore';
const Razorpay = () => {


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

  console.log(details);

  // const [ticket,setTicket]=useState([]);
  // const collectionRef = collection(database, `users/sec20it039/BookingHistory`);
  // const unsubscribe = onSnapshot(collectionRef, querySnapshot => {
  //   setTicket(
  //     querySnapshot.docs.map(doc => 
  //       (
  //       {
  //         Name:doc.data().Name, 
  //         Email:doc.data().Email,
  //         destination:doc.data().destination ,
  //         time:doc.data().time,
  //         price:doc.data().price,
  //         transactionId:doc.data().transactionId
  //     }))
  //   )
    
  //   console.log(querySnapshot.size);
  // });




    const payment = () => {
        var options = {
            description: 'BusApp payment',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_AHMQcxkRqC6Spu',
            amount: '50',
            name: 'foo',
            prefill: {
              email: 'void@razorpay.com',
              contact: '8667075377',
              name: 'Razorpay Software'
            },
            theme: {color: '#0672CF'}
          }
          RazorpayCheckout.open(options).then((data) => {
           
            

    // useLayoutEffect(() => {

                
      
    //   return unsubscribe;
    //   }, 
      
    //   []); 
           
           
           
           
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }
   return (
    <View>
      {payment}
    </View>
  );
};

export default Razorpay;
