import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/index';
import SearchResult from './pages/SearchResult/index';
import { useStateValue } from './StateContext';

import './styles.css';

function App() {
    const [{ darkMode }] = useStateValue();

    return (
        <div className={`app ${darkMode ? 'dark' : ''}`}>
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
