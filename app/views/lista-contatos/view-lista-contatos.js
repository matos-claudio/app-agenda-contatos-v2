import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import UsuarioController from "../../controllers/usuario/usuario-controller";

const semFoto = require("../../../assets/user.png");

export default class ViewListaContatos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listaContatos: [{ item: 1 }],
      isLoading: true,
      statusCode: null,
    };
    this._id = this.props.navigation.getParam('item');
    this.usuarioController = new UsuarioController();
  }

  componentDidMount = () => {
    this.listarContatos();
  };

  listarContatos = async () => {
    const listaContatos = await this.usuarioController.listaContatos(this._id);
    if (listaContatos.statusCode === 200) {
      this.setState({
        listaContatos: listaContatos.data.data,
        isLoading: false,
        statusCode: listaContatos.statusCode,
      });
    } else {
      Alert.alert("Nenhum contato encontrado");
    }
    console.log("contatos " + JSON.stringify(listaContatos.statusCode));
  };

  renderActivity = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={"#2979ff"} />
    </View>
  );

  renderSeparetor = () => (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.viewTitulo}>
            <Text style={styles.titulo}>Lista de contatos</Text>
          </View>
          <View style={styles.viewLista}>
            {this.state.isLoading && this.renderActivity()}
            {!this.state.isLoading && this.state.statusCode === 200 && (
              <FlatList
                data={this.state.listaContatos}
                renderItem={({ item, index }) => (
                  <View style={styles.viewItem} key={index}>
                    <View style={styles.viewImagem}>
                      <Image style={styles.imagem} source={semFoto} resizeMode={"contain"} />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                      <Text>{item.nomeContato}</Text>
                      <Text>{item.emailContato}</Text>
                      <Text>{item.telefoneContato}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={this.renderSeparetor}
              />
            )}
          </View>
        </View>
        <View style={styles.rodape}>
          <TouchableOpacity style={styles.floatingButton}>
            <Text style={styles.icon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    //backgroundColor: "red",
  },
  viewTitulo: {
    flex: 0.5,
    justifyContent: "center",
    // backgroundColor: 'red'
  },
  titulo: {
    marginLeft: 10,
    fontSize: 22,
    fontWeight: "bold",
  },
  viewLista: {
    flex: 2,
  },
  viewImagem: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  rodape: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
  },
  floatingButton: {
    backgroundColor: "#2979ff",
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  viewItem: {
    padding: 5,
    flexDirection: "row",
  },
});
