import logo from './logo.svg';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

//components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: "http://192.168.0.108:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1>My Book List</h1>
     <BookList/>
     <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
