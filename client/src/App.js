import React from "react";
import Books from "./components/books";
import Addbook from "./components/addbook";

import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
})

function App() {
  return (
    <ApolloProvider client={client} >
    <div id="main" className="App">
      <h1>Reading List</h1>
      <Books />
      <Addbook />
    </div>
    </ApolloProvider>
  );
}

export default App;
