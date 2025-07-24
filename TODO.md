# v0 Bare minimum

- ~~Account creation~~
- ~~Display the list (Basics done)~~
- ~~Handle form errors~~
- ~~Create a list~~
- ~~Add/remove items to the list~~
- ~~[Signals](https://preactjs.com/guide/v10/signals/)~~
- ~~add creation and modification date to shopping list~~

# v1 Nicer things

- useFetch :
  - ~~Refactor useFetch (useFetch & useMutation)~~
  - Find a solution for Delete (useFetch / useMutation)
  - Abort Controller
    - https://www.cluemediator.com/how-to-cancel-a-fetch-request-in-react
    - https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  - ~~use [Request](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#creating_a_request_object)~~
  - useFetch event to refresh when switching back to page
- List:
  - ~~edit~~
  - ~~remove~~
  - list flag (active/inactive)
  - order: 
    - ~~Sby updated at~~
- Items:
  - ~~edit~~
  - ~~remove~~
  - item type
  - quantity of items
- Subscription :
  - Create a link to subscribe
  - Allow subscription
- Auth
  - Handle Login bug and token refresh
  - Log out (clear cache etc)
- Title Tab Hook
- Husky
- Style :
  - Improve display and style
  - TailWind CSS not ugly
  - Proper Loader
  - Website icon

# v2 Improvement and real time communication

- List:
  - Create a list from missing items
- SSE
  - https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app
  - https://github.com/nestjs/nest/issues/12670
- pm2 for monitoring https://pm2.keymetrics.io/

# v3

- SSR
