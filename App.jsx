import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Productos from './src/screens/Productos';
import Ajustes from './src/screens/Ajustes';
import NuevoProducto from './src/screens/NuevoProducto';
import { IdiomaProvider, IdiomaContext } from './src/context/IdiomaContext';
import { AuthProvider } from './src/context/AuthContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Menu() {
  const { idioma } = useContext(IdiomaContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.barra,
        tabBarLabelStyle: styles.texto,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
        tabBarActiveBackgroundColor: '#dbeafe',
      }}
    >
      <Tab.Screen 
        name="Inicio"
        component={Productos}
        options={{
          title: idioma === 'es' ? 'Mis productos' : 'My products',
        }}
      />

      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
        options={{
          title: idioma === 'es' ? 'Ajustes' : 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

function Navegacion() {
  const { idioma } = useContext(IdiomaContext);

  return (
    <NavigationContainer>
      <Stack.Navigator InitialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Menu"
          component={Menu}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NuevoProducto"
          component={NuevoProducto}
          options={{
            title: idioma === 'es' ? 'Nuevo producto' : 'New product',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
      <IdiomaProvider>
        <Navegacion />
      </IdiomaProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  barra: {
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  texto: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});