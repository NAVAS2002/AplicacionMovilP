import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styles } from '../Styles/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { IdiomaContext } from '../context/IdiomaContext';

export default function Home({ navigation }) {
  const { idioma, setIdioma } = useContext(IdiomaContext);

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>{idioma === 'es' ? 'Bienvenido' : 'Welcome'}</Text>

          <Text style={styles.subtitulo}>
            {idioma === 'es' ? 'APP de productos' : 'APP of products'}
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <View style={styles.tarjetaContenido}>
            <Text style={styles.tarjetaTitulo}>{idioma === 'es' ? 'Crud de productos' : 'Crud of products'}</Text>

            <Text style={styles.descripcion}>
              {idioma === 'es' ? 'Inicio, registro, creacion, eidicion y borrado de productos.' : 'Login, register, create, edit y delete of products.'}
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>{idioma === 'es' ? 'Empezar' : 'Begin'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.tarjeta}>
            <Image source={{uri: 'https://scontent.fgye18-1.fna.fbcdn.net/v/t39.30808-6/305317749_486696023463673_7963937655186908974_n.png?stp=dst-png&cstp=mx1079x1079&ctp=s1079x1079&_nc_cat=107&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=RcqOyQuOdFMQ7kNvwHKLC2F&_nc_oc=Adr7sJDdf2FOOTWHbHfr914klZ2BFsLfidjY--F3f7FSzEnAG5Qn8DP68Uib0lemOrU&_nc_zt=23&_nc_ht=scontent.fgye18-1.fna&_nc_gid=b2l8fKoWb8VuYjnKeASoNg&_nc_ss=7b2a8&oh=00_AQQvh0XfoeE-St3eRXP_u4NMmBghzYKtP61EGrwXlyVTTQ&oe=6AFA8FDE'}}
            style={styles.fotoProducto}
            resizeMode="cover"
            />
        </View>
        <View style={[  styles.BotonFlotante, styles.centrado]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIdioma(idioma === 'es' ? 'en' : 'es')}
          >
            <Text style={styles.buttonText}>
              文
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.textoSecundario}>{idioma === 'es' ? 'Shellcatch' : 'Shellcatch'}</Text>
      </View>
    </View>
    
    </SafeAreaView>
  );
}