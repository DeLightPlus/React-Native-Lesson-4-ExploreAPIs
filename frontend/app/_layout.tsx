import { Stack } from "expo-router";
import { StripeProvider } from '@stripe/stripe-react-native';
import { useState, useEffect } from 'react';

export default function RootLayout() {
  const [publishableKey, setPublishableKey] = useState('');

  // const fetchPublishableKey = async () => {
  //   //const key = await fet(); // Assuming fetchKey() is a function to get your Stripe key from your server.
  //   //setPublishableKey(key);

  // };

  // useEffect(() => {
  //   fetchPublishableKey();
  // }, []);

  // if (!publishableKey) 
  // {
  //   return null; // Or show a loading spinner while the key is fetched
  // }

  return (
    <StripeProvider publishableKey="pk_test_51QV5eXKfXucQGnUWPUDI6M2raAoebipaveIJLPgZEgNoFgkKk7yRi1lZH7lXYEpoonLNYm1JmwovnwVQsYhnnX5h00fjH0z8uv">
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="payment" />
      </Stack>
    </StripeProvider>
  );
}
