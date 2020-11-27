import ApiServiceUtils from "../../services/api-service.utils"

export default class UsuarioController {
    constructor() {
        this.apiServiceUtils = new ApiServiceUtils()
    }
    novoUsuario = async ({ nome, email, senha }) => {
        const data = {
            nomeUsuario: nome,
            dadosUsuario: {
                emailUsuario: email,
                senhaUsuario: senha
            }
        }
        try {
            const usuario = await this.apiServiceUtils.novoUsuario(data);
            return response = { data: usuario.data, mensagem: usuario.data.mensagem, statusCode: usuario.data.statusCode };
        } catch (error) {
            return response = { data: null, mensagem: error.response.data.mensagem, statusCode: error.response.data.statusCode };
        }
    }

    loginUsuario = async ({ email, senha }) => {
        const data = {
            emailUsuario: email,
            senhaUsuario: senha,
        }
        try {
            const usuarioLogado = await this.apiServiceUtils.loginUsuario(data);
            return response = { data: usuarioLogado.data, mensagem: usuarioLogado.data.mensagem, statusCode: usuarioLogado.data.statusCode };
        } catch (error) {
            return response = { data: null, mensagem: error.response.data.mensagem, statusCode: error.response.data.statusCode };
        }
    }

    listaContatos = async (_id) => {
        try {
            const listaContatos = await this.apiServiceUtils.listaContatos(_id);
            // console.log(`lista ${JSON.stringify(listaContatos)}`)
            return response = { data: listaContatos.data, mensagem: listaContatos.data.mensagem, statusCode: listaContatos.data.statusCode };
        } catch (error) {
            console.log(`lista ${error}`)
            return response = { data: null, mensagem: error.response.data.mensagem, statusCode: error.response.data.statusCode };
        }
    }
}