1.- Crear proyecto React-Native
npx @react-native-community/cli@latest init ProductosJS
2.- Realizar una aplicación, con selector de idioma (este con context api) 
que permita cargar un listado de productos, junto con toma de fotos
--1.Crear pantallas y sus respectivos diseño, luego añadiremos la logica y funcionalidad.
Librerias utilizadas para la navegacion: npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context
Stack para navegar entre pantallas:
--2.Implementar funcionalidad de camara, se uso la libreria npm install react-native-image-picker
--3.Implementar selector de idioma con context Api
3.-Dentro de la misma aplicación generar un login, que consuma el backend
--1.Se crea la interfaz que luego se conectara al backend
--2.Conexion del login
--3.Conexion del register
4.-El crud de productos debe estar conectado al server, al desloguearme y volver a loguear debe traerme mis fotos y productos
--1.Configurar token de inicio, es necesario ya que las rutas se encuentran protegidas
--2.Modificacion de pantallas, se aplico funcionalidad