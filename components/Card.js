import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = props =>{
    return(
        <View style={{...styles.card,...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
   card:{
    shadowColor:'black',
    shadowOffset:{width:0, height:2},
    shadowRadius:6,
    shadowOpacity:0.26,  //only apply shadow to IOS
    elevation:8,  //only give shadow to Android
    backgroundColor:'white',
    padding:20,
    borderRadius:10
   } 
});

export default Card;


{/* <View style={{...styles.card,...props.style}}>    //...styles.card, ...props.style means we can embed any style with card style
            {props.children}      //we can write .children 
</View> */}