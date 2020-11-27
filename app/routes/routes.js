import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ViewCadastroUsuario from '../views/cadastro-usuario/view-cadastro-usuario';
import ViewListaContatos from '../views/lista-contatos/view-lista-contatos';
import ViewLogin from '../views/login/view-login';

const routes = createStackNavigator({
    ViewLogin: {
        screen: ViewLogin
    },
    ViewCadastroUsuario: {
        screen: ViewCadastroUsuario
    },
    ViewListaContatos: {
        screen: ViewListaContatos
    },
}, { headerMode: "null" });

const App = createAppContainer(routes);
export default App;