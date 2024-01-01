import React, { useContext, useEffect, useState } from 'react'
import noImage from '../assets/images/NoImage.png'
import verify from '../assets/images/verify.jpg'
import '../css/item.css'
import { useParams } from 'react-router-dom'
import { Modal } from 'antd';
import ProductDetails from './Item Details/ProductDetails';
import axios from 'axios';
import { userContext } from '../context/Usercontext';

function Items() {
  const { orderType, setOrderType, addVerify, setAddVerify } = useContext(userContext)
  const [open, setOpen] = useState(false);
  const [attention, setAttention] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const [data, setData] = useState([]);
  const [pdetail, setPdetail] = useState();
  const [current, setCurrent] = useState(0);

  const { id, categoryDescription } = useParams();

  // GET DATA BY CATAGORY
  const fatchData = () => {
    axios.get(`${process.env.REACT_APP_URL}/api/Product/ByCategoryId?categoryId=${id}`).then((res) => {

      if (res.status === 200) {
        setData(res.data)
      }
    })
  }

  const closeModel = () => {
    setProductDetails(false);
    setCurrent(0)
  }

  const handeSelecttype = (item) => {
    setPdetail(item)
    { orderType === "" ? setOpen(true) : setProductDetails(true) }
  }


  const handleservice = (e) => {
    setOrderType(e)
    setOpen(false)
    if (orderType === "") {
      setAttention(true)
    }
    else {
      setProductDetails(true)
    }
  }

  const handleConfirm = () => {
    setAttention(false)
    setProductDetails(true)
  }

  useEffect(() => {
    fatchData();
  }, [id])

  return (
    <>
      <div className='items-outer'>
        <h2 className='category-name'>
          <span>{categoryDescription}</span>
        </h2>
        <div className='row'>
          {
            data.map((item, index) => (
              <div className='col-lg-6 col-md-6 item-inner'>
                <div className='item' onClick={() => handeSelecttype(item, index)}>
                  <div className='about-item' style={{ padding: "10px 0" }}>
                    <div className="name">
                      <h5 style={{ fontSize: "16px" }}>{item.productName}</h5>
                      <h6 style={{ fontSize: "14px" }}>{item.productDescription}</h6>
                    </div>
                    {categoryDescription === "DESSERTS" ? <h6 style={{ fontSize: "14px" }}>${item.price}</h6> : ""}
                    {categoryDescription === "CALZONES" ? <h6 style={{ fontSize: "14px" }}>${item.pricedesc}</h6> : ""}
                    {categoryDescription === "PIZZA" ? <h6 style={{ fontSize: "14px" }}>${item.pricedesc}</h6> : ""}
                  </div>
                  <div className='image'>
                    <img src={noImage} alt="" />
                  </div>
                </div>
                <div className='verify'>
                  {addVerify.map((res) => (
                    res === item.productId ? <img src={verify} alt="" /> : ""
                  ))
                  }
                </div>
              </div>
            ))
          }


        </div>
      </div>


      {/* SERVICE MODAL */}
      <Modal open={open} onCancel={() => setOpen(false)} width={500}>
        <div className='order-type'>
          <div className='title'>Order Type :</div>
          <div className='service'>
            <button value="TackOut" type='submit' onClick={(e) => handleservice(e.target.value)}>TACK OUT</button>
            <button value="Delivery" type='submit' onClick={(e) => handleservice(e.target.value)}>DELIVERY</button>
          </div>
        </div>
      </Modal>


      {/* ATTENTION START */}
      <Modal open={attention} onCancel={() => setAttention(false)} width={600}>
        <div className='Attention'>
          <div className='title'>Attention</div>
          <p>The store timing is 11:00 AM - 03:30 AM.Do you still want to continue?</p>
          <div className='service'>
            <button onClick={() => setAttention(false)}>CANCLE</button>
            <button onClick={handleConfirm}>CONFIRM</button>
          </div>
        </div>
      </Modal>


      {/* productDetails START */}
      <Modal open={productDetails} onCancel={() => closeModel()} width={600} height={600}>
        <ProductDetails {...{ pdetail, setProductDetails, categoryDescription, setAddVerify, addVerify, current, setCurrent }} />
      </Modal>
    </>
  )
}

export default Items;