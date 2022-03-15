import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/index';
import SearchResult from './pages/SearchResult/index';

import './styles.css';

function App() {
  return (
    <div className="app">

      <Router>
        <Switch>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/search">
            <SearchResult />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;