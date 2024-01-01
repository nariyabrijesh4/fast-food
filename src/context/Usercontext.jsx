import React, { createContext, useState } from 'react'
import axios from 'axios';
export const userContext = createContext();


function HeaderState(props) {
    const [cart, setCart] = useState(false);
    const [data, setData] = useState([])
    const [orderType, setOrderType] = useState("");
    const [selectedItems, setSelectedItems] = useState([])
    const [billData, setBillData] = useState([])
    const [addVerify, setAddVerify] = useState([])

    const handleClick = () => {
        setCart(true)
    }

    // SIDEBAR DATA
    const fatchData = () => {
        axios.get('https://onlinefoodordering.ca/RangerAPI/testorder/api/initialData').then((res) => {
            if (res.status === 200) {
                setData(res.data.categories)
            }
        })
    }
    return (
        <>
            <userContext.Provider value={{ handleClick, cart, setCart, fatchData, data, setData, billData, setBillData, orderType, setOrderType, selectedItems, setSelectedItems, addVerify, setAddVerify }}>
                {props.children}
            </userContext.Provider>
        </>
    )
}

export default HeaderState