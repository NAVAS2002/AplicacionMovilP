import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert, PermissionsAndroid, ScrollView, ActivityIndicator } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useState, useContext, useEffect } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, colores } from '../Styles/Styles';

const API_URL = 'http://10.0.2.2:3000';

export default function NuevoProducto({ navigation, route }) {
  const { idioma } = useContext(IdiomaContext);
  const { token } = useContext(AuthContext);

  const productoEditar = route.params?.producto;
  const esEdicion = Boolean(productoEditar);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [categoria, setCategoria] = useState('');
  const [foto, setFoto] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (esEdicion) {
      setName(productoEditar.name || '');
      setPrice(productoEditar.price ? String(productoEditar.price) : '');
      setDescription(productoEditar.description || '');
      setCategoria(productoEditar.categoria || '');
    }
  }, [productoEditar]);

  async function tomarFoto() {
    try {
      const permiso = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
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
        Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
        return;
      }

      const imagen = resultado.assets?.[0];
      if (imagen?.uri) {
        setFoto(imagen);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto. Intenta de nuevo.');
    }
  }

  const guardarProducto = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert(
        idioma === 'es' ? 'Atención' : 'Warning',
        idioma === 'es' ? 'El nombre y el precio son obligatorios' : 'Name and price are required'
      );
      return;
    }

    setCargando(true);

    try {
      let respuesta;

      if (esEdicion) {
        respuesta = await fetch(`${API_URL}/products/${productoEditar._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            price: Number(price),
            description: description.trim(),
            categoria: categoria.trim(),
          }),
        });
      } else {
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('price', price.trim());
        formData.append('description', description.trim());
        formData.append('categoria', categoria.trim());

        if (foto) {
          formData.append('foto', {
            uri: foto.uri,
            name: foto.fileName || `photo_${Date.now()}.jpg`,
            type: foto.type || 'image/jpeg',
          });
        }

        respuesta = await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      const data = await respuesta.json();

      if (respuesta.ok) {
        Alert.alert(
          idioma === 'es' ? 'Éxito' : 'Success',
          esEdicion
            ? (idioma === 'es' ? 'Producto actualizado' : 'Product updated')
            : (idioma === 'es' ? 'Producto creado' : 'Product created'),
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack(),
            },
          ]
        );
      } else {
        Alert.alert('Error', data.message || 'No se pudo guardar el producto');
      }
    } catch (error) {
      console.error('Error al guardar:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenido} keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.texto}>{idioma === 'es' ? 'Nombre' : 'Name'}</Text>
          <TextInput
            style={styles.input}
            placeholder={idioma === 'es' ? 'Nombre del producto' : 'Product name'}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.texto}>{idioma === 'es' ? 'Precio' : 'Price'}</Text>
          <TextInput
            style={styles.input}
            placeholder={idioma === 'es' ? 'Precio' : 'Price'}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <Text style={styles.texto}>{idioma === 'es' ? 'Descripción' : 'Description'}</Text>
          <TextInput
            style={styles.input}
            placeholder={idioma === 'es' ? 'Descripción' : 'Description'}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.texto}>{idioma === 'es' ? 'Categoría' : 'Category'}</Text>
          <TextInput
            style={styles.input}
            placeholder={idioma === 'es' ? 'Categoría' : 'Category'}
            value={categoria}
            onChangeText={setCategoria}
          />
          </View>
          <View style={styles.contenido}>
          {!esEdicion && (
            <>
              <TouchableOpacity style={styles.button} onPress={tomarFoto}>
                <Text style={styles.buttonText}>
                  {foto
                    ? (idioma === 'es' ? 'Cambiar foto' : 'Change photo')
                    : (idioma === 'es' ? 'Tomar foto' : 'Take photo')}
                </Text>
              </TouchableOpacity>

              {foto && (
                <View style={styles.fotoContainer}>
                  <Image source={{ uri: foto.uri }} style={styles.foto} resizeMode="cover" />
                  <TouchableOpacity style={styles.button} onPress={() => setFoto(null)}>
                    <Text style={styles.buttonText}>
                      {idioma === 'es' ? 'Borrar foto' : 'Remove photo'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}
          <TouchableOpacity
            style={styles.button} 
            onPress={guardarProducto}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>
                {esEdicion
                  ? (idioma === 'es' ? 'Actualizar Producto' : 'Update Product')
                  : (idioma === 'es' ? 'Guardar Producto' : 'Save Product')}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

