import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView} from 'react-native';
import { useState, useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function Login({navigation}) {

    const { idioma } = useContext(IdiomaContext);

    return (
        <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
            <Text style={styles.text}>{idioma === 'es' ? 'Iniciar sesion' : 'Login'}</Text>
            <View style={styles.listContainer}>
                <Text style={styles.textInput}>{idioma === 'es' ? 'Usuario' : 'User'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'nombre de usuario' : 'username'} />
                <Text style={styles.textInput}>{idioma === 'es' ? 'Contraseña' : 'Password'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'contraseña' : 'password'} secureTextEntry={true} />
            </View>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Iniciar sesión' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Registrarme' : 'Register'}</Text>
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
    foto: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        backgroundColor: '#e2e8f0',
        marginBottom: 15,
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
        fontSize: 19,
        borderColor: '#cbd5e1',
        marginBottom: 5,

    },
});