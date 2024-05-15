import React from 'react';
import './styles/style.css'; 
import Header from './components/Header';
import Fridge from './components/Fridge';
import Recipes from './components/Recipes';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql', 
    cache: new InMemoryCache(),
  });
function App() {
    return (
        <div className="container">
            <Header />
            <div className="row">
                <div className="col-md-6">
                    <Fridge />
                </div>
                <div className="col-md-6">
                    <Recipes />
                </div>
            </div>
        </div>
    );
}

export default App;