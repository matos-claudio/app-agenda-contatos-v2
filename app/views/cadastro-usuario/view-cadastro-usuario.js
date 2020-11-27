import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import UsuarioController from "../../controllers/usuario/usuario-controller";
import ComponenteHeader from "../componentes/componente-header";

export default class ViewCadastroUsuario extends Component {
  constructor(props){
    super(props)
    this.state = {
        nome: '',
        email: '',
        senha: '',
        isLoading: false,
    }
    this.usuarioController = new UsuarioController();
  }

  voltarTelaLogin = () => {
    this.props.navigation.goBack();
  }

  cadastrarUsuario = async () => {
    this.setState({ isLoading: true })  
    const data = { nome: this.state.nome, email: this.state.email, senha: this.state.senha };  
    const usuario = await this.usuarioController.novoUsuario(data);
    console.log('usuario '+JSON.stringify(usuario));
    this.setState({ isLoading: false });
    if (usuario.statusCode === 200){
        Alert.alert(':-)', usuario.mensagem);
    } else {
        Alert.alert(':-(', usuario.mensagem);
    }
  }
    
  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <ComponenteHeader navigation={this.props.navigation} />  
        <View style={styles.container}>
          <View style={styles.containerLogo}>
            <Text style={styles.labelCadastro}>Cadastre-se e {'\n'}mantenha sua agenda{'\n'}sempre atualizada</Text>
          </View>
          <View style={styles.containerCampos}>
            <TextInput
                placeholder="Nome"
                onChangeText={nomeUsuario => this.setState({ nome: nomeUsuario })}
                style={styles.textInput} />
            <TextInput
                placeholder="Email"
                onChangeText={email => this.setState({ email })}
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                style={[styles.textInput, { marginTop: 10 }]} />
            <TextInput
              secureTextEntry
              placeholder="Senha"
              style={[styles.textInput, { marginTop: 10 }]}
              onChangeText={senha => this.setState({ senha })}
            />
          </View>
          <View style={styles.containerBotao}>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => this.cadastrarUsuario()}
            >
            {this.state.isLoading && <ActivityIndicator color={'#fff'}/>}
            {!this.state.isLoading && <Text style={styles.textoBotao}>CADASTRAR</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCadastro}
              onPress={() => this.voltarTelaLogin()}
            >
              <Text style={styles.textoBotaoCadastro}>
                Já possuo cadastro? Login</Text>
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
    alignItems: "flex-start",
    // backgroundColor: "green",
  },
  labelCadastro: {
    fontSize: 22,
    color: '#000',
    marginLeft: 10
  },
  containerCampos: {
    flex: 1,
    // backgroundColor: "yellow",
    padding: 10,
    justifyContent: "center",
  },
  containerBotao: {
    flex: 1,
    // backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  botao: {
    height: 45,
    backgroundColor: "#2979ff",
    width: "90%",
    justifyContent: "center",
  },
  botaoCadastro: {
    height: 45,
    // backgroundColor: "#2979ff",
    width: "90%",
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
    height: 120,
  },
  textInput: {
    height: 45,
    color: "#000",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 5,
  },
});
