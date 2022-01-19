
import React , {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import UserNumberContainer from '../Components/UserNumberContainer';
import Card from '../Components/Card';

const generateRandomBetween = (min,max,exclude) => {
    min = Math.ceil(min);       //ceil so integer number is entered which is > 0, to round it up
    max = Math.floor(max);      // floor will do same thing but to round it down
    const rndNum = Math.floor(Math.random() * (max-min)) + min;         //gives random number between min and max
    if(rndNum === exclude){
        return generateRandomBetween (min, max, exclude);       //this concept of calling a function from inside the same function is called RECURSION
    } else {
        return rndNum;
    }
}

const GameScreen = props =>{
    const [currentGuess, setCurrentGuess] = useState(
        generateRandomBetween (1,100,props.userChoice)
    );

    const [rounds, setRounds] = useState(0);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    // useEffect(()=>{
    //     if(currentGuess === props.userChoice){
    //         props.onGameOver(rounds);
    //     }
    // },[]);

    const {userChoice, onGameOver} = props;

    useEffect(()=>{
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[ currentGuess,userChoice,onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
                {text:'Sorry!', style:'Cancel'}
            ]);
            return;
        } 
        if(direction === 'lower'){
            currentHigh.current=currentGuess;
        } else{
            currentLow.current=currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(curRounds => curRounds+1); //increment number of guess
    }
    return(
        <View style={styles.screen}>
            <Text> Opponent's Guess </Text>
            <UserNumberContainer> {currentGuess} </UserNumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    )
}

const styles = StyleSheet. create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    buttonContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
});

export default GameScreen;