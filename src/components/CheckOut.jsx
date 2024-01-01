import React, { useContext, useState } from 'react'
import { Button, message, Steps } from 'antd';
import '../css/checkout.css'
import Box from '@mui/material/Box';
import Input from './Input';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { userContext } from '../context/Usercontext';



function CheckOut({ total }) {

  const { billData, orderType } = useContext(userContext)
  console.log("billData :", billData);
  const DC = 3.50
  const steps = [
    {
      title: 'Contact Info'
    },
    {
      title: 'Payment'
    }
  ];


  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const [current, setCurrent] = useState(0);
  const [otype, setOtype] = useState("")

  const next = () => {
    setCurrent(current + 1);
  }
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const orderSubmit = (e) => {
    e.preventDefault();
  }

  return (

    <>
      <form method='post' onSubmit={orderSubmit}>
        <h4>Checkout</h4>
        <Steps current={current} items={items} />
        <div className='ouder-type'>
          <h6>Order Type : {orderType}</h6>
        </div>


        {/* ORDER TYPE */}
        {current === 0 ? (
          orderType === "TackOut" ?
            <div className='pickup'>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <Input {...{ lable: "Phone No*" }} />
                <Input {...{ lable: "Email" }} />
                <Input {...{ lable: "First Name" }} />
                <Input {...{ lable: "Last name" }} />
                <input type="date" className='input' />
                <Input {...{ lable: "Time" }} />
              </Box>

              <p className='desc'>By proceeding, you consent to get calls, SMS messages, or emails including by automated means, from RANGER POS and its affiliates to the number and email provided.</p>
            </div>
            :
            <div className='delivery'>
              <div className="input-outer">
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "Phone No" }} />
                  </Box>
                </div>
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "Buzzer No." }} />
                  </Box>
                </div>
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "Room No." }} />
                  </Box>
                </div>
                <div className='location'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Add a Location"
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </div>

                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "Phone No.*" }} />
                  </Box>
                </div>
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "E-Mail" }} />
                  </Box>
                </div>
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "First Name:*" }} />
                  </Box>
                </div>
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "Last Name:*" }} />
                  </Box>
                </div>
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "Date" }} />
                  </Box>
                </div>
                <div className='input'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <Input {...{ lable: "Time:*" }} />
                  </Box>
                </div>
                <div className='note'>
                  <Box sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} autoComplete="off" >
                    <TextField
                      id="outlined-multiline-static"
                      label="Note"
                      multiline
                      disabled
                      rows={4}
                      defaultValue="Approximate 60 Min. after placed your order"
                    />
                  </Box>
                </div>
                <p className='desc'>By proceeding, you consent to get calls, SMS messages, or emails including by automated means, from RANGER POS and its affiliates to the number and email provided.</p>

              </div>
            </div>
        )
          : (
            <div className='total-box'>
              <div className="item">
                <div className="title">Subtotal:</div>
                <div className="amount">${total}</div>
              </div>
              <div className="item">
                <div className="title">Tax:</div>
                <div className="amount">$00</div>
              </div>
              <div className="item">
                <div className="title">Delivery Charge:</div>
                <div className="amount">${DC}</div>
              </div>
              <div className="item">
                <div className="title">Total:</div>
                <div className="amount">${total + DC}</div>
              </div>
            </div>
          )}

        <div
          style={{
            marginTop: 24,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {current < steps.length - 1 && (
            <button type="button" onClick={() => next()}>
              Next
            </button>
          )}
          {current === steps.length - 1 && (
            <button type="button" onClick={() => message.success('Processing complete!')}>
              Done
            </button>
          )}
          <button
            type="primary"
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </button>
        </div>
      </form>
    </>
  )
}

export default CheckOut;