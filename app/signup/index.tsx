import { useRouter } from 'expo-router';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      const { error: insertError } = await supabase.from('user_details').insert({
        uuid: data.user?.id,
        email: email,
        firstname: firstName,
        lastname: lastName,
      });
      if (insertError) {
        setErrorMsg(insertError.message);
        console.log("Insert error:", insertError.message);
      } else {
        router.replace('/');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="First Name"
        placeholderTextColor="#FFA500"
        onChangeText={setFirstName}
        value={firstName}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        placeholderTextColor="#FFA500"
        onChangeText={setLastName}
        value={lastName}
        style={styles.input}
      />
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
      <Pressable style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => router.replace('/signin')}>
        <Text style={styles.buttonText}>Go to Sign In</Text>
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