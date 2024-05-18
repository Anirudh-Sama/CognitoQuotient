import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const Box_EQ = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
    <Text style={styles.text}>The test is of 90 minutes ,Read each of the 10 multiple-choice questions carefully.
Choose the option that best fits your answer.
Submit your responses.
Await your results to discover your cognitive aptitude.</Text>
<TouchableOpacity onPress={()=> navigation.navigate('iqqiz')} style={styles.button} >
        <Text style={styles.buttonText}>Next</Text>
     </TouchableOpacity>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  backgroundColor: '#ffffff',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  padding: 16,
},
text: {
  fontSize: 18, 
},
button: {
  backgroundColor: '#1e293b',
  borderRadius: 8,
  padding: 12,
  marginTop: 16,
  alignItems: 'center',
},
buttonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},
});


export default Box_EQ