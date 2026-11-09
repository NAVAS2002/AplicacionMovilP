import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


export default function Productos({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('NuevoProducto')}>
                <Text style={styles.buttonText}>Agregar Producto</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Productos:</Text>
            <View style={styles.listContainer}>
                <Text style={styles.text}>Producto 1</Text>
                <Text style={styles.text}>Producto 2</Text>
                <Text style={styles.text}>Producto 3</Text>
            </View>
        </View>        
    );

}  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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