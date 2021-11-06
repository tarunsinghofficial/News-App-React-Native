import React, {useContext} from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableNativeFeedback } from 'react-native';
import themeContext from '../config/themeContext';

const {width, height} = Dimensions.get('window');

function Card({ onPress, image, navigation }) {

    const theme = useContext(themeContext);
    return (
        <TouchableNativeFeedback onPress={onPress}>  
            <View style={{
                borderRadius: 30,
                backgroundColor: theme.cardBackground,
                height: 60,
                width: 60,
            }}>
                <Image 
                    source={image} 
                    style={{width: 60, height: 60}} 
                />
            </View>
        </TouchableNativeFeedback>
    );
}
const styles = StyleSheet.create({
    image: {
        width: width,
        height: height * 0.15,
    },
    author: {
        width: width,
        marginTop: -10,
        marginHorizontal: width * 0.03,
        color: 'darkgray'
    },
    desc: {
        width: width,
        marginTop: 10,
        marginHorizontal: width * 0.03,
        color: 'gray',
        maxWidth: width * 0.8
    }
})

export default Card;