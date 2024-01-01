import React, { useContext, useEffect, useState } from 'react'
import NoImage from "../../assets/images/NoImage.png";
import Customize from './Customize';
import { Modal } from 'antd';
import axios from 'axios';
import Pizza from './PIZZA/Pizza'
import { userContext } from '../../context/Usercontext';
import Desserts from './DESSERTS/Desserts';
import Salad from './Salad/Salad';
import ClassicPoutine from './Classic Poutine/ClassicPoutine';
import Sides from './SIDES/Sides';
import Pasta from './PASTA/Pasta';

function ProductDetails({ pdetail, setProductDetails, categoryDescription, setAddVerify, addVerify, current, setCurrent }) {


    console.log(categoryDescription);
    const { billData, setBillData, selectedItem, setSelectedItem, selectedItems, setSelectedItems } = useContext(userContext)
    const [customize, setCustomize] = useState(false)
    const [crust, setCrust] = useState([]);
    const [size, setSize] = useState([]);
    const [selectsize, setSelectSize] = useState();
    const [selectcrust, setSelectCrust] = useState();
    const [qty, setQty] = useState(1)
    const [note, setNote] = useState("")
    const [items1, setitems1] = useState([])
    const [items2, setItems2] = useState([])

    const [checkboxItem1, setCheckboxItem1] = useState(null)
    const [checkboxItem2, setCheckboxItem2] = useState(null)

    // Sides variables

    // classic poutine variables
    const [classicPoutine, setClassicPoutine] = useState([])
    const [classicItem, setclassicPoutine] = useState(null)



    // ADD TO CART 
    const handeAddtoCart = () => {
        const params = {
            note: note,
            qty: qty,
            selectedItem: selectedItems,
            produtDetail: pdetail,
            productTotal: (() => {
                if (categoryDescription === "DESSERTS") {
                    return pdetail.price * qty;
                }
                else if (categoryDescription === "SALADS" || categoryDescription === "SIDES" || categoryDescription === "CLASSIC POUTINE" || categoryDescription === "PASTA") {
                    return selectedItems.length > 0 ? selectedItems.reduce((total, item) => total + (item.price * qty), 0) : 0;

                }
            })()
        }
        setBillData([...billData, params])


        setCurrent(0)
        setAddVerify([...addVerify, pdetail.productId])
        setProductDetails(false)
        setNote("")
        setQty(1)
        setSelectedItems([])

        // classicPoutine
        setclassicPoutine(null)
    }


    const closeModel = () => {
        setCustomize(false)
    }


    const handleCustomize = () => {
        setCustomize(true)
    }


    // GET SIZE 
    var getSize = () => {
        axios.get(`${process.env.REACT_APP_URL}/api/PizzaSize/ByProductId?productId=${pdetail.productId}`).then((res) => {
            console.log(res);
            setSize(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    // SALADS 
    const getProductItem = () => {
        axios.get(`${process.env.REACT_APP_URL}/api/Variation/ByProductId?productId=${pdetail.productId}&parentId=0`).then((res) => {

            console.log("res", res);
            if (categoryDescription === "SALADS" || categoryDescription === "SIDES" || categoryDescription === "PASTA") {
                setitems1(res.data.filter((item) => item.level === 1));
                setItems2(res.data.filter((item) => item.level === 2))
            }
            else if (categoryDescription === "CLASSIC POUTINE") {
                setClassicPoutine(res.data);
            }
        })
            .catch((err) => {
                console.log(err);
            })
    }

    console.log("item1 :", items1);
    console.log("item2 :", items2);

    useEffect(() => {
        if (categoryDescription === "PIZZA") {
            getSize();
        }
        else if (categoryDescription === "CLASSIC POUTINE" || categoryDescription === "SIDES" || categoryDescription === "SALADS" || categoryDescription === "PASTA") {
            getProductItem();
        }
    }, [pdetail.productId])


    // GET CRUST
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/api/Modifier/Crusts?sizeId=1&crustId=0&productId=${pdetail.productId}`).then((res) => {
            setCrust(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <>
            <div className='product-details-outer'>
                <div className='product-detail-inner'>
                    <div className='about-product'>
                        <h3 className='pname'>{pdetail.productName}</h3>
                        <h6 className='ptype'>{pdetail.productDescription}</h6>
                    </div>
                    <div className='product-img'>
                        <img src={NoImage} alt="" />
                    </div>
                </div>

                {/* PIZZA */}
                {categoryDescription === "PIZZA" ? <Pizza {...{ size, crust, handeAddtoCart, selectsize, setSelectSize, setSelectCrust, note, setNote, qty, setQty, handleCustomize, setProductDetails }} /> : ""}

                {/* PASTA */}
                {categoryDescription === "PASTA" ? <Pasta {...{ items1, items2, handeAddtoCart, checkboxItem1, setCheckboxItem1, checkboxItem2, setCheckboxItem2, qty, note, setQty, setNote, setProductDetails, current, setCurrent }} /> : ""}


                {/* SIDES */}
                {categoryDescription === "SIDES" ? <Sides {...{ items1, items2, handeAddtoCart, checkboxItem1, setCheckboxItem1, checkboxItem2, setCheckboxItem2, qty, note, setQty, setNote, setProductDetails, current, setCurrent }} /> : ""}


                {/* CLASSIC POUTINE */}
                {categoryDescription === "CLASSIC POUTINE" ? <ClassicPoutine {...{ classicItem, setclassicPoutine, classicPoutine, qty, note, setQty, setNote, handeAddtoCart, setProductDetails, current, setCurrent }} /> : ""}


                {/* SALADS */}
                {categoryDescription === "SALADS" ? <Salad {...{ items1, items2, handeAddtoCart, checkboxItem1, setCheckboxItem1, checkboxItem2, setCheckboxItem2, qty, note, setQty, setNote, setProductDetails, current, setCurrent }} /> : ""}


                {/* DESSERTS */}
                {categoryDescription === "DESSERTS" ? <Desserts {...{ note, setProductDetails, handeAddtoCart, setNote, qty, setQty }} /> : ""}

            </div>



            {/* PIZZA */}
            {categoryDescription === "PIZZA" ?
                <Modal open={customize} onCancel={() => closeModel()} width={500}>
                    <Customize {...{ pdetail, selectsize, selectedItem, setSelectedItem, setCustomize }} />
                </Modal>
                : ""}

        </>
    )
}

export default ProductDetails;