import { View, Text, Button, StyleSheet } from 'react-native';

export default function PaymentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Screen</Text>
      <Text style={styles.text}>Choose your payment method (Stripe, PayPal, Razorpay - Placeholder)</Text>
      <Button
        title="Proceed with Payment"
        onPress={() => alert('Payment would be processed here.')}
      />
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
});
