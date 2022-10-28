import React, { useContext, useEffect, useState } from 'react'
import { View, TouchableOpacity, StyleSheet, SafeAreaView, Text, ScrollView, Image } from 'react-native'
import GlobalContext from '../../contexts/Auth';
import Icon from 'react-native-vector-icons/AntDesign'
import { hourDayMonth } from '../../utils/dates'

const Favorites = ({ navigation }) => {
    const { setFavorite, getFavorites,favs, setFavs } = useContext(GlobalContext)

    async function fetchMyAPI() {
        const favorites = await getFavorites()
  
        console.log(JSON.parse(favorites))
        setFavs(JSON.parse(favorites))
    }

    useEffect(()=>{   
        fetchMyAPI()        
    }, [])

    const favorite = async (event)=>{
        const newFavs = [...favs]
        const found = favs ? favs.find(e => e.id == event.id) : null
  
        if(found){
          const index = newFavs.indexOf(event.id);
          newFavs.splice(index, 1)
        } else {
          newFavs.push(event)
        }

        setFavs(newFavs)
        await setFavorite(event)
    }

    const handleEvent = (event)=>{
        navigation.navigate(event.categoryId == '1' ? 'Evento Empresarial' : 'Evento Universitário', {
          event
        })
      }

    return (
        <SafeAreaView style={{flex: 1, paddingHorizontal: 10, }}>
            
            <ScrollView style={{  padding: 0, height:'100%' }}>
                <Text style={styles.header}>
                    Meus favoritos       
                </Text>
                {favs.map((e)=> {
                    const foundFav = Array.isArray(favs) ? favs.find(fav => fav.id == e.id) : null
                    return(
                        <TouchableOpacity key={e.id}  style={styles.card} onPress={()=>handleEvent(e)}>
                            <View >
                                <Image
                                    style={styles.image}
                                    source={{uri: e.image}}
                                />
                                <TouchableOpacity
                                    style={{
                                        borderWidth:1,
                                        borderColor:'rgba(0,0,0,0.1)',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:35,
                                        height:35,
                                        backgroundColor:'#fff',
                                        borderRadius:50,
                                        position: 'absolute',
                                        right: 0,
                                        bottom: 0,
                                        margin: 5
                                        }}
                                        onPress={()=>favorite(e)}
                                    >
                                    {foundFav ? (
                                        <Icon name={"heart"}  color={'#f4511e'} size={15}/>
                                    ) : (
                                        <Icon name={"hearto"}  size={15}/>
                                    )}
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{width: '100%'}}>
                                <View style={{flex: 1, marginLeft: 10, width: '65%'}}>
                                    <Text style={styles.title}>{e.name}</Text>
                                    <Text numberOfLines={3} style={styles.description}>{e.description}</Text>
                                    <View style={{position: 'absolute', bottom:0}}>
                                        <Text style={styles.subtitle}>{hourDayMonth(e.date).toUpperCase()}</Text>
                                    <Text style={styles.local}>{e.city}, {e.state}</Text>
                                    </View>
                                    
                                </View>
                                
                            </View>
                            
                        </TouchableOpacity>
                    )
                    })}
                
            </ScrollView>
        </SafeAreaView>
        
    )
}

export default Favorites

const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: 120,
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      
      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
      
    },  
    card: {    
        height: 100,
        marginTop: 10,
        
        backgroundColor: '#fff',
        flexDirection: 'row',
        flex: 1,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
  
        shadowColor: 'rgb(0, 0, 0)',
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
    },
    title:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginBottom: -3
    },
    header:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
        marginTop:20
    },
    description:{
        fontFamily: 'Montserrat-Medium',
        fontSize: 11,   
        maxHeight: 40,
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
        fontSize: 14, 
        color: '#f4511e'
        // color: '#ed7300'
    },
    local: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12, 
        color: '#000'
        // color: '#ed7300'
    }
})