import React, { useEffect, useState, useLayoutEffect } from "react";
import {View,TouchableOpacity,Text,Image,StyleSheet,TextInput,Button,ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";
import { auth, database } from "../config/firebase";
import DropCard from "../component/DropCard";
import { Platform } from 'react-native';
import {collection,orderBy,query,onSnapshot,doc} from "firebase/firestore";
import Icon from 'react-native-vector-icons/FontAwesome';
const catImageUrl =
  "dhttps://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

const Home = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [routeway, setRouteway] = useState([{ id: 1, name: "Loading", price: "zero" },]);
  const [area, SetArea] = useState([]);
  const [filename,setfilename]=useState("");

  const name="Trichy";
  const time="9.00PM";
  const price="1200";


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon name="home" size={25} color={colors.primary} marginLeft={8}/>
        
      ),

      // headerRight: () => (
      //   <TouchableOpacity
      //     style={{
      //       marginRight: 10,
      //     }}
      //     onPress={() => navigation.navigate("Userprofile")}
      //   >
      //    <Icon name="user" size={25} color={colors.primary}/>
      //     {/* <Text>User</Text> */}
      //   </TouchableOpacity>
      // ),
    });
  }, [navigation]);


  const collectionRef = collection(database, "Buses");
  useLayoutEffect(() => {
    //const collectionRef = collection(database, "Route 1");
    const q = query(collectionRef, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setRouteway(
        querySnapshot.docs.map((doc) => ({
          name: doc.id,
          price: doc.data().price,
          time: doc.data().time,
          routeid:doc.data().routeid,
          day:doc.data().date,
          drivername:doc.data().drivername,
          drivernumber:doc.data().drivernumber,
        }))
      ),
        SetArea(querySnapshot.docs.map((doc) => doc.id));

      //console.log(querySnapshot.size);
    });

    return unsubscribe;
  }, []);

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
        

      console.log(querySnapshot.size);
    });

    return unsubscribe;
  }, []);

  function findseat(routeid){
    for (let i = 0; i < seatcount.length; i++) {
      if (seatcount[i][routeid]>=0) {
        return seatcount[i][routeid]; 
      }
      
    }
  }

  //console.log(routeway);
  const filteredData = routeway.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.subcontainer}>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
            bottom: 20,
          }}
        >Enter your Dropping Point
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Enter your Destination"
          keyboardType="default"
        />
      </View>

      <ScrollView>
       {filteredData.map((value, key) => (
          // onPress={()=>navigation.navigate('BusRoute',{place:value.name,time:value.time,price:value.price})}
          // onPress={() => navigation.navigate("ContactInfo",{price:value.price,place:value.name})}
          <TouchableOpacity
            key={key}
            onPress={() => navigation.navigate("ContactInfo",{price:value.price,place:value.name,routeid:value.routeid,time:value.time,day:value.day,drivername:value.drivername,drivernumber:value.drivernumber})}
          >
            <DropCard
              place={value.name}
              time={value.time+" PM"}
              price={value.price}
              seat={`${Math.abs(55-findseat(value?.routeid))} Seats Left`}
              h={120}
              day={value.day}
              count={findseat(value.routeid)}
            />
          </TouchableOpacity>
        ))}
        {/* <TouchableOpacity
            onPress={()=>navigation.navigate('Ticket')}
          >
            <DropCard
              place={name}
              time={time}
              price={price}
              h={120}
            />
          </TouchableOpacity> */}
      </ScrollView>
    </View>
    
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subcontainer: {
    height: 200,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    bottom: 10,
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    width: "75%",
    paddingHorizontal: 10,
  },
  card: {
    margin: 15,
    backgroundColor: colors.mediumGray,
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
