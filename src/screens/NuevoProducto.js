import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, PermissionsAndroid, ScrollView} from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useState, useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';


export default function NuevoProducto() {

    const [foto, setFoto] = useState(null);
    const { idioma } = useContext(IdiomaContext);

    async function tomarFoto() {

    try {

        const permiso = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        if (permiso !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permiso denegado', 'No se puede acceder a la cámara.');
            return;
        }

        const resultado = await launchCamera({
            mediaType: 'photo',
            cameraType: 'back',
            quality: 0.8,
            maxWidth: 1200,
            maxHeight: 1200,
        });
        if (resultado.didCancel) return;

        if (resultado.errorCode) {
            console.error('Error al tomar la foto:', resultado.errorMessage);
            Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
            return;

        }

        const imagen = resultado.assets?.[0];
        if (imagen?.uri) {
            setFoto(imagen.uri);
        }
    } catch (error) {
        console.error('Error al tomar la foto:', error);
        Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
    }
}
        


    return (
        <ScrollView contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
            <Text style={styles.text}>{idioma === 'es' ? 'Mis Productos' : 'My Products'}</Text>
            <View style={styles.listContainer}>
                <Text style={styles.text}>{idioma === 'es' ? 'Nombre' : 'Name'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'nombre del producto' : 'name of the product'} />
                <Text style={styles.text}>{idioma === 'es' ? 'Precio' : 'price'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'Precio del productoo' : 'Price of the product'} />
                <Text style={styles.text}>{idioma === 'es' ? 'Descripcion' : 'Description'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'Descripcion del producto' : 'Description of the product'} />
                <Text style={styles.text}>{idioma === 'es' ? 'Categoria' : 'Category'}</Text>
                <TextInput style={styles.input} placeholder={idioma === 'es' ? 'Categoria del producto' : 'Category of the product'} />
            </View>
            <TouchableOpacity style={styles.button}
            onPress={tomarFoto}>
                <Text style={styles.buttonText}>{foto ? (idioma === 'es' ? 'Cambiar imagen' : 'Change image')
                : (idioma === 'es' ? 'Adjuntar imagen' : 'Attach image')}</Text>
            </TouchableOpacity>
            {foto && <View>
                <Image
                    source={{ uri: foto }}
                    style={styles.foto}
                    resizeMode="contain"
                />                
                <TouchableOpacity style={styles.button}
                onPress={() => setFoto(null)}>
                    <Text style={styles.buttonText}>{idioma === 'es' ? 'Borrar imagen' : 'Delete image'}</Text>
                </TouchableOpacity>
                </View>}
        </ScrollView>        
    );

}  

const styles = StyleSheet.create({
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
});