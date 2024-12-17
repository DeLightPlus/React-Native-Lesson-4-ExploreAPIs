import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import { useStripe } from '@stripe/stripe-react-native';


export default function PaymentScreen() {
    const [amount, setAmount] = useState(1150);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const API_URL = "http://192.168.18.28:3080";

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
          alert('Success', 'Your order is confirmed!');
        }
    };
    
    // useEffect(() => {
    //     initializePaymentSheet();
    // }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}></Text>
            <Text style={styles.text}>Choose your payment method (Stripe, PayPal, Razorpay - Placeholder)</Text>

            <Pressable style={styles.payBtn}
                onPress={ async () => { 
                    alert("Button Pressed, Please wait!!!")
                    await initializePaymentSheet()
                    .then(async ()=> { await openPaymentSheet() })                    
                }}
            >
                <Text>Proceed to Payment</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  payBtn:{
    padding:8,
    backgroundColor:"wheat"
  }
});
