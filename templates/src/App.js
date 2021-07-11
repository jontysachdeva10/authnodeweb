import './App.css';
import setAuthToken from './components/setAuthToken';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Fragment } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { loadUserAction } from "./actions/auth";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  
   // [] are added to run the useEffect only once, otherwise it will a conitnous loop
   useEffect(() => {
    store.dispatch(loadUserAction);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/home" component={Dashboard} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
