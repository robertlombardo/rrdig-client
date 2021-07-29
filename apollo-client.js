import { ApolloClient, InMemoryCache } from "@apollo/client"

console.log('process.env.NEXT_PUBLIC_APOLLO_ENDPOINT', process.env.NEXT_PUBLIC_APOLLO_ENDPOINT)

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_APOLLO_ENDPOINT || 'http://localhost:8080',
    cache: new InMemoryCache(),
});

export default client
