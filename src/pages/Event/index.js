import React, { useContext, useEffect, useState } from 'react'
import { View, TextInput, StyleSheet, ScrollView, Text, Image } from 'react-native'
import CardEvent from '../../components/CardEvent'
import {PressableButton} from '../../components/Button'
import GlobalContext from '../../contexts/Auth';

const Event = ({ route, navigation }) => {
    const { event } = route.params;
    const { setFavorite, getFavorites, setTicket, getTicket } = useContext(GlobalContext)
    const [isBought, setIsBought] = useState(false)

    useEffect(()=>{
        async function haveTicket() {
            const haveTicket = await getTicket(event.id)
            console.log(haveTicket, event.id)

            setIsBought(haveTicket)
        }

        haveTicket()

    }, [])

    const buyTicket = async () =>{
        console.log(event.id)
        await setTicket(event)
        setIsBought(true)
    }


    return (
        <View style={{ flex: 1, width: "100%", alignItems: 'center'}}>
             <CardEvent event={event}/>  
             {isBought ? (
                <PressableButton disabled={true} title='Ingresso Comprado'/> 
             ):(
                <PressableButton onPress={() => buyTicket()}  disabled={false} title='Comprar ingresso'/> 
             )}
                     
        </View>
    )
}

export default Event

const styles = StyleSheet.create({

})