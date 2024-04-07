import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { Login } from './pages/Login';
import { CacheProvider } from './hooks/useCache.js';
import { Header } from './components/Header.jsx';
import { Home } from './pages/Home';
import { NotFound } from './pages/_404.jsx';
import './style.css';

export function App() {
  return (
    <LocationProvider>
      <CacheProvider>
        <Header />
        <main>
          <Router>
            <Route path="/" component={Home} />
            <Route default component={NotFound} />
            <Route path="/login" component={Login} />
          </Router>
        </main>
      </CacheProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app'));
