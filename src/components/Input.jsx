import React from 'react'
import TextField from '@mui/material/TextField';

function Input({lable}) {
  return (
    <>
        <TextField id="outlined-basic" label={lable} variant="outlined" />
    </>
  )
}

export default Input;