import React from "react";
import {  BrowserRouter as Router,  Switch,  Route,  Redirect} from "react-router-dom";
import { Header } from './components/ui/Header';
import { Vistadirector } from './components/director/Vistadirector'
import { Vistagenero } from './components/genero/Vistagenero'
import { Vistamedia } from './components/media/Vistamedia'
import { Vistaproductora } from './components/productora/Vistaproductora'
import { Vistatipo } from './components/tipo/Vistatipo'


function App() {
  return  <Router>
     <Header/>

    <Switch>
      <Route exact path='/' component={Vistamedia} />
      <Route exact path='/director' component={Vistadirector}/>
      <Route exact path='/genero' component={Vistagenero}/>
      <Route exact path='/productora' component={Vistaproductora}/>
      <Route exact path='/tipo' component={Vistatipo}/>
      <Redirect to='/'/>
    </Switch>
 
</Router>
   
}

export default App;
