import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign'

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 5px;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: row;
  height: ${props => `${props.height ?? 46}px;`}
  width: 95%;
  border-radius: 10px;
  
  background-color: ${props => `${props.disabled ? '#52a82d' : '#f4511e'};`}
  
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
`;

export const PressableButton = ({ onPress, title, height, width, disabled }) => (
  <ButtonContainer onPress={onPress} height={height} disabled={disabled} width={width}>
    {disabled && (
       <Icon name="check" size={18} style={{marginRight: 3}} color='white' />
    )}
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
