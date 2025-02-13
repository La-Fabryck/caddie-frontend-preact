import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { Header, ProtectedRoute } from './components';
import { CacheProvider } from './hooks';
import { CreateItem, CreateList, Home, Login, NotFound, ShoppingList } from './pages';
import './index.css';

export function App() {
  return (
    <LocationProvider>
      <CacheProvider>
        <Header />
        <main>
          <div className="py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Router>
                <ProtectedRoute path="/" component={Home} />
                <ProtectedRoute path="/list/create" component={CreateList} />
                <ProtectedRoute path="/list/:shoppingListId" component={ShoppingList} />
                <ProtectedRoute path="/list/:shoppingListId/items/add" component={CreateItem} />
                <Route default component={NotFound} />
                <Route path="/login" component={Login} />
              </Router>
            </div>
          </div>
        </main>
      </CacheProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app')!);
