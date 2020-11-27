import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import UsuarioController from "../../controllers/usuario/usuario-controller";

const icon = require('../../../assets/contato.png');

export default class ViewLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      isLoading: false,
    };
    this.usuarioController = new UsuarioController();
  }

  abrirTelaCadastroUsuario = () => {
    this.props.navigation.navigate('ViewCadastroUsuario');
  }

  logarUsuario = async () => {
    this.setState({ isLoading: true });
    const data = { email: this.state.email, senha: this.state.senha };
    const usuarioLogado = await this.usuarioController.loginUsuario(data);
    usuarioLogado.statusCode === 200 ? this.abrirTelaListaContatos(usuarioLogado.data.data._id)
    : Alert.alert(':-(', usuarioLogado.mensagem);
    this.setState({ isLoading: false });
  }

  abrirTelaListaContatos = (_id) => {
    this.props.navigation.navigate('ViewListaContatos', { item: _id });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Image style={styles.imagem} resizeMode='contain' source={icon} />
          </View>
          <View style={styles.containerCampos}>
            <TextInput
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                placeholder='Email'
                style={styles.textInput}
                onChangeText={email => this.setState({ email })}
            />
            <TextInput
                secureTextEntry
                placeholder='Senha'
                style={[styles.textInput, { marginTop: 10 }]}
                onChangeText={senha => this.setState({ senha })}
            />
          </View>
          <View style={styles.containerBotao}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => this.logarUsuario()}>
              {this.state.isLoading && <ActivityIndicator color={'#fff'}/>}    
              {!this.state.isLoading && <Text style={styles.textoBotao}>LOGIN</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCadastro}
              onPress={() => this.abrirTelaCadastroUsuario()}>
              <Text style={styles.textoBotaoCadastro}>Não possui cadastro? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
  containerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "green",
  },
  containerCampos: {
    flex: 1,
    // backgroundColor: "yellow",
    padding: 10,
    justifyContent: "center"
  },
  containerBotao: {
    flex: 1,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center"
  },
  botao: {
    height: 45,
    backgroundColor: "#2979ff",
    width: '90%',
    justifyContent: "center",
  },
  botaoCadastro: {
    height: 45,
    // backgroundColor: "#2979ff",
    width: '90%',
    marginTop: 10,
    justifyContent: "center",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  textoBotaoCadastro: {
    color: "#2979ff",
    fontSize: 16,
    textAlign: "center",
  },
  imagem: {
    width: 120,
    height: 120
  },
  textInput: {
    height: 45,
    color: '#000',
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    padding: 5
  }
});
