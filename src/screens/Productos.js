import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image } from 'react-native';
import { useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { IdiomaContext } from '../context/IdiomaContext';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  // GET /products
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            {idioma === 'es' ? 'Mis Productos' : 'My Products'}
          </Text>

          {cargando ? (
            <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
          ) : productos.length === 0 ? (
            <Text style={styles.emptyText}>
              {idioma === 'es' ? 'No tienes productos registrados' : 'No products registered'}
            </Text>
          ) : (
            <View style={styles.listContainer}>
              {productos.map((item) => (
                <View key={item._id} style={styles.card}>
                  {item.fotourl && (
                    <Image
                      source={{ uri: `${API_URL}${item.fotourl}` }}
                      style={styles.imagen}
                    />
                  )}
                  <View style={styles.cardDetails}>
                    <Text style={styles.nombre}>{item.name}</Text>
                    <Text style={styles.precio}>${item.price}</Text>
                    {item.description ? (
                      <Text style={styles.descripcion}>{item.description}</Text>
                    ) : null}
                  </View>

                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => navigation.navigate('NuevoProducto', { producto: item })}
                  >
                    <Text style={styles.editText}>✎</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => confirmarEliminar(item._id)}
                  >
                    <Text style={styles.deleteText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('NuevoProducto')}
          >
            <Text style={styles.buttonText}>
              {idioma === 'es' ? '+ Nuevo producto' : '+ New Product'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0f172a',
  },
  emptyText: {
    textAlign: 'center',
    color: '#64748b',
    marginTop: 30,
    fontSize: 16,
  },
  listContainer: {
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  cardDetails: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  precio: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
    marginTop: 2,
  },
  descripcion: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#dbeafe',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  editText: {
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
  },
  deleteText: {
    color: '#dc2626',
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    paddingVertical: 10,
  },
});