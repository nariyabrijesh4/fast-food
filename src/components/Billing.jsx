import React, { useContext, useEffect, useState } from 'react'
import '../css/billing.css'
import { userContext } from '../context/Usercontext';
import { Modal } from 'antd';
import CheckOut from './CheckOut';


function Billing() {

    const { cart, setCart, billData, setBillData, addVerify, setAddVerify } = useContext(userContext)
    const [checkout, setCheckOut] = useState(false);
    const [total, setTotal] = useState()


    const totalAmount = () => {
        const subtotal = billData.reduce((acc, item) => acc + item.productTotal, 0);
        setTotal(subtotal);
    }


    const handleDelete = (item, index) => {
        const productId = item.produtDetail.productId;
        const updatedData = billData.filter((_, i) => i !== index);
        setBillData(updatedData);
        if (addVerify.includes(productId)) {
            const updatedAddVerify = addVerify.filter((id) => id !== productId);
            setAddVerify(updatedAddVerify);
        }
    }

    useEffect(() => {
        totalAmount();
    }, [billData])
    return (
        <>
            <div className='bill-outer' style={{ overflowY: "scroll" }}>
                <h3 className='title'>Cart</h3>
                <div className='table'>
                    <div className='header-name'>
                        <div style={{ width: '50%' }} className='pname'>Product</div>
                        <div style={{ width: '15%' }} className='qty'>Qty</div>
                        <div style={{ width: '20%' }} className='total'>Total</div>
                        <div style={{ width: '15%' }} className='delete'></div>
                    </div>

                    {billData.map((item, index) => (
                        <div className='products' key={index}>
                            <div style={{ width: '50%', fontSize: "13px", padding: '10px 0' }}>
                                <div style={{ fontSize: "13px", fontWeight: "600" }}>{index + 1}. {item.produtDetail && item.produtDetail.productName}</div>
                                {item.selectedItem && item.selectedItem.map((res, i) => (
                                    <div key={i} style={{ padding: "0 10px" }}> {res.name} - ${res.price}</div>
                                ))}
                            </div>
                            <div style={{ width: '15%', padding: '10px 0' }}>{item.qty}</div>
                            <div style={{ width: '20%', padding: '10px 0' }}>{item.productTotal}</div>
                            <div className='delete-btn-btn'>
                                <button onClick={() => handleDelete(item, index)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    ))}

                    <div className='subtotal'>
                        <div style={{ width: '65%' }}>Subtotal</div>
                        <div style={{ width: '35%', overflowX: "hidden" }}>${total}</div>
                    </div>
                    <div className='subtotal'>
                        <div style={{ width: '65%' }}>Total</div>
                        <div style={{ width: '35%', overflowX: "hidden" }}>${total}</div>
                    </div>
                    <button className='order' onClick={() => setCheckOut(true)}>Place Order</button>
                </div>

                <Modal open={cart} onCancel={() => setCart(false)} width={500}>
                    <div className='table'>
                        <div className='header-name'>
                            <div style={{ width: '50%' }} className='pname'>Product</div>
                            <div style={{ width: '15%' }} className='qty'>Qty</div>
                            <div style={{ width: '20%' }} className='total'>Total</div>
                            <div style={{ width: '15%' }} className='delete'></div>
                        </div>

                        {/* map start  */}
                        {billData.map((item, index) => (
                            <div className='products' key={index}>
                                <div style={{ width: '50%', fontSize: "13px", padding: '10px 0' }}>
                                    <div style={{ fontSize: "13px", fontWeight: "600" }}>{index + 1}. {item.produtDetail && item.produtDetail.productName}</div>
                                    {item.selectedItem && item.selectedItem.map((res, i) => (
                                        <div key={i} style={{ padding: "0 10px" }}> {res.name} - ${res.price}</div>
                                    ))}
                                </div>
                                <div style={{ width: '15%', padding: '10px 0' }}>{item.qty}</div>
                                <div style={{ width: '20%', padding: '10px 0' }}>{item.productTotal}</div>
                                <div className='delete-btn-btn'>
                                    <button onClick={() => handleDelete(item, index)}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        ))}

                        <div className='subtotal'>
                            <div style={{ width: '65%' }}>Subtotal</div>
                            <div style={{ width: '35%', overflowX: "hidden" }}>${total}</div>
                        </div>
                        <div className='subtotal'>
                            <div style={{ width: '65%' }}>Total</div>
                            <div style={{ width: '35%', overflowX: "hidden" }}>${total}</div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button className='order' onClick={() => setCart(false)}>Close</button>
                            <button className='order' onClick={() => setCheckOut(true)}>Place Order</button>
                        </div>
                    </div>
                </Modal>

                <Modal open={checkout} onCancel={() => setCheckOut(false)} width={600}>
                    <div className='Checkout'>
                        <CheckOut {...{ total }} />
                    </div>
                </Modal>

            </div>
        </>
    )
}

export default Billing;