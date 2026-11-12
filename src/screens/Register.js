import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { useState, useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles, colores } from '../Styles/Styles';

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
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={[styles.contenido, styles.centrado]}
                keyboardShouldPersistTaps="handled"
            >
            <Text style={styles.titulo}>{idioma === 'es' ? 'Registrar' : 'Register'}</Text>
            <View style={styles.formulario}>
                <Text style={styles.etiqueta}>{idioma === 'es' ? 'Nombre' : 'Name'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'nombre de usuario' : 'username'}
                value={username}
                onChangeText={setUsername}
                />
                <Text style={styles.etiqueta}>{idioma === 'es' ? 'correo' : 'Email'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'correo de usuario' : 'email'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                />
                <Text style={styles.etiqueta}>{idioma === 'es' ? 'Contraseña' : 'Password'}</Text>
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
        <View style={styles.footer}>
                <Text style={styles.textoSecundario}>{idioma === 'es' ? 'Shellcatch' : 'Shellcatch'}</Text>
            </View>
         </SafeAreaView>      
    );
}  