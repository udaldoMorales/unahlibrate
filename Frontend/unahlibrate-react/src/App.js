import "./App.css";
import Routes from "./components/routes"
import Navbar from "./components/pages/Home/Navbar";
import { Login } from "./components/pages";
import { Registro } from "./components/pages";
import Home from "./components/pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/registro' component={Registro} />
    </Switch>
  </Router>
  );
}

export default App;
