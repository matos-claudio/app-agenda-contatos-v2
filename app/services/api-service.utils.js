import { URL_BASE_SERVIDOR, URL_LISTA_CONTATOS, URL_LOGIN_USUARIO, URL_NOVO_USUARIO } from "../utils/constantes";
import AxiosConfigService from "./axios-config-service";

export default class ApiServiceUtils extends AxiosConfigService {
    novoUsuario = (data) => {
        const url = URL_BASE_SERVIDOR + URL_NOVO_USUARIO;
        return this.postRequest(data, url)
    }
    loginUsuario = (data) => {
        const url = URL_BASE_SERVIDOR + URL_LOGIN_USUARIO;
        return this.postRequest(data, url)
    }
    listaContatos = (_id) => {
        const url = `${URL_BASE_SERVIDOR + URL_LISTA_CONTATOS}/${_id}`;
        return this.getRequest(url)
    }
}