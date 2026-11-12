import { StyleSheet } from 'react-native';

export const colores = {
  primario: '#2563eb',
  primarioSuave: '#0b6ef0',
  fondo: '#f8fafc',
  superficie: '#ffffff',
  texto: '#0f172a',
  textoSecundario: '#475569',
  borde: '#cbd5e1',
  peligro: '#b91c1c',
  peligroSuave: '#fee2e2',
  exito: '#15803d',
};

export const styles = StyleSheet.create({
  // Pantalla principal: View o SafeAreaView.
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
  },

  // Para contentContainerStyle de un ScrollView.
  contenido: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 32,
    width: '100%',
    maxWidth: 600,
    alignSelf: 'center',
  },

  // Combinar con contenido para login y registro.
  centrado: {
    justifyContent: 'center',
  },

  encabezado: {
    marginBottom: 24,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colores.texto,
    marginBottom: 8,
  },

  subtitulo: {
    fontSize: 16,
    lineHeight: 24,
    color: colores.textoSecundario,
  },

  texto: {
    fontSize: 16,
    lineHeight: 24,
    color: colores.texto,
  },

  textoSecundario: {
    fontSize: 14,
    lineHeight: 21,
    color: colores.textoSecundario,
  },

  // Formularios.
  formulario: {
    backgroundColor: colores.superficie,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colores.borde,
    marginBottom: 20,
  },

  campo: {
    marginBottom: 18,
  },

  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: colores.texto,
    marginBottom: 8,
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colores.superficie,
    color: colores.texto,
    fontSize: 16,
  },

  inputMultilinea: {
    minHeight: 110,
    textAlignVertical: 'top',
  },

  inputError: {
    borderColor: colores.peligro,
  },

  // Botones.
  button: {
    minHeight: 48,
    backgroundColor: colores.primario,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  buttonText: {
    color: colores.superficie,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  buttonSecundario: {
    backgroundColor: colores.primarioSuave,
    borderRadius: 12,
  },

  buttonTextSecundario: {
    color: colores.primario,
  },

  buttonPeligro: {
    backgroundColor: colores.peligro,
    borderRadius: 12,
  },

  buttonDeshabilitado: {
    opacity: 0.5,
  },

  // Tarjetas de productos.
  tarjeta: {
    backgroundColor: colores.superficie,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colores.borde,
    overflow: 'hidden',
    marginBottom: 20,
  },

  tarjetaContenido: {
    padding: 16,
  },

  tarjetaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colores.texto,
    marginBottom: 8,
  },

  descripcion: {
    fontSize: 15,
    lineHeight: 22,
    color: colores.textoSecundario,
    marginBottom: 12,
  },

  precio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colores.primario,
    marginBottom: 16,
  },

  fotoProducto: {
    width: '100%',
    height: 200,
    backgroundColor: colores.primarioSuave,
  },

  // Foto adjunta al formulario.
  foto: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: colores.primarioSuave,
    marginBottom: 16,
  },

  // Perfil.
  perfil: {
    alignItems: 'center',
    marginBottom: 24,
  },

  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colores.primarioSuave,
    marginBottom: 16,
  },

  // Mensajes.
  mensajeError: {
    backgroundColor: colores.peligroSuave,
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },

  textoError: {
    fontSize: 14,
    lineHeight: 21,
    color: colores.peligro,
  },

  textoExito: {
    fontSize: 14,
    color: colores.exito,
    marginBottom: 12,
  },

  vacio: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  separador: {
    height: 1,
    backgroundColor: colores.borde,
    marginVertical: 20,
  },

  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: colores.superficie,
    borderTopWidth: 1,
    borderTopColor: colores.borde,
  },
  BotonFlotante: {
    padding: 16,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 50,
  },
});
