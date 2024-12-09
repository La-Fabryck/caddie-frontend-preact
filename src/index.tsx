import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { Header, ProtectedRoute } from './components';
import { CacheProvider } from './hooks';
import { Home, Login, NotFound, ShoppingList } from './pages';
import './index.css';

export function App() {
  return (
    <LocationProvider>
      <CacheProvider>
        <Header />
        <main>
          <Router>
            <ProtectedRoute path="/" component={Home} />
            <ProtectedRoute path="/list/:shoppingListId" component={ShoppingList} />
            <Route default component={NotFound} />
            <Route path="/login" component={Login} />
          </Router>
        </main>
      </CacheProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app') as HTMLElement);
