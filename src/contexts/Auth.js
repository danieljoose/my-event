import React, { useState, createContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {
    const key = "@myevent";

    const [actualEvent, setActualEvent] = useState()


    const login = async () => {
      const user = {
        name: 'Daniel',
        ingresos: 0
      }
      await AsyncStorage.setItem(`${key}/user`, JSON.stringify(user));
    };

    const setFavorite = async (event) => {
      const favorites = await AsyncStorage.getItem(`${key}/favorites`);
      const arrayFav = JSON.parse(favorites)
      
       const found = arrayFav ? arrayFav.find(e => e == event.id) : null

      if(found){
        const index = arrayFav.indexOf(event.id);
        arrayFav.splice(index, 1)

        await AsyncStorage.setItem(`${key}/favorites`, JSON.stringify(arrayFav));
      } else {
        const newFavs = arrayFav ? [...arrayFav] : []
        newFavs.push(event.id)

        await AsyncStorage.setItem(`${key}/favorites`, JSON.stringify(newFavs));
      }      
    }

    const getFavorites = async ()=> {
      return await AsyncStorage.getItem(`${key}/favorites`);
    }

    const setTicket = async (event) => {
      const tickets = await AsyncStorage.getItem(`${key}/tickets`);
      const arrayTickets = JSON.parse(tickets)
      
      const found = arrayTickets ? arrayTickets.find(e => e == event.id) : null

      if(found){
        const index = arrayTickets.indexOf(event.id);
        arrayTickets.splice(index, 1)

        await AsyncStorage.setItem(`${key}/tickets`, JSON.stringify(arrayTickets));
      } else {
        const newTicket = arrayTickets ? [...arrayTickets] : []
        newTicket.push(event.id)

        await AsyncStorage.setItem(`${key}/tickets`, JSON.stringify(newTicket));
      }      
    }

    const getTicket = async (eventId)=> {
      const tickets = await AsyncStorage.getItem(`${key}/tickets`);
      const arrayTickets = JSON.parse(tickets)
      
      const found = arrayTickets ? arrayTickets.find(e => e == eventId) : null

      return found ? true : false
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
                getTicket
            }}>
                {children}
        </GlobalContext.Provider>
    )  
}

export default GlobalContext;
