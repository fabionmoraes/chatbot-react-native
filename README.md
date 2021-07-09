Card Credit
=============

![alt text](https://i.imgur.com/8TfCjvx.png)

Antes de iniciar a aplicação é necessário instalar e configurar o ambiente. Para isso, veja a seção [**React Native CLI Quickstart**](https://facebook.github.io/react-native/docs/getting-started.html). Siga as instruções de acordo com o sistema operacional usado para desenvolver.

## React Native CLI

Depois de configurar tudo, instale a interface de linha de comando do *React Native*. Execute o seguinte comando no seu terminal:

```bash
npm install -g react-native-cli
```

## Rodando a aplicação no emulador

Primeiro, instale as dependências do projeto executando o comando:

```bash
yarn
```

### iOS

Antes, instale as dependências do projeto iOS no diretório `/ios` executando o comando:

```bash
pod install
```

Com o Xcode instalado, execute o comando na pasta do projeto e o React Native rodará automaticamente no simulador iOS:

```bash
react-native run-ios
```

### Android

Abra o Android Studio, clique em "Configure" > "AVD Manager". Crie um dispositivo virtual, caso não exista, e o inicie. Com o emulador iniciado execute o comando na pasta do projeto:

```bash
react-native run-android
```
