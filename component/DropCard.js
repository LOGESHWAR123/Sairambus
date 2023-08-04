import { View, TouchableOpacity, Text, Image, StyleSheet,TextInput } from "react-native";
import colors from '../colors';
const DropCard = ({place,time,price,h,seat,count,day,callicon}) => {

    return (
                <View style={[styles.card,{height: h}]} >
                <View style={{justifyContent:"space-evenly"}}>
                <Text style={{fontSize:20,}}>{place}</Text>
                <Text style={{}}>{time}</Text>
                {/* //Need to update the seat from database */}
                <Text style={{fontSize:15,color:(count<40 || seat=="BOOKED")? "green": "red"}}>{seat}</Text>               
                </View>

                <View  style={{justifyContent:"space-around",marginRight:10}}>
                <Text style={{fontSize:20,fontWeight:"bold",color:colors.primary}}>{`₹ ${price}`}</Text>
                <Text style={{fontSize:13,}}>{day}</Text>
                <Text style={{fontSize:12,color:colors.primary}}></Text>
                </View>
                
            </View>
           
    );
    };

const styles=StyleSheet.create({
    // default height 120
    card:{
        margin:15,
        backgroundColor: colors.mediumGray, 
        flexDirection:"row",
        justifyContent:"space-between",
        paddingLeft:10,
        paddingRight:10,
    }
})
export default DropCard;