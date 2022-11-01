import React, { useContext, useEffect, useState } from 'react'
import { View, Modal, StyleSheet, TextInput, Text, Pressable } from 'react-native'
import CardEvent from '../../components/CardEvent'
import {PressableButton} from '../../components/Button'
import GlobalContext from '../../contexts/Auth';
import { dateFormat } from '../../utils/dates'

const Event = ({ route, navigation }) => {
    const { event } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [number, setNumber] = React.useState(null);
    const { setFavorite, getFavorites, setTicket, getTicket } = useContext(GlobalContext)
    const [isBought, setIsBought] = useState(false)

    useEffect(()=>{
        async function haveTicket() {
            const haveTicket = await getTicket(event.id)
            setIsBought(haveTicket)
        }
        haveTicket()
    }, [])

    const buyTicket = async () =>{
        const eventBuy = {...event, dateBuy: new Date(), numberTickets: number}
        await setTicket(eventBuy)
        setIsBought(eventBuy)
        setModalVisible(false)
    }

    const renderModal = () =>{
        return (
            <View style={styles.centeredView}>
              <Modal
                animationType="none"
                visible={modalVisible}
                transparent
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.modalBackground}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Realizar Compra</Text>
                    <Text style={styles.description}>Informe quantos ingressos para o evento {event.name} você gostaria de adquirir</Text>

                    <View style={{ alignItems: 'flex-start', width: '100%', marginVertical:10}}>
                        <Text style={styles.subtitle}>
                            QUANTIDADE DE INGRESSOS
                        </Text>
                    
                   
                        <TextInput
                            style={styles.input}
                            onChangeText={(value) => setNumber(value.replace(/[^0-9]/g, ''))}
                            value={number}
                            maxLength={3}
                            placeholder="Digite um número"
                        />


                        <Text style={styles.total}>
                            TOTAL
                        </Text>
                        <Text style={[styles.description, {fontSize: 14, marginBottom: -5}]}>
                            {number || 0} x R$ {event.price},00
                        </Text>
                        <Text style={[styles.modalText]}>
                            R$ {number * event.price},00
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20,width: '100%'}}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                        <Text style={styles.textStyle}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            disabled={!number}
                            style={[styles.button, styles.buttonBuy]}
                            onPress={() => buyTicket()}
                        >
                        <Text style={styles.textStyle}>Finalizar</Text>
                        </Pressable>
                    </View>
                    
                  </View>
                </View>
              </Modal>
            </View>
          );
    }


    return (
        <View style={{ flex: 1, width: "100%", alignItems: 'center'}}>
             <CardEvent event={event}/>  
             {isBought ? (
                <>
                    <View style={{alignItems: 'center', width: '100%', marginTop: 10}}>
                        <Text>Ingressos: {isBought.numberTickets}x R$ {isBought.price},00</Text>
                        <Text>Adquirido {dateFormat(isBought.dateBuy).toLocaleLowerCase()}</Text>                  
                        
                    </View>
                    <PressableButton disabled={true} title='Ingresso Comprado'/> 
                </>
                
             ):(
                <PressableButton onPress={() => setModalVisible(true)} disabled={false} title='Comprar ingresso'/> 
             )}
             {renderModal()}
                     
        </View>
    )
}

export default Event

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalBackground:{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius:10,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "gray",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,  
      },
      description: {
        marginBottom: 15,
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,  
      },
      input: {
        height: 40,
        width: '100%',
        marginTop: 5,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5
      },
      subtitle:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 11, 
        color: '#f4511e',      
      },
      buttonBuy: {
        backgroundColor: "#f4511e",        
      },
      total:{
        fontFamily: 'Montserrat-Bold',
        marginTop: 20,
        fontSize: 14, 
        color: '#f4511e',      
      },
      
})