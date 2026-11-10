import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';
import {SafeAreaView} from 'react-native-safe-area-context';


export default function Productos({ navigation }) {

    const { idioma } = useContext(IdiomaContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
        <View>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('NuevoProducto')}>
                <Text style={styles.buttonText}>{idioma === 'es' ? 'Nuevo producto' : 'New Product'}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>{idioma === 'es' ? 'Mis Productos' : 'My products'}</Text>
            <View style={styles.listContainer}>
                <Text style={styles.text}>Producto 1</Text>
                <Text style={styles.text}>Producto 2</Text>
                <Text style={styles.text}>Producto 3</Text>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>      
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
});