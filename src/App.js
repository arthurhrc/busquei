import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home/index';
import SearchResult from './pages/SearchResult/index';
import NotFound from './pages/NotFound/index';
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
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
