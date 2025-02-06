import { View, Text, Pressable, StyleSheet, ImageBackground, TextInput } from 'react-native';
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import { useStripe } from '@stripe/stripe-react-native';
import { router } from 'expo-router';



export default function PaymentScreen() {
    const [amount, setAmount] = useState(1150);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('stripe');
    const [paymentMethods] = useState([
      { label: 'Stripe', value: 'stripe', enabled: true },
      { label: 'PayPal', value: 'paypal', enabled: false },
      { label: 'Razorpay', value: 'razorpay', enabled: false },
    ]);
    

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    // const API_URL = "http://192.168.18.28:3080";
    const API_URL = "http://10.196.0.124:3080";    

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`${API_URL}/payment-sheet`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: amount })
        });
        const { paymentIntent, ephemeralKey, customer } = await response.json();
    
        return {
          paymentIntent,
          ephemeralKey,
          customer,
        };
    };

    const initializePaymentSheet = async () => {
        const {
          paymentIntent,
          ephemeralKey,
          customer,
        } = await fetchPaymentSheetParams();
    
        const { error } = await initPaymentSheet({
                merchantDisplayName: "mLab-CodeTribe-2024/2025",
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
                //methods that complete payment after a delay, like SEPA Debit and Sofort.
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: {
                name: 'Kabelo Matlakala',
            }
        });

        if (!error) { setLoading(true); }
    };
    
    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
  
      if (error) 
      {
        alert(`Error code: ${error.code}`, error.message);
      } 
      else 
      {
        alert('Payment Successful, Thank you for your contribution');
        router.back();
      }
    };
    
    // useEffect(() => {
    //     initializePaymentSheet();
    // }, []);

    return (
        <View style={styles.container}>
          <ImageBackground
            source={require("@/assets/images/piggy_two.jpg")}  // Replace with correct path to your image
            style={styles.imageBackground}
            resizeMode='cover'
          >
            <View style={styles.row}>
              <Text style={styles.header}>Amount: R</Text>
              <TextInput 
                style={styles.input}
                keyboardType="numeric" // Ensure only numbers can be entered
                placeholder={`${amount}`}
                value={amount}
                onChangeText={(text) => setAmount(text)}
              />
            </View>
           
            <View style={{ alignItems:"center", justifyContent:"center"}}>
              <Text style={styles.text}>Payment method: </Text>
              {/* Picker for selecting payment method */}
              <Picker
                selectedValue={selectedPaymentMethod}
                onValueChange={(itemValue) => setSelectedPaymentMethod(itemValue)}
                style={styles.picker}
              >
                {paymentMethods.map((method) => (
                  <Picker.Item
                    key={method.value}
                    label={method.label}
                    value={method.value}
                    enabled={method.enabled}  // Enable or disable the payment method
                  />
                ))}
              </Picker>
            </View>


            <Pressable style={styles.payBtn}
                onPress={ async () => { 
                    alert("Please wait!!! While Initiating your payment")
                    await initializePaymentSheet()
                    .then(async ()=> { await openPaymentSheet() })                    
                }}
            >
                <Text>Proceed to Payment</Text>
            </Pressable>
          </ImageBackground>
            
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  header: {
    fontSize: 21,
    fontWeight: 'bold',    
  },
  row:{
    flexDirection:'row',
    alignItems:"center", 
    justifyContent:"center", 
    gap: 4, 
    backgroundColor: "#f0f0f0",
    padding: 4, 
    paddingLeft:8,
    borderRadius: 4 
  },
  input: {
    height: 40,
    width: 150,
    backgroundColor:"wheat",
    borderColor: '#fff',
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    fontWeight:"semibold",
    borderRadius: 2,
  },
  picker: {
    height: 50,
    width: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 86,
  },
  text: {
    fontSize: 16,
    padding:8,
    margin: 4,
    marginTop:86,
    textAlign: 'center',
    backgroundColor:"#f0f0f0"
  },
  payBtn:{
    padding:8,
    backgroundColor:"wheat"
  }
});
