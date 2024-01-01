import React, { useContext, useState } from 'react'
import { userContext } from '../../../context/Usercontext';
import '../../../css/salad.css'

const steps = [
    {
        title: 'First'
    },
    {
        title: 'Second'
    },
    {
        title: 'Last'
    },
];

function Salad({ items1, items2, qty, note, setQty, setNote, handeAddtoCart, setProductDetails, current, setCurrent, checkboxItem1, setCheckboxItem1,checkboxItem2, setCheckboxItem2 }) {
    const { setSelectedItems } = useContext(userContext)

    const handlecheckboxItem1 = (item) => {
        if (checkboxItem1 === item) {
            setCheckboxItem1(null);
        } else {
            setCheckboxItem1(item);
        }

    };



    const handlesaladcheckboxItem2 = (item) => {
        if (checkboxItem2 === item) {
            setCheckboxItem2(null);
        } else {
            setCheckboxItem2(item);
        }
    }

    console.log("checkboxItem1", checkboxItem1);
    console.log("checkboxItem2", checkboxItem2);
    const next = () => {
        setCurrent(current + 1)
        setSelectedItems([checkboxItem1, checkboxItem2])
    }


    return (
        <>
            <div className='salad'>
                {/* <Steps current={current} items={items} /> */}
                {current === 0 ?
                    <>
                        <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px 0" }}>
                            <div>
                                {current < steps.length - 1 && (
                                    <button style={{ background: checkboxItem1 ? "#4e35b1" : "#f4f4f6", color: checkboxItem1 ? "#fff" : "#4e35b1" }} onClick={() => { setCurrent(current + 1) }}>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>

                        <p className='selectDesc'>Please Select 1 item <span>(Required)</span></p>

                        <div className='item-outer'>
                            {items1.map((item, index) => (
                                <label key={index} className='item'>
                                    <input type="checkbox" onChange={() => handlecheckboxItem1(item)} checked={checkboxItem1 === item} />
                                    <span style={{ marginLeft: "20px" }}>{item.name} [{item.price}]</span>
                                </label>
                            ))}
                        </div>
                    </>
                    : ""}

                {current === 1 ?
                    <>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "20px 0" }}>
                            <div>
                                <button onClick={() => { setCurrent(current - 1) }} >
                                    Previous
                                </button>

                            </div>
                            {current < steps.length - 1 && (
                                <button disabled={!checkboxItem2} style={{ background: checkboxItem2 ? "#4e35b1" : "#f4f4f6", color: checkboxItem2 ? "#fff" : "#4e35b1" }} onClick={() => next()}>
                                    Next
                                </button>
                            )}
                        </div>
                        <p className='selectDesc' >Please Select 1 item <span>(Required)</span></p>

                        <div className='item-outer'>
                            {items2.map((item, index) => (
                                <label className='item' key={index}>
                                    <input type="checkbox" onChange={() => handlesaladcheckboxItem2(item)} checked={checkboxItem2 === item} />
                                    <span style={{ marginLeft: "20px" }}>{item.name}</span>
                                </label>
                            ))}
                        </div>
                    </>
                    : ""}

                {current === 2 ?
                    <>
                        <div style={{ display: "flex", justifyContent: "flex-start", margin: "20px 0" }}>
                            <div>
                                <button onClick={() => { setCurrent(current - 1) }} >
                                    Previous
                                </button>
                            </div>
                        </div>

                        <div className='note-outer'>
                            <span>Notes</span>
                            <textarea className='note' value={note} onChange={(e) => setNote(e.target.value)}></textarea>
                        </div>

                        <div className='qty-inc-dec'>
                            <div onClick={() => { if (qty > 1) { setQty(qty - 1) } }}>-</div>
                            <input type="text" value={qty} readOnly onChange={(e) => setQty(e.target.value)} />
                            <div onClick={() => setQty(qty + 1)}>+</div>
                        </div>
                    </>
                    : ""}

                <div className='model-footer'>
                    <button onClick={() => {setProductDetails(false); setCurrent(0)}} className='cancle'>CANCEL</button>

                    <button disabled={current != 2} style={{ background: current === 2 ? "#4e35b1" : "#f4f4f6", color: current === 2 ? "#fff" : "#4e35b1" }} onClick={handeAddtoCart}>ADD TO CART</button>
                </div>
            </div>
        </>
    )
}

export default Salad;