import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import PayuMoney from 'react-native-payumoney';

class Payucheck extends Component {
  handlePayment = () => {
    const payData = {
      amount: '10.0',
      txnId: '1594976828726',
      productName: 'product_info',
      firstName: 'firstname',
      email: 'xyz@gmail.com',
      phone: '9639999999',
      merchantId: '5960507',
      key: 'BoZ1GZ',
      successUrl: 'https://www.payumoney.com/mobileapp/payumoney/success.php',
      failedUrl: 'https://www.payumoney.com/mobileapp/payumoney/failure.php',
      isDebug: true,
      hash:
        '461d4002c1432b3393cf2bfaae7acc4c50601c66568fb49a4a125e060c3bfc0e489290e7c902750d5db3fc8be2f180daf4d534d7b9bef46fa0158a4c8a057b61',
    };

    PayuMoney(payData)
      .then((data) => {
        // Payment Success
        console.log(data);
        // You can navigate to a success page or perform other actions here
      })
      .catch((e) => {
        // Payment Failed
        console.log(e);
        // You can navigate to a failure page or perform other actions here
      });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Payment Screen</Text>
        <Button title="Make Payment" onPress={this.handlePayment} />
      </View>
    );
  }
}

export default Payucheck;
