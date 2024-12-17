import { Text, View, Pressable, StyleSheet, } from 'react-native';
import { Link } from 'expo-router';

export default function DonationScreen() 
{
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Donate to Our Cause</Text>
      <Text style={styles.text}>Help us make a difference by contributing to our mission. Your donation will go a long way!</Text>
      <Link href="/payment"
        style={styles.linkBtn}>      
          <Text>Donate Now</Text>         
      </Link>
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

  linkBtn:{
    backgroundColor:"wheat",
    padding:20
  }
});
