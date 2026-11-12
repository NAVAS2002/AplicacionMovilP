import {View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import { useState, useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { styles, colores } from '../Styles/Styles';


const API_URL = 'http://10.0.2.2:3000'

export default function Login({navigation}) {

    const { idioma } = useContext(IdiomaContext);
    const { setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const IniciarSesion = async () => {
        try {
            const respuesta = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: email.trim(), password })
            });
            
            const data = await respuesta.json();

            if (respuesta.ok) {
                setToken(data.token);
            } else {
                Alert.alert('Error', data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={[styles.contenido,styles.centrado] }
                keyboardShouldPersistTaps="handled"
            >
            <Text style={styles.titulo}>{idioma === 'es' ? 'Iniciar sesion' : 'Login'}</Text>
            <View style={styles.formulario}>
                <Text style={styles.etiqueta}>{idioma === 'es' ? 'Correo' : 'Email'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'Ingrese correo electronico' : 'Enter email address'} 
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
            onPress={IniciarSesion}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Iniciar sesión' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Registrarme' : 'Register'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Inicio' : 'Home'}</Text>
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
