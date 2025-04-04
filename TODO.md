# v0 Bare minimum

- Account creation
- ~~Display the list (Basics done)~~
- ~~Handle form errors~~
- ~~Create a list~~
- ~~Add/remove items to the list~~
- ~~[Signals](https://preactjs.com/guide/v10/signals/)~~
- ~~add creation and modification date to shopping list~~

# v1 Nicer things

- useFetch :
  - Refactor useFetch (useFetch & useMutation)
  - Abort Controller
    - https://www.cluemediator.com/how-to-cancel-a-fetch-request-in-react
    - https://developer.mozilla.org/en-US/docs/Web/API/AbortController
  - useFetch event to refresh when switching back to page
- List:
  - edit a list
  - list flag (active/inactive)
- Items:
  - item type
  - quantity of items
- Subscription :
  - Create a link to subscribe
  - Allow subscription
- Log out (clear cache etc)
- Husky
- Style :
  - Improve display and style
  - TailWind CSS not ugly
  - Proper Loader

# v2 Improvement and real time communication

- List:
  - Create a list from missing items
- SSE
    - https://www.digitalocean.com/community/tutorials/nodejs-server-sent-events-build-realtime-app
    - https://github.com/nestjs/nest/issues/12670
- pm2 for monitoring https://pm2.keymetrics.io/

# v3

- SSR
