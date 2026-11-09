import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Productos from './src/screens/Productos';
import Ajustes from './src/screens/Ajustes';
import NuevoProducto from './src/screens/NuevoProducto';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Menu() {
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
      />

      <Tab.Screen
        name="Ajustes"
        component={Ajustes}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Menu"
            component={Menu}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NuevoProducto"
            component={NuevoProducto}
            options={{ title: 'Nuevo producto' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
