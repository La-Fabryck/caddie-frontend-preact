import { render } from 'preact';
import { LocationProvider, Route, Router } from 'preact-iso';
import { Header, ProtectedRoute } from './components';
import { CacheProvider } from './hooks';
import { CreateAccount, CreateItem, CreateList, EditItem, Home, Login, NotFound, ShoppingList } from './pages';
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
                <ProtectedRoute path="/list/:shoppingListId/items/:itemId/edit" component={EditItem} />
                <Route path="/login" component={Login} />
                <Route path="/create-account" component={CreateAccount} />
                <Route default component={NotFound} />
              </Router>
            </div>
          </div>
        </main>
      </CacheProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById('app')!);
