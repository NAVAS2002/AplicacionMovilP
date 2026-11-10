import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { useState, useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';
import {SafeAreaView} from 'react-native-safe-area-context';

const API_URL = 'http://10.0.2.2:3000'

export default function Register({navigation}) {

    const { idioma } = useContext(IdiomaContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const RegistrarUsuario = async () => {
        try {
            const respuesta = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ username: username.trim(), email: email.trim(), password })
            });
            const data = await respuesta.json();
            if (respuesta.ok) {
                Alert.alert('Éxito', 'Usuario registrado correctamente');
                navigation.replace('Login');
            }else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
            <Text style={styles.text}>{idioma === 'es' ? 'Registrar' : 'Register'}</Text>
            <View style={styles.listContainer}>
                <Text style={styles.textInput}>{idioma === 'es' ? 'Nombre' : 'Name'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'nombre de usuario' : 'username'}
                value={username}
                onChangeText={setUsername}
                />
                <Text style={styles.textInput}>{idioma === 'es' ? 'correo' : 'Email'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'correo de usuario' : 'email'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                />
                <Text style={styles.textInput}>{idioma === 'es' ? 'Contraseña' : 'Password'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'contraseña' : 'password'} secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity style={styles.button}
            onPress={RegistrarUsuario}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Crear cuenta' : 'Create account'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Iniciar sesión' : 'Login'}</Text>
            </TouchableOpacity>
            <View>

            </View>
        </ScrollView> 
         </SafeAreaView>      
    );
}  

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#e4c6c6',
    },
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    button: {
        backgroundColor: '#2563eb',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    listContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        color: '#0f172a',
        backgroundColor: '#ffffff',
    },
    textInput: {
        width: '100%',
        fontSize: 16,
        borderColor: '#cbd5e1',
        marginBottom: 5,

    },
});