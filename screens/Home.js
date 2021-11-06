import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ActivityIndicator, Switch, Text, FlatList, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';

import newAPI from '../apis/News';
import Card from '../components/Card';
import TrendNews from '../screens/TrendNews';

import { EventRegister } from 'react-native-event-listeners'
import themeContext from '../config/themeContext';

//API call
const Home = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [news, setNews] = useState([])

  useEffect(() => {
    getNewsFromAPI()
  }, [])

  /* const newsResponse = async() => {
      const response = await newAPI.get('everything?q=tesla&from=2021-07-19&sortBy=publishedAt&apiKey=920deb9f754348c0bec4871fef36d971')
      console.log(response.data)
  } */

  function getNewsFromAPI() {
    newAPI.get('top-headlines?country=us&apiKey=920deb9f754348c0bec4871fef36d971')
      .then(async function (response) {
        setNews(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      })
  }

  if (!news) {
    return null
  }


  //Theme
  const theme = useContext(themeContext);
  const [isEnabled, setIsEnabled] = useState(false);


  //Dates
  var date = new Date().getDate();
  function months() {

    var month = new Date().getMonth() + 1; //To get the Current Month

    if (month == 1) {
      return "January"
    } else if (month == 2) {
      return "February"
    } else if (month == 3) {
      return "March"
    } else if (month == 4) {
      return "April"
    } else if (month == 5) {
      return "May"
    } else if (month == 6) {
      return "June"
    } else if (month == 7) {
      return "July"
    } else if (month == 8) {
      return "August"
    } else if (month == 9) {
      return "September"
    } else if (month == 10) {
      return "October"
    } else if (month == 11) {
      return "November"
    } else if (month == 12) {
      return "December"
    }
  }
  var year = new Date().getFullYear();

  return (
    <View style={{ backgroundColor: theme.backColor }}>
      <StatusBar
        backgroundColor={theme.statusColor}
      />
      <View style={{
        backgroundColor: theme.headerColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 8,
        
        }}
      >
        <Image
          source={require('../assets/img/header-logo.png')}
          style={{ width: 65, height: 65, alignSelf: 'flex-start', paddingLeft: 10, marginLeft: 10 }}
        />
        <Text style={styles.mainText}>The NewsX Times</Text>
      </View>
      <ScrollView>
        <View>
          <TouchableOpacity style={{
            backgroundColor: theme.cardBackground,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            width: 140,
            padding: 10,
            marginTop: 20,
            marginLeft: 20,
            elevation: 3
          }}>
            <Text style={{
              color: theme.textColor,
              fontSize: 17,
              fontWeight: 'bold'
            }}
            >
              📅 {months()} {date}
            </Text>
          </TouchableOpacity>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 10,
            marginLeft: 20,
            color: theme.textColor
          }}
          >Trending News</Text>
          {isLoading ? <ActivityIndicator size="large" color="#DA3349" /> : (
            <TrendNews />
          )}

          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 0.5,
              width: '90%',
              alignSelf: 'center',
              marginTop: 5
            }}
          />
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            marginTop: 10,
            marginLeft: 20,
            color: theme.textColor
          }}
          >Recent News</Text>
          <FlatList
            data={news.articles}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
              <Card
                item={item}
              />
            )}
            style={{ marginBottom: 65 }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 60,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  }
});


export default Home;