import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, Image } from 'react-native';
const axios = require('axios').default;

export default function App() {

  const [frases, setFrases] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  function pegarAPI(){
    setLoading(true);
    axios.get("https://pokeapi.co/api/v2/pokemon/" + getRandomPokemon(1, 900))
      .then(function (response){
          setFrases(response.data.forms[0].name);
          setImg(reponse.data.sprites.front_default);
          setLoading(false);
      })
      .catch(function (err){
          console.log(err);
      })
  }

  function getRandomPokemon(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <View style={styles.container}>
      {!loading ? <Button 
        title="Random Pokémon"
        onPress={() => pegarAPI()}
        style={styles.boton}
      /> : <ActivityIndicator/>}
      {frases.length == 0 ? null :
        <>
        <Text style={styles.palabra}>{frases}</Text>
        <Image style={styles.tinyLogo}source={{uri: img}}/>
        </>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    color: 'red',
    margin: 20
  },
  tinyLogo: {
    width: 50,
    height: 50,
  }
});
