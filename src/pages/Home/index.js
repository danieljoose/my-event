import React, { useContext, useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import { ListItem, SearchBar } from "react-native-elements";
import GlobalContext from '../../contexts/Auth';
import { weekHour, month } from '../../utils/dates';
import MyCarousel from '../../components/MyCarousel';

const Home = ({ navigation }) => {
    const { setFavorite, getFavorites, allEvents, favs, setFavs, setTickets, getTickets} = useContext(GlobalContext)
    const [search, setSeach] = useState({data: [], searchValue: ""})
    const [events, setEvents] = useState([])
    const [sortAsc, setSortAsc] = useState(true)
  
    const handleSort = () => {   
      setSeach({...search, data: [...search.data].sort((a, b)=> sortAsc ? a.date > b.date ? -1 : 1 : a.date < b.date ? -1 : 1)})
      setSortAsc(sortAsc ? false : true)
    }

    async function fetchMyAPI() {
      const data = await allEvents()
      const favorites = await getFavorites()
      const tickets = await getTickets()


      setEvents(data)
      setTickets(JSON.parse(tickets) || [])
      setFavs(JSON.parse(favorites) || [])
      setSeach({data: data, searchValue: ""})
    }

    const favorite = async (event)=>{      
      await setFavorite(event)
    }

    const handleEvent = (event)=>{
      navigation.navigate(event.categoryId == '1' ? 'Evento Empresarial' : 'Evento Universitário', {
        event
      })
    }

    useEffect(()=>{   
        fetchMyAPI()        
    }, [])
        
    const Item = ({ item }) => {
      const foundFav = Array.isArray(favs) ? favs.find(e => e.id == item.id) : null
        return (
          <TouchableOpacity style={styles.item} onPress={()=> handleEvent(item)}>
            <View style={{flex: 1}}>
              <Image
                style={styles.image}
                source={{uri: item.image}}
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
                    onPress={()=>favorite(item)}
                >
                  {foundFav ? (
                    <Icon name={"heart"}  color={'#f4511e'} size={15}/>
                  ) : (
                    <Icon name={"hearto"}  size={15}/>
                  )}
                </TouchableOpacity>
              
            </View>
             <View style={{ flex: 1, flexDirection: 'row', height: 65, padding: 4 }}>
              <View style={styles.date}>
                <Text style={{fontFamily: 'Montserrat-Bold', color:'#f4511e', fontSize: 18}}>{new Date(item.date).getDate()}</Text>
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12}}>{month(item.date).toUpperCase()}</Text>
                <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 10}}>{new Date(item.date).getFullYear()}</Text>
              </View>

              <View style={styles.informations}>
                <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 12, marginBottom: 3}}>{item.name}</Text>
                <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 10}}>{weekHour(item.date)}</Text>
                <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 11}}>{item.city}, {item.state}</Text>
              </View>
              
            </View>
          </TouchableOpacity>
           
        );
    };
    
    const renderItem = ({ item }) => <Item item={item} />;

    const searchFunction = (text) => {
        const updatedData = events.filter((item) => {
          const item_data = `${item.name.toUpperCase()})`;
          const text_data = text.toUpperCase();
          return item_data.indexOf(text_data) > -1;
        });
        setSeach({ data: updatedData, searchValue: text });
      };

    return (
        <View style={{ flex: 1, alignItems: 'center'}}>

          <SearchBar
            placeholder="Pesquisar eventos"
            inputStyle={{backgroundColor: 'white'}}
            containerStyle={styles.searchBar}
            inputContainerStyle={{backgroundColor: 'white'}}
            placeholderTextColor={'#g5g5g5'}
            lightTheme
            round
            value={search.searchValue}
            onChangeText={(text) => searchFunction(text)}
            autoCorrect={false}
          />
          <View style={styles.containerHeader}>
            <Text style={styles.header}>
                    Destaques       
                </Text>
          </View>
          
          <MyCarousel entries={events} onPress={handleEvent}/>
          <View style={styles.containerHeader}>
            <Text style={styles.header}>
                    Próximos Eventos       
                </Text>
          </View>
          <View style={styles.container}>
            <FlatList
              columnWrapperStyle={{justifyContent: 'space-between'}}
              data={search.data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
            />
          </View>
      
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
    },
    item: {
      maxWidth: '47%',     
      flex:0.5,
      backgroundColor: '#fff',
      marginBottom: 10,
      borderRadius: 4,

      shadowColor: 'rgb(0, 0, 0)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 5,
    },
    image: {
      height: 80,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    date: {
      flex: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    informations: {
      flex: 7,
      justifyContent: 'center',
    },
    searchBar: {
      backgroundColor: 'white', 
      borderRadius: 5, 
      width: '95%', 
      justifyContent: 'center',
    },
    header:{
      fontFamily: 'Montserrat-Bold',
      fontSize: 22,
      marginTop:20
    },
    containerHeader: {alignItems: 'flex-start', alignItems: 'flex-start', width: '100%', paddingHorizontal: 10}
  });