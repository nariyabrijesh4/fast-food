import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

function Pizza({ size, crust, selectsize, setSelectSize, setSelectCrust, note, setNote, qty, setQty,setProductDetails, handeAddtoCart,handleCustomize }) {
    return (
        <>
            <div className='row'>
                <div className='col-lg-6'>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-select-size"
                            select
                            label="Size"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select size"
                        >
                            <option value={selectsize} selected disabled>select</option>
                            {size.map((option) => (
                                <option key={option.sizeName} value={option.sizeName} onClick={() => setSelectSize(option)}>
                                    {option.sizeName} [{option.sizePriceX1}]
                                </option>
                            ))}
                        </TextField>
                    </Box>
                </div>
                <div className='col-lg-6'>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '100%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-select-crust"
                            select
                            label="Crust"
                            onChange={(e) => setSelectCrust(e.target.value)}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select crust"
                        >
                            <option value={selectsize} selected disabled>select</option>
                            {crust.map((option) => (
                                <option key={option.modifierName} value={option.modifierName}>
                                    {option.modifierName}
                                </option>
                            ))}
                        </TextField>
                    </Box>
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


                <div className='model-footer'>
                    <button onClick={() => setProductDetails(false)} className='cancle'>CANCEL</button>

                    {/* PIZZA */}
                    <div onClick={handleCustomize}>CUSTOMIZE</div>

                    <button onClick={handeAddtoCart}>ADD TO CART</button>
                </div>
            </div>
        </>
    )
}

export default Pizza;