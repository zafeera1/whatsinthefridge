import React from 'react';
import './styles/style.css'; 
import Header from './components/Header';
import Fridge from './components/Fridge';
import Recipes from './components/Recipes';

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