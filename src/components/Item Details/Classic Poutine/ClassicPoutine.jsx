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

function ClassicPoutine({ classicItem,setclassicPoutine, classicPoutine, qty, note, setQty, setNote, handeAddtoCart, setProductDetails, current, setCurrent }) {

    const { setSelectedItems } = useContext(userContext)

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const handleClassPoutine = (item) => {
        if (classicItem === item) {
            setclassicPoutine(null);
        } else {
            setclassicPoutine(item);
        }

    };


    console.log("classicPoutine", classicPoutine);
    const next = () => {
        setCurrent(current + 1)
        setSelectedItems([classicItem])
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
                                    <button disabled={!classicItem} style={{ background: classicItem ? "#4e35b1" : "#f4f4f6", color: classicItem ? "#fff" : "#4e35b1" }} onClick={() => next()}>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>

                        <p className='selectDesc'>Please Select 1 item <span>(Required)</span></p>

                        <div className='item-outer'>
                            {classicPoutine.map((item, index) => (
                                <label key={index} className='item'>
                                    <input type="checkbox" onChange={() => handleClassPoutine(item)} checked={classicItem === item} />
                                    <span style={{ marginLeft: "20px" }}>{item.name} [${item.price}]</span>
                                </label>
                            ))}
                        </div>
                    </>
                    : ""}

                {current === 1 ?
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

                    <button disabled={current != 1} style={{ background: current === 1 ? "#4e35b1" : "#f4f4f6", color: current === 1 ? "#fff" : "#4e35b1" }} onClick={handeAddtoCart}>ADD TO CART</button>
                </div>
            </div>
        </>
    )
}

export default ClassicPoutine;