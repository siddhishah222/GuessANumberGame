import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Alert, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Card from '../Components/Card';
import Colors from '../constants/colors';
import Input from '../Components/Input';
import UserNumberContainer from '../Components/UserNumberContainer';

const StartGameScreen = props =>{

    const [enteredValue, setEnteredValue] = useState('');
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }

    const resetHandler = () => {
        setEnteredValue('');
        setUserConfirmed(false);
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber>99){
            Alert.alert(
                'Invalid Number!',
                'Number has to be a number between 1 and 99.', 
                [{text:'okay', style:'destructive', onPress:resetHandler}])
            return;
        }                                                //only positive and number less than 99 is allowed
        setUserConfirmed(true);                          //user confirmed value entered
        setSelectedNumber(chosenNumber);       //save the entered value and parseInt to set value as an Integer
        setEnteredValue('');                             //reset entered value
        Keyboard.dismiss();
    }

    //Now after user confirm we will show user what number they have entered and confirmed
    let confirmedOutput;

    if(userConfirmed){
        confirmedOutput = 
        <Card style={styles.summaryContainer}>
            <Text>You selected</Text>
            <UserNumberContainer> {selectedNumber}</UserNumberContainer>
            <Button title="START GAME" onPress={()=>props.onStartGame(selectedNumber)}/>
        </Card>
    }

    return(
        <TouchableWithoutFeedback 
            onPress={()=>{
                Keyboard.dismiss();
        }}>
            <View style={styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>

            {/* <View style={styles.inputContainer}> */}  
            {/* replaced with card as styles in card is added here */}
            <Card style={styles.inputContainer}>

                <Text>Select a Number</Text>

                {/* <TextInput/> */}
                {/* Replaced TextInput with Input.js we created */}
                <Input 
                    style={styles.input} 
                    blurOnSubmit 
                    autoCapitalize="none" 
                    autoCorrect={false}
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={numberInputHandler}
                    value={enteredValue}
                />

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button 
                            title="Reset" 
                            onPress={resetHandler}  
                            color={Colors.accent}
                        />
                    </View>
                    <View style={styles.button}>
                        <Button 
                            title="Confirm" 
                            onPress={confirmInputHandler}
                            color={Colors.primary}
                        />  
                    </View>
                   
                </View>
            </Card>
            {/* </View> */}

            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:10,
        alignItems:'center'
    },
    title:{
        fontSize:20,
        marginVertical:10,
        fontFamily:'open-sans-bold'
    },
    inputContainer:{
        width:300,
        maxWidth:'80%',
        alignItems:'center',
        // shadowColor:'black',
        // shadowOffset:{width:0, height:2},
        // shadowRadius:6,
        // shadowOpacity:0.26,  //only apply shadow to IOS
        // elevation:8,  //only give shadow to Android
        // backgroundColor:'white',
        // padding:20,
        // borderRadius:10

        //commented styles is added in Card.js so we can reuse it anywhere
    },
    buttonContainer:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal:15
    },
    button:{
        width:'40%',
    },
    input:{
        width:50,
        textAlign:'center'
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center'
    },

});

export default StartGameScreen;