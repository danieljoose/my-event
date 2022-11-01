import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const key = "@myevent";

    const [actualEvent, setActualEvent] = useState()
    const [favs, setFavs] = useState([])
    const [tickets, setTickets] = useState([])


    const login = async () => {
      const user = {
        name: 'Daniel',
        ingresos: 0
      }
      await AsyncStorage.setItem(`${key}/user`, JSON.stringify(user));
    };

    const setFavorite = async (event) => {  
      const found = favs ? favs?.find(e => e.id == event.id) : null

      if(found){
        setFavs([...favs].filter(e => e.id !== event.id))
        await AsyncStorage.setItem(`${key}/favorites`, JSON.stringify([...favs].filter(e => e.id !== event.id)));
      } else {
        setFavs([...favs, event])
        await AsyncStorage.setItem(`${key}/favorites`, JSON.stringify([...favs, event]));
      }      
    }

    const getFavorites = async ()=> {
      // await AsyncStorage.setItem(`${key}/favorites`, JSON.stringify(null))
      // await AsyncStorage.setItem(`${key}/tickets`, JSON.stringify(null))
      return await AsyncStorage.getItem(`${key}/favorites`);
    }

    const getTickets = async ()=> {
      // await AsyncStorage.setItem(`${key}/favorites`, JSON.stringify(null))
      // await AsyncStorage.setItem(`${key}/tickets`, JSON.stringify(null))
      return await AsyncStorage.getItem(`${key}/tickets`);
    }

    const setTicket = async (event) => {
      const found = tickets ? tickets?.find(e => e.id == event.id) : null

      if(found){
        setTickets([...tickets].filter(e => e.id !== event.id))
        await AsyncStorage.setItem(`${key}/tickets`, JSON.stringify([...tickets].filter(e => e.id !== event.id)));
      } else {
        setTickets([...tickets, event])
        await AsyncStorage.setItem(`${key}/tickets`, JSON.stringify([...tickets, event]));
      }   
    }

    const getTicket = async (eventId)=> {
      // console.log(eventId)
      // const tickets = await AsyncStorage.getItem(`${key}/tickets`);
      // const arrayTickets = JSON.parse(tickets)
      // console.log(arrayTickets)
      console.log(eventId, tickets)
      const found = tickets ? tickets.find(e => e.id == eventId) : null

      return found 
    }

    const getUser = async () => {
      return await AsyncStorage.getItem(`${key}/user`)
    }

    const allEvents = async () => {
      const data1 = await fetch('https://6358ceb6c26aac906f48a22e.mockapi.io/myevents/categories/1/events?sortBy=date&order=asc')
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err));

      const data2 = await fetch('https://6358ceb6c26aac906f48a22e.mockapi.io/myevents/categories/2/events?sortBy=date&order=asc')
      .then(response => response.json())
      .then(response => response)
      .catch(err => console.error(err))

      return [...data1, ...data2]
    }    
    // const isLogged = async () => {
    //   return Boolean(await AsyncStorage.getItem(`${key}/token`));
    // }
    
    
    // const logout = async () => {
    //   await AsyncStorage.removeItem(`${key}/token`);
    //   await AsyncStorage.removeItem(`${key}/id`);
    //   setUser({
    //     auth: false,
    //     id: null,
    //     email: null,
    //     nome: null
    //   })
    //   return true
    // };
    
    // const getToken = async () => {
    //   const token = await AsyncStorage.getItem(`${key}/token`)
    //   return token;
    // };
    
    // const getId = async () => {
    //   return await AsyncStorage.getItem(`${key}/id`);
    // };
    
    // const getEmail = async () => {
    //   const token = AsyncStorage.getItem(`${key}/token`);
    //   const { email } = jwt_decode(token);
    //   return email;
    // };
    
    return (
        <GlobalContext.Provider
            value={{
                login,
                getUser,
                allEvents,
                setFavorite,
                getFavorites,
                setActualEvent,
                setTicket,
                getTicket,
                favs,
                setFavs,
                getTickets,
                setTickets,
                tickets
            }}>
                {children}
        </GlobalContext.Provider>
    )  
}

export default GlobalContext;
