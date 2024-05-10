import React, { useState, useEffect } from 'react';
import '../styles/style.css';

function Fridge() {
    const [inputValue, setInputValue] = useState('');
    const [fridgeItems, setFridgeItems] = useState([]);
    
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('fridgeItems'));
        if (savedItems) {
            setFridgeItems(savedItems);
        }
    }, []);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const handleAddToFridge = () => {
        if (inputValue.trim() !== '') {
            const newItem = inputValue.trim();
            setFridgeItems([...fridgeItems, newItem]);
            setInputValue('');
            localStorage.setItem('fridgeItems', JSON.stringify([...fridgeItems, newItem]));
        }
    }
    return (
        <div>
            <h2 className="header">FRIDGE</h2>
            <div>
                <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder='Enter Ingredients'
            />
            <button onClick={handleAddToFridge}>Add to Fridge</button>
            <div id="fridge" className="ingredient-box">
                {fridgeItems.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </div>
        </div>
        </div>
    );
}

export default Fridge;