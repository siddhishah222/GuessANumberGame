import {Text,StyleSheet,View} from 'react-native';
import Colors from '../constants/colors';

const UserNumberContainer = props =>{
    return(
       <View style={styles.container}>
        <Text style={styles.number}>{props.children}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container:{
    padding:10,
    borderWidth:2,
    borderColor:Colors.accent,
    borderRadius:10,
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center',
  },
  number:{
    color:Colors.accent,
    fontSize:22
  }
});

export default UserNumberContainer;

