import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';
const axios = require('axios').default;

export default function App() {

  const [frases, setFrases] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  function pegarAPI(){
    setLoading(true);
    axios.get("https://pokeapi.co/api/v2/pokemon/1")
      .then(function (response){
          setFrases(response.data.forms[0].name);
          setImg(reponse.data.sprites.front_default);
          setLoading(false);
      })
      .catch(function (err){
          console.log(err);
      })
  }

  function getRandomPokemon(1, 899) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

  return (
    <View style={styles.container}>
      {!loading ? <Button 
        title="Obtener frase"
        onPress={() => pegarAPI()}
        style={styles.boton}
      /> : <ActivityIndicator/>}
      {frases.length == 0 ? null :
        <>
        {frases.map((frase, index) => <Text key={index}>{frase}</Text>)}
        </>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    color: 'red',
    margin: 20
  }
});
