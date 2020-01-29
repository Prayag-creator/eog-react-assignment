import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Apollo from './HOC/apollo';
const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Apollo>
        <Router>
          <Wrapper>
            <Header />
            <ToastContainer />
            <Switch>
              <Route exact path="/" component={NowWhat} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Wrapper>
        </Router>
      </Apollo>
    </Provider>
  </MuiThemeProvider>
);

export default App;
