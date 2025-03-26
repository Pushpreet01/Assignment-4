import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabaseClient';

type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    Landing: undefined;
};

type SignUpScreenNavigationProp = NavigationProp<AuthStackParamList, 'Landing'>;

export default function LandingScreen() {
    const [user, setUser] = useState<{ firstname: string; lastname: string; uuid: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<SignUpScreenNavigationProp>();

    useEffect(() => {
        const fetchUserDetails = async () => {
            const { data: userDetails, error } = await supabase
                .from('user_details')
                .select('firstname, lastname, uuid')
                .single();

            if (error) {
                Alert.alert('Error', error.message);
            } else {
                setUser(userDetails);
            }
            setLoading(false);
        };

        fetchUserDetails();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigation.navigate('SignIn');
        Alert.alert('Success', 'Logged out successfully!');
    };

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome, {user?.firstname} {user?.lastname}!
            </Text>
            <Text style={styles.subtitle}>We're glad to have you here.</Text>
            <Text style={styles.text}>Enjoy exploring your personalized experience.</Text>

            <Text style={styles.logout} onPress={handleLogout}>
                Logout
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
    subtitle: { fontSize: 18, marginBottom: 20, textAlign: 'center', color: '#555' },
    text: { fontSize: 16, marginBottom: 20, textAlign: 'center', color: '#777' },
    logout: { fontSize: 16, color: 'red', marginTop: 20, textAlign: 'center' },
});
