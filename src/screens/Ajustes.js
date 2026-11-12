import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';
import {AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import { styles, colores } from '../Styles/Styles';

export default function Ajustes({navigation}) {
  const { idioma, setIdioma } = useContext(IdiomaContext);
  const { setToken } = useContext(AuthContext);

  function cerrarSesion() {
    setToken(null);
  }


  return (
    <SafeAreaView style={styles.container}>
    <View style={[styles.contenido, styles.centrado]}>
      <Text style={[styles.titulo, styles.centrado]}>
        {idioma === 'es' ? 'Seleccionar idioma:' : 'Select language:'}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          idioma === 'es' && styles.seleccionado,
        ]}
        onPress={() => setIdioma('es')}
      >
        <Text style={styles.buttonText}>{idioma === 'es' ? 'Español' : 'Spanish'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          idioma === 'en' && styles.seleccionado,
        ]}
        onPress={() => setIdioma('en')}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} 
      onPress={cerrarSesion}>
        <Text style={styles.buttonText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
