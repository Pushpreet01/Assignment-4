import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabaseClient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Landing: undefined;
};

type SignUpScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'SignUp'>;

export default function SignUpScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    const handleSignUp = async () => {
        if (!email || !password || !firstName || !lastName) {
            Alert.alert('Error', 'All fields are required');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email.toLowerCase(),
            password,
        });

        console.log('Data:', data);

        if (error) {
            console.log('Error:', error);
            Alert.alert('Error', error.message);
            return;
        }

        const user = data.user;

        if (user) {
            const { error: insertError } = await supabase
                .from('user_details')
                .insert({
                    uuid: user.id,
                    email: user.email,
                    firstname: firstName,
                    lastname: lastName,
                });

            // if (insertError) {
            //     console.log('Error:', insertError);
            //     Alert.alert('Error', insertError.message);
            //     return;
            // }

            if (insertError) {
              console.log('Insert Error Details:', insertError);
              console.log('Insert Payload:', {
                  uuid: user.id,
                  email: user.email,
                  firstname: firstName,
                  lastname: lastName,
              });
              Alert.alert('Error', insertError.message);
              return;
          }
        }

        Alert.alert('Success', 'Account created! Check your email to verify your account.');
        navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase())}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
    signInText: { marginTop: 10, color: 'blue', textAlign: 'center' },
});
