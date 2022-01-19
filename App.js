import React , {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
//import {AppLoading} from 'expo';

import AppLoading from 'expo-app-loading';
import Header from './Components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';



const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState();   //userNumber is false initially if it is undefined
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded){
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={()=>setDataLoaded(true)}
        onError={(err)=>console.log(err)}
      />
    );
  }


  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  } //to start a new game after the game is over in GameOverScreen

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0); //reset the guess round to 0 when starting a new game
  }

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  }


  let content = <StartGameScreen onStartGame={startGameHandler}/>;

  if(userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />    // if userNumber is true render GameScreen
  }  else if(guessRounds>0){
    content = (
      <GameOverScreen 
        roundsNumber={guessRounds} 
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      /> )   //userNumber and roundNumber are props created and passed from GameOverScreen.js to here
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess A Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
 screen:{
   flex:1,
 }
});








// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';

// const    = props =>{
//     return(
//         <View>

//         </View>
//     )
// }

// const styles = StyleSheet.create({

// });

// export default ;