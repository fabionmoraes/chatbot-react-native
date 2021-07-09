import React, {useState, useRef, useEffect} from 'react';

import {
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Keyboard,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import json from '../../services/chats.json';

import {
  Message,
  Text,
  TextContainer,
  FormMessage,
  ContainerInput,
  Input,
  Button,
  InputContainer,
  Avatar,
  ButtonMessage,
} from './styles';

type IData = {
  step: string;
  message: any;
  text: any;
  permission: any;
  question: any;
  reverse: boolean;
  save: any;
  go: any;
  menu: any[];
};

type IGoClick = {
  text: string;
  goClick: string;
};

interface Iposts {
  message: any;
  reverse: boolean;
  menu: any[];
}

interface IUser {
  name: string;
  phone: string;
}

const Home: React.FC = () => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [step, setStep] = useState('');
  const [page, setPage] = useState('');
  const [posts, setPosts] = useState<Iposts[]>([] as Iposts[]);
  const [messagePost, setMessagePost] = useState('');
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<any>(null);

  const width = Dimensions.get('window').width;

  const jsondata: IData[] = json.data;

  function animatedOn() {
    Animated.timing(fadeAnim, {
      useNativeDriver: false,
      toValue: 1,
      duration: 600,
    }).start();
  }

  function start() {
    animatedOn();

    const message = json.start;
    const reverse = false;
    const menu: any = [];

    const setDados = {message, reverse, menu};

    const object = {setDados};

    const convert: any = Object.values(object);

    setLoading(false);
    setPosts(convert);
  }

  function chatbot(data: Iposts) {
    const chats = page
      ? jsondata.find(item => item.step === page)
      : jsondata.find(item => item.step === step);

    if (chats?.permission) {
      const number = isNaN(data.message);

      if (chats.permission?.type === 'number' && number) {
        const message = chats.permission.error;
        const reverse = chats.reverse;
        const menu = chats.menu;

        const setDados = {message, reverse, menu};

        setPosts((state: any[]) => [...state, setDados]);
        setLoading(false);

        return;
      }
    }

    if (chats?.save) {
      const userData = {
        name: chats.save === 'name' ? chats.message : user.name,
        phone: chats.save === 'phone' ? chats.message : user.phone,
      };
      setUser(userData);
    }

    if (chats?.message && chats.text !== 'all') {
      const message = chats.text
        ? `${chats.message} ${data.message}.`
        : chats.message;
      const reverse = chats.reverse;
      const menu = chats.menu;

      const setData = {message, reverse, menu};

      const convert = page ? setData : {...data, ...setData};

      setPosts((state: any) => [...state, convert]);

      setLoading(false);
    }

    if (page) {
      setPage('');
    }

    if (chats?.question) {
      setStep(chats.question);
    }

    if (chats?.go) {
      setPage(chats.go);
    }

    animatedOn();
    setLoading(false);
  }

  const sendBtn = (reverse: boolean) => {
    Keyboard.dismiss();
    const message = messagePost;
    const menu: any[] = [];

    const setData = {message, reverse, menu};

    setPosts((state: any) => [...state, setData]);

    setLoading(true);
    setMessagePost('');
    setTimeout(() => {
      chatbot(setData);
    }, json.time);
  };

  const btnClick = (data: IGoClick) => {
    const message = data.text;
    const reverse = true;
    const menu: any = [];

    const setDados = {message, reverse, menu};
    const object = {setDados};
    const convert: any = Object.values(object); // Transforma objeto em array

    const messegeAlls = posts.concat(convert);

    setPosts(messegeAlls);

    setLoading(true);
    setTimeout(() => {
      setPage(data.goClick);
    }, json.time);
  };

  useEffect(() => {
    setStep('welcome');
    setTimeout(start, json.time);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (page) {
      setLoading(true);
      setTimeout(chatbot, json.time);
    }
  }, [page]); // eslint-disable-line

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/bg.jpg')}
        style={styles.image}>
        <View style={styles.scroll}>
          <ScrollView
            style={{flex: 1, marginBottom: 48}}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({animated: true})
            }>
            {posts.map((item, index) => {
              const avatar = item.reverse
                ? require('../../assets/semavatar.png')
                : require('../../assets/fabiomoraes.jpg');
              return (
                <Animated.View key={index} style={{opacity: fadeAnim}}>
                  <Message reverse={item.reverse}>
                    <Avatar source={avatar} reverse={item.reverse} />
                    <View style={{width: width - 85}}>
                      <TextContainer reverse={item.reverse} color={json.header}>
                        <Text>{item.message}</Text>
                      </TextContainer>

                      {item.menu.length > 0 && (
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          style={{flexDirection: 'row', paddingTop: 6}}>
                          {item.menu.map((menu, index) => (
                            <ButtonMessage
                              key={index}
                              style={{borderRadius: 8}}
                              color={menu.color}
                              onPress={() =>
                                btnClick({
                                  text: menu.title,
                                  goClick: menu.goClick,
                                })
                              }>
                              <Text>{menu.title}</Text>
                            </ButtonMessage>
                          ))}
                        </ScrollView>
                      )}
                    </View>
                  </Message>
                </Animated.View>
              );
            })}

            {loading && <ActivityIndicator size="small" color="#4d4d4d" />}
          </ScrollView>
        </View>
      </ImageBackground>

      <FormMessage>
        <ContainerInput>
          <InputContainer style={{borderRadius: 10}}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite aqui a mensagem..."
              onChangeText={text => setMessagePost(text)}
              value={messagePost}
              onSubmitEditing={() => sendBtn(true)}
            />
          </InputContainer>
          <Button style={{borderRadius: 23}} onPress={() => sendBtn(true)}>
            <Icon name="send" size={22} color="#fff" />
          </Button>
        </ContainerInput>
      </FormMessage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    flexDirection: 'column',
    backgroundColor: '#eee',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  scroll: {
    paddingTop: 12,
    paddingBottom: 12,
    flex: 1,
  },
});

export default Home;
