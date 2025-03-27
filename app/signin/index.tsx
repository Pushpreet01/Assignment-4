import { useRouter } from 'expo-router';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMsg(error.message);
    } else {
      router.replace('/landing');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#FFA500"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#FFA500"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Go to Sign Up</Text>
      </Pressable>
      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000000',
  },
  input: {
    marginBottom: 10,
    color: '#FFA500',
    borderColor: '#FFA500',
    borderWidth: 1,
    padding: 8,
    backgroundColor: '#1A1A1A',
  },
  errorText: {
    color: '#FF4500',
    marginTop: 10,
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