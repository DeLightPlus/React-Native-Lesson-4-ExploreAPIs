import { Text, View, StyleSheet, ImageBackground, } from 'react-native';
import { Link } from 'expo-router';

export default function DonationScreen() 
{
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/piggy_one.jpg")}
        style={styles.imageBackground}
        resizeMode='cover'
      >
        <Text style={styles.header}>Donate to Our Cause</Text>
        <Text style={styles.text}>Help us make a difference by contributing to our mission. Your donation will go a long way!</Text>
        <Link href="/payment"
          style={styles.linkBtn}>      
            <Text>Donate Now</Text>         
        </Link>

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
    flex: 1, // Fill the parent container
    width: '100%', // Make the background fill the screen width
    justifyContent: 'center', // Center content inside the image background
    alignItems: 'center',
    paddingTop: "50%",   
  },
  header: {
    fontSize: 28,
    fontWeight: 800,
    marginBottom: 20,
    color:"white"
  },
  text: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color:"white"
  },

  linkBtn:{
    backgroundColor:"wheat",
    padding:20,
    borderRadius: 16,
    fontSize: 20,
    fontWeight: 800,
  }
});
