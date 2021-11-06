import React, {useEffect, useState} from 'react';
import { StyleSheet, FlatList, ScrollView, ActivityIndicator} from 'react-native';

import TopNewsCard from '../components/TopNewsCard';
import newAPI from '../apis/News';

const TrendNews = ({ navigation }) => {

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
        newAPI.get('top-headlines?country=in&category=general&apiKey=920deb9f754348c0bec4871fef36d971')
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
    
    return (
        <ScrollView>
            {isLoading ? <ActivityIndicator visible={true} /> : (
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={newstech.articles}
                keyExtractor={(item, index) => 'key' + index}
                renderItem={({item}) => (
                    <TopNewsCard 
                        item={item}
                    />
                )}
            />
            )}
        </ScrollView>
    )
}

export default TrendNews