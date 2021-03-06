# Rob's Razzle Dazzle Image Gallery (web client)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Pulling the code

```bash
git clone https://github.com/robertlombardo/rrdig-client
cd rrdig-client
```

### Running the Dev Server

##### .env file
By default the client points to an Apollo server at `http://localhost:8080/graphql`, but you can point it somewhere else by adding an .env file:

```bash
# .env
NEXT_PUBLIC_APOLLO_ENDPOINT=https://my-api-deployment/graphql
```


([NodeJS](https://nodejs.org/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) are required for installing dependencies & starting the NextJS server...)

```bash
npm install
npm run dev
```
##### To use the app, open [http://localhost:3000](http://localhost:3000) with your web browser.
_... and prepare to be dazzled ..._
***

### Public Test Deployment
##### Visit [https://rrdig-client-mvlfu.ondigitalocean.app/](https://rrdig-client-mvlfu.ondigitalocean.app/)

_Thanks for checking out Rob's Razzle Dazzle Image Gallery! I hope you enjoy it as much as I've enjoyed working on it :)
-- Rob_
***

#### TODO (@robertlombardo)
- ~~prototype UI with no data~~
- ~~prototype search action & image grid with mock data in client~~
- ~~prototype API with mock local data~~
- ~~Search for images by name using an input box and the API~~
- ~~Upload images and store them (Digital Ocean Spaces) using an API~~
- ~~You should only allow images to be uploaded.~~
- ~~List all uploaded images~~
- search by multiple tags at once
- support mobile layout!
- ~~deploy to public cloud~~
- dockerize deployment(s)
- BUG: carousel image wrapper should shrink to fit (bottom can stretch to non-focused img)
- unit tests
- lazy load images (placeholders?)
- fuzzy / type-ahead search?
- pagination?
