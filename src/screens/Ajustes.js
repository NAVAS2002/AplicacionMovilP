import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';

export default function Ajustes({navigation}) {
  const { idioma, setIdioma } = useContext(IdiomaContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {idioma === 'es' ? 'Seleccionar idioma' : 'Select language'}
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          idioma === 'es' && styles.seleccionado,
        ]}
        onPress={() => setIdioma('es')}
      >
        <Text style={styles.buttonText}>Español</Text>
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

      <Text style={styles.estado}>
        {idioma === 'es'
          ? 'Idioma actual: Español'
          : 'Current language: English'}
      </Text>
      <TouchableOpacity style={styles.buttonC} 
      onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    backgroundColor: '#64748b',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonC: {
    width: '100%',
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  seleccionado: {
    backgroundColor: '#2563eb',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  estado: {
    marginTop: 15,
    fontSize: 16,
    color: '#475569',
  },
});