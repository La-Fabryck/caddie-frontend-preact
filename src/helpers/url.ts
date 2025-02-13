/**
 * Build an URL that prefixes the api route
 *
 * @param route the api route you want to call minus "/api"
 * @returns URL
 */
export function buildApiURL(route: string) {
  return new URL(`${import.meta.env['VITE_API_BASE_URL']}${route}`, window.location.origin);
}
