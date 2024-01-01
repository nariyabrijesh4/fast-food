import React from 'react'

function Desserts({ note, setNote, qty, setQty, handeAddtoCart, setProductDetails }) {
    return (
        <>
            <div className='note-outer'>
                <span>Notes</span>
                <textarea className='note' value={note} onChange={(e) => setNote(e.target.value)}></textarea>
            </div>

            <div className='qty-inc-dec'>
                <div onClick={() => { if (qty > 1) { setQty(qty - 1) } }}>-</div>
                <input type="text" value={qty} readOnly onChange={(e) => setQty(e.target.value)} />
                <div onClick={() => setQty(qty + 1)}>+</div>
            </div>
            <div className='model-footer'>
                <button onClick={() => setProductDetails(false)} className='cancle'>CANCEL</button>

                <button onClick={handeAddtoCart}>ADD TO CART</button>
            </div>
        </>
    )
}

export default Desserts;