import { type JSX, useState } from 'preact/compat';
import { Route } from 'preact-iso';
import { Login } from '@/pages/Login';

function isAuthenticated(): boolean {
  return window.localStorage.getItem('isAuthenticated') === '1';
}

export function ProtectedRoute(props): JSX.Element {
  const [isAuth, setIsAuth] = useState(isAuthenticated());

  function onSuccessCallback(): void {
    window.localStorage.setItem('isAuthenticated', '1');
    setIsAuth(true);
  }

  if (!isAuth) {
    return <Login onSuccessCallback={onSuccessCallback} />;
  }

  return <Route {...props} />;
}
