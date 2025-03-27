import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function LandingScreen() {
  const [userFullName, setUserFullName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/signin');
      } else {
        const { data, error } = await supabase
          .from('user_details')
          .select('firstname, lastname')
          .eq('uuid', session.user.id)
          .single();
        if (error || !data) {
          console.error('Error or no data:', error);
          setUserFullName('User');
        } else {
          setUserFullName(`${data.firstname} ${data.lastname}`);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/signin');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {userFullName}</Text>
      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
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
    backgroundColor: '#000000',
  },
  welcomeText: {
    color: '#FFA500',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});