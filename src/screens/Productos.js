import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { IdiomaContext } from '../context/IdiomaContext';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, colores } from '../Styles/Styles';

const API_URL = 'http://10.0.2.2:3000';

export default function Productos({ navigation }) {
  const { idioma } = useContext(IdiomaContext);
  const { token } = useContext(AuthContext);

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);

  useFocusEffect(
    useCallback(() => {
      obtenerProductos();
    }, [token])
  );

  const obtenerProductos = async () => {
    if (!token) return;
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/products`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await respuesta.json();

      if (respuesta.ok) {
        setProductos(data);
      } else {
        Alert.alert('Error', data.message || 'No se pudieron obtener los productos');
      }
    } catch (error) {
      console.error('Error al obtener productos:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  const confirmarEliminar = (id) => {
    Alert.alert(
      idioma === 'es' ? 'Eliminar producto' : 'Delete product',
      idioma === 'es' ? '¿Estás seguro de eliminar este producto?' : 'Are you sure you want to delete this product?',
      [
        { text: idioma === 'es' ? 'Cancelar' : 'Cancel', style: 'cancel' },
        {
          text: idioma === 'es' ? 'Eliminar' : 'Delete',
          style: 'destructive',
          onPress: () => eliminarProducto(id),
        },
      ]
    );
  };

  const eliminarProducto = async (id) => {
    try {
      const respuesta = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await respuesta.json();

      if (respuesta.ok) {
        Alert.alert('Éxito', data.message);
        obtenerProductos();
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.contenido, styles.centrado]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.contenido}>
          <Text style={styles.titulo}>
            {idioma === 'es' ? 'Mis Productos' : 'My Products'}
          </Text>
          {cargando ? (
            <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
          ) : productos.length === 0 ? (
            <Text style={styles.textoSecundario}>
              {idioma === 'es' ? 'No tienes productos registrados' : 'No products registered'}
            </Text>
          ) : (
            <View style={styles.targeta}>
              {productos.map((item) => (
                <View key={item._id} style={styles.targetaContenido}>
                  {item.fotourl && (
                    <Image
                      source={{ uri: `${API_URL}${item.fotourl}` }}
                      style={styles.fotoProducto}
                    />
                  )}
                  <View style={styles.tarjetaTitulo}>
                    <Text style={styles.textoSecundario}>{idioma === 'es' ? 'Nombre' : 'Name'} {item.name}</Text>
                    <Text style={styles.textoSecundario}>{idioma === 'es' ? 'Precio' : 'Price'}: ${item.price}</Text>
                    <Text style={styles.textoSecundario}>{idioma === 'es' ? 'Categoria' : 'Category'}: {item.categoria}</Text>
                    <Text style={styles.textoSecundario}>{idioma === 'es' ? 'Descripcion' : 'Description'}: {item.description}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('NuevoProducto', { producto: item })}
                  >
                    <Text style={styles.buttonText}>{idioma === 'es' ? 'Editar' : 'Edit'}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => confirmarEliminar(item._id)}
                  >
                    <Text style={styles.buttonText}>{idioma === 'es' ? 'Eliminar' : 'Delete'}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <View style={[  styles.BotonFlotante, styles.centrado]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NuevoProducto')}
          >
            <Text style={styles.buttonText}>
              ✚
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}