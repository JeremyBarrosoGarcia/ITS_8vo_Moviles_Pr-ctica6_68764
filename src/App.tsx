import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme & components */
import './theme/variables.css';
import Pokedex from './components/Pokedex';
import { MenuPokedexProvider } from './contexts/MenuPokedexProvider';
import { PokedexMenu } from './components/Menu/PokedexMenu';
import PokedexPage from './pages/PokedexPage'; // ✅ IMPORTACIÓN CLAVE
import PackPage from './pages/PackPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <MenuPokedexProvider>
          <Pokedex>
            <Route exact path="/home">
              <PokedexMenu />
            </Route>
            <Route exact path="/pokedex">
              <PokedexPage /> {/* ✅ Aquí se muestra la vista funcional */}
            </Route>
            <Route exact path="/pack">
              <>Esta es la bolsa de objetos</> {/* puedes reemplazar luego */}
            </Route>
            <Route exact path="/exit">
              <>Salir</>
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/pack">
            <PackPage /> {/* Cambia el fragmento por este componente */}
            </Route>
          </Pokedex>
        </MenuPokedexProvider>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
