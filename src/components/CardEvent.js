import React, { useContext, useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native'
import { hourDayMonth } from '../utils/dates'

const CardEvent = ({ event }) => {

    return (
        <View style={{alignItems: 'center', width: '100%', marginTop: 10}}>
                 <Image
                style={styles.image}
                source={{uri: event.image}}
              />
            
              <View style={styles.card}>
                <Text style={styles.title}>
                    {event.name}                    
                </Text>
                <Text style={styles.description}>
                    {event.description}                    
                </Text>

                <View style={{marginTop: '10%'}}>
                    <Text style={styles.subtitle}>
                        LOCAL
                    </Text>
                    <Text style={styles.info}>
                        {event.city}, {event.state}                    
                    </Text>
                </View>

                <View style={{ marginTop: '10%'}}>
                     <Text style={styles.subtitle}>
                        DATA
                    </Text>
                    <Text style={styles.info}>
                        {hourDayMonth(event.date)}                    
                    </Text>
                </View>

                <View style={{marginTop: '10%'}}>
                    <Text style={styles.subtitle}>
                        VALOR
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
                        <Text style={styles.price}>
                            R$ {event.price}                 
                        </Text>

                        <Text style={styles.info}>
                           ,00                
                        </Text>
                    </View>                    
                </View>                    
              </View>       
        </View>
    )
}

export default CardEvent

const styles = StyleSheet.create({
    image: {
      height: "25%",
      width: '95%',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
      
      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 2,
      
    },  
    card: {    
        width: '95%',
        padding: 20,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
  
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
    },
    title:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 22
    },
    description:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,        
    },
    info: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,        
    },
    price: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,        
    },
    subtitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 11, 
        color: '#f4511e'
        // color: '#ed7300'
    }
})