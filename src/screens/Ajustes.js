import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';


export default function Ajustes() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Seleccionar Idioma</Text>    
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Español</Text>
                </TouchableOpacity> 
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>Ingles</Text>
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
    text: {
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,   
    },
});