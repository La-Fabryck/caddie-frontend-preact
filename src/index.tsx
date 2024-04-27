import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { CacheProvider } from './hooks';
import { Header, ProtectedRoute } from './components';
import { Login } from './pages/Login';
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
            <ProtectedRoute path="/" component={Home} />
            <Route default component={NotFound} />
            <Route path="/login" component={Login} />
          </Router>
        </main>
      </CacheProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app'));
