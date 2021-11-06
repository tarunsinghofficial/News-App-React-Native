import React, {useEffect, useState, useContext} from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator, ScrollView, Image, Statusbar } from 'react-native';
import Card from '../../components/Card';
import newAPI from '../../apis/News';
import themeContext from '../../config/themeContext';

const NewZeal = ({ navigation }) => {

    const [isLoading, setLoading] = useState(true);
    const [newstech, setNewsTech] = useState([])

    useEffect(()=> {
        getNewsFromAPI()
    }, [])

    /* const newsResponse = async() => {
        const response = await newAPI.get('everything?q=tesla&from=2021-07-19&sortBy=publishedAt&apiKey=920deb9f754348c0bec4871fef36d971')
        console.log(response.data)
    } */

    function getNewsFromAPI() {
        newAPI.get('top-headlines?country=nz&apiKey=920deb9f754348c0bec4871fef36d971')
        .then(async function(response){
            setNewsTech(response.data)
        })
        .catch(function(error){
            console.log(error);
        })
        .finally(function(){
            setLoading(false);
        })
    }

    if(!newstech) {
        return null
    }
    const theme = useContext(themeContext);
    return (
        <ScrollView style={{backgroundColor: theme.backColor}}>
            {isLoading ? <ActivityIndicator size="large" color="#DA3349" /> : (
            <FlatList
                data={newstech.articles}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item}) => (
                    <Card 
                        item={item}
                    />
                )}
            />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    midText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 20
    }
})

export default NewZeal