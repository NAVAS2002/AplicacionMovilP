import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';


export default function NuevoProducto() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Ingrese Nuevo Producto:</Text>
            <View style={styles.listContainer}>
                <Text style={styles.text}>Nombre</Text>
                <TextInput style={styles.input} placeholder="Nombre del producto" />
                <Text style={styles.text}>Precio</Text>
                <TextInput style={styles.input} placeholder="Precio del producto" keyboardType="numeric" />
                <Text style={styles.text}>Descripcion</Text>
                <TextInput style={styles.input} placeholder="Descripcion del producto" />
                <Text style={styles.text}>Categoria</Text>
                <TextInput style={styles.input} placeholder="Categoria del producto" />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Adjuntar Imagen</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Crear Producto</Text>
            </TouchableOpacity>
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