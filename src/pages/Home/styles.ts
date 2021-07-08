import styled from '@emotion/native';
import {RectButton} from 'react-native-gesture-handler';

interface IMessageProps {
  reverse: boolean;
  color?: string;
}

export const Message = styled.View<IMessageProps>`
  flex-direction: ${props => (props.reverse ? 'row-reverse' : 'row')};
  padding: 6px 14px;
  width: 100%;
`;

export const TextContainer = styled.Text<IMessageProps>`
  border-radius: 8px;
  flex-direction: column;
  background: ${props => (props.reverse ? '#0086b3' : props.color)};
  color: #fff;
  border-bottom-left-radius: ${props => (props.reverse ? '7px' : '16px')};
  border-bottom-right-radius: ${props => (props.reverse ? '16px' : '7px')};
  padding: 12px;
  position: relative;
  flex-wrap: nowrap;
  align-self: ${props => (props.reverse ? 'flex-end' : 'flex-start')};
`;

export const Text = styled.Text`
  color: #fff;
`;

export const FormMessage = styled.View`
  background: #fff;
  position: absolute;
  bottom: 0;
  height: 56px;
  width: 100%;
`;

export const Avatar = styled.Image<IMessageProps>`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  margin-right: ${props => (props.reverse ? '0px' : '8px')};
  margin-left: ${props => (props.reverse ? '8px' : '0px')};
`;

export const ContainerInput = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputContainer = styled.View`
  background: #eee;
  height: 36px;
  flex: 1;
  margin-top: 10px;
  margin-left: 10px;
  padding-left: 6px;
  padding-right: 6px;
`;

export const Input = styled.TextInput``;

export const Button = styled(RectButton)`
  background: #00b300;
  width: 46px;
  height: 46px;
  margin-top: 5px;
  margin-left: 12px;
  margin-right: 6px;
  align-items: center;
  justify-content: center;
`;
