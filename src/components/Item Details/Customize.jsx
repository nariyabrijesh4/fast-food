import React, { useState } from 'react'

function Customize({ selectedItem, setSelectedItem, setCustomize }) {

    const [selectedItems, setSelectedItems] = useState([])
    const [veggie, setVeggie] = useState(true);
    const [meat, setMeat] = useState(false);
    const [cheese, setCheese] = useState(false);
    const [sauce, setSauce] = useState(false);



    const handleCheckboxChange = (item) => {
        const selectedIndex = selectedItems.findIndex(selected => Object.values(selected)[0] === item);
        let updatedSelectedItems = [...selectedItems];
    
        if (selectedIndex === -1) {
            updatedSelectedItems.push({ [updatedSelectedItems.length]: item });
        } else {
            updatedSelectedItems.splice(selectedIndex, 1);
        }
    
        const updatedObjects = updatedSelectedItems.map((obj, index) => {
            const key = Object.keys(obj)[0];
            return { [index]: obj[key] };
        });
    
        setSelectedItems(updatedObjects);
    };
    


    const handleAddToCartClick = () => {
        setSelectedItem(selectedItems)
        setCustomize(false)
    }
    console.log("selectedItem :", selectedItem);

    const veggieItems = [
        "ALMONDS $(0.99)",
        "BANANA PEPPER $(0.99)",
        "BLACK OLIVE",
        "GARLIC $(0.99)",
        "GREEN PEPPER $(0.99)",
        "HONEY HOT SAUCE $(0.99)",
        "JALAPENO PEPPER $(0.99)",
        "LETTUCE $(0.99)",
        "MUSHROOM $(0.99)",
        "OLIVES $(0.99)",
        "ONION",
        "OREGANO",
        "PESTO SAUCE",
        "PICKLE $(0.99)",
        "PINEAPPLE $(0.99)",
        "RED ONION $(0.99)",
        "RED PEPPERS $(0.99)",
        "ROASTED RED PEPPER $(0.99)",
        "SLICED TOMATO $(0.99)",
        "SOUR CREAM $(0.99)",
        "SPINACH",
        "TOMATO $(0.99)",
    ];
    const meatItems = [
        "BACON $(1.50)",
        "BEEF $(1.50)",
        "BEEF CRUMBLE $(1.50)",
        "CHICKEN $(1.50)",
        "DONAIR BEEF $(1.50)",
        "DONAIR SAUCE $(1.50)",
        "GROUND BEEF $(1.50)",
        "HAM $(1.50)",
        "ITALIAN CRUMBLE $(1.50)",
        "ITALIAN SAUSAGE $(1.50)",
        "LEAN BEEF $(1.50)",
        "MEATBALL $(1.50)",
        "PEPPERONI $(1.50)",
        "PULLED PORK $(1.50)",
        "SALAMI $(1.50)",
        "SHAVED STEAK $(1.50)",
    ];
    const cheeseItem = [
        "CHEDDAR CHEESE $(1.50)",
        "CHEESE",
        "FETA CHEESE $(1.50)",
        "GREEK FETA $(1.50)",
        "MOZZA $(1.50)",
        "PARMESAN CHEESE $(1.50)",
    ];
    const sauceItem = [
        "BBQ SAUCE $(0.99)",
        "BUFFALO SAUCE $(0.99)",
        "GARLIC SAUCE $(0.99)",
        "HONEY GARLIC SAUCE $(0.99)",
        "RANCH SAUCE $(0.99)",
    ];


    return (
        <>
            <div className='customize-outer'>
                <ul className='customize-inner'>
                    {["VEGGIE", "MEAT", "CHEESE", "SAUCE"].map((item) => (
                        <li
                            key={item}
                            className='links'
                            onClick={() => {
                                setVeggie(item === "VEGGIE");
                                setMeat(item === "MEAT");
                                setCheese(item === "CHEESE");
                                setSauce(item === "SAUCE");
                            }}>{item}</li>
                    ))}
                </ul>

                <div className='chackbox-seletion'>
                    {veggie && (
                        veggieItems.map((item, index) => (
                            <label key={index} className="checkbox-inner">
                                <input type="checkbox" className="form-checkbox" onChange={() => handleCheckboxChange(item)} />
                                <span className="item">{item}</span>
                            </label>
                        ))
                    )
                    }

                    {meat && (
                        meatItems.map((item, index) => (
                            <label key={index} className="checkbox-inner">
                                <input type="checkbox" className="form-checkbox" onChange={() => handleCheckboxChange(item)} />
                                <span className="item">{item}</span>
                            </label>
                        ))
                    )
                    }

                    {cheese && (
                        cheeseItem.map((item, index) => (
                            <label key={index} className="checkbox-inner">
                                <input type="checkbox" className="form-checkbox" onChange={() => handleCheckboxChange(item)} />
                                <span className="item">{item}</span>
                            </label>
                        ))
                    )
                    }

                    {sauce && (
                        sauceItem.map((item, index) => (
                            <label key={index} className="checkbox-inner">
                                <input type="checkbox" className="form-checkbox" onChange={() => handleCheckboxChange(item)} />
                                <span className="item">{item}</span>
                            </label>
                        ))
                    )
                    }
                </div>

                <div className='customize-btn'>
                    <button>CANCLE</button>
                    <button onClick={handleAddToCartClick}>ADD TO CART</button>
                </div>
            </div>
        </>
    )
}

export default Customize;