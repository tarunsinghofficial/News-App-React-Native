import { useTheme } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { 
    View, 
    Modal, 
    Button, 
    StyleSheet, 
    Image, 
    Dimensions, 
    Text, 
    Share,
    TouchableNativeFeedback, 
    TouchableOpacity 
} from 'react-native';
import themeContext from '../config/themeContext';
import WebView from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

function Card({ item, onPress }) {

    const [modalVisible, setModalVisible] = useState(false);

    //handleShare
    const handleShare = () => {
        const {url, title} = item; //get url and title form our prop
        var message = `${title} \n\n Read More ${url} \n\n Shared via The NewsXTimes`; // custome message
        return Share.share(
            {title, message, url: message},
            {dialogTitle: `Share ${title}`}
        );
    }

    const theme = useContext(themeContext);
    return (
        <View>
            <TouchableNativeFeedback onPress={() => setModalVisible(!modalVisible)}>
                <View style={{
                    margin: 20,
                    borderRadius: 15,
                    backgroundColor: theme.cardBackground,
                    height: 290,
                    overflow: 'hidden',
                    elevation: 3
                }}>
                    <Image source={{ uri: item.urlToImage}} style={styles.image} />
                    <Text style={{
                        width: width,
                        marginHorizontal: width * 0.03,
                        marginVertical: width * 0.03,
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: theme.textColor,
                        maxWidth: width * 0.85
                    }} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.author}>{item.author ? item.author : 'Not Available'}</Text>
                    <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{
                            backgroundColor: theme.headerColor,
                            borderRadius: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 140,
                            padding: 2,
                            elevation: 3,
                            marginLeft: 10,
                            marginTop: 5}}>    
                            <Text style={{
                                fontSize: 10,
                                color: 'white',
                            }}>🕘 {item.publishedAt}
                            </Text>
                        </View>
                        <TouchableOpacity style={{
                            justifyContent: 'center',
                            marginRight: 10,
                        }}
                        onPress={handleShare}
                        >
                            <Ionicons name='share-social' color={theme.textColor} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableNativeFeedback>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                statusBarTranslucent={false}
            >
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30, marginTop: 5, overflow: 'hidden', flexDirection: 'column',
                }}>
                    <View>
                        <Button
                            title="Close"
                            onPress={() => setModalVisible(!modalVisible)}
                            color={'#252525'}
                        />
                        <Button
                             title="Share"
                             onPress={handleShare}
                             color={'#DA3349'}
                        />
                    </View>
                    <WebView source={{ uri: item.url }} />
                </View>
            </Modal></View>
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
        marginTop: 5,
        marginHorizontal: width * 0.03,
        color: 'gray',
        maxWidth: width * 0.8
    }
})

export default Card;