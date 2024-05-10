import React from 'react';
import '../styles/style.css';

function Header() {
    return (
        <header id="header-display">
            <h1 className="header">What's In The Fridge?</h1>
            <input
                type="text"
                placeholder="Enter ingredient here..."
                className="long-input"
                id="ingredient-input"
            />
            <button className="btn btn-primary">Add Ingredient</button>
        </header>
    );
}

export default Header;