import { effect, useSignal } from '@preact/signals';
import { type JSX } from 'preact';
import { Route, type RouteProps, useLocation } from 'preact-iso';

function isAuthenticated(): boolean {
  return window.localStorage.getItem('isAuthenticated') === '1';
}

export function ProtectedRoute(props: RouteProps<unknown>): JSX.Element {
  const isAuth = useSignal(isAuthenticated());
  const location = useLocation();

  effect(() => {
    if (!isAuth.value) {
      location.route('/login', true);
    }
  });

  return <Route {...props} />;
}
