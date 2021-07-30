import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'

const uri = process.env.NEXT_PUBLIC_APOLLO_ENDPOINT || 'http://localhost:8080/graphql'

const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    link: createUploadLink({ uri })
})

export default client
