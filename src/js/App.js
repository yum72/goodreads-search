
import React, { Component } from 'react';
import Search from './pages/Search'
import Results from './components/Results'
import SingleBook from './components/singleBook'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/BookStore'

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Search} exact />
            <Route exact path="/results/:search" component={Results} />
            <Route exact path="/books/:id" component={SingleBook} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
