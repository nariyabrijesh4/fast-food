import React, { useContext, useEffect, useState } from 'react'
import '../css/navbar.css'
import { userContext } from '../context/Usercontext';
import { Link } from 'react-router-dom';

function Navbar() {

  const { handleClick, data, fatchData } = useContext(userContext)
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCatagory = (index) => {
    setSelectedItem(index)
  }

  useEffect(() => {
    fatchData();
  }, [])

  return (
    <>
      <div className='navbar-outer'>
        <div className='nav-inner'>
          <h2 className='title'>RANGER POS</h2>
          <div className='cart-btn'>
            <button onClick={handleClick}><i className="fa-brands fa-opencart"></i></button>
          </div>
        </div>

        <div className='mobile-outer'>
          <ul className='mobile-nav-inner'>
            {
              data.map(({ categoryDescription, id }, index) => (
                <li className='link'>
                  <Link
                    to={"/" + categoryDescription + "/" + id}
                    style={selectedItem === index ? { background: "#ede7f6", color: "#5e35b1", boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px" } : {}}
                    className='catagory-name'
                    onClick={() => handleCatagory(index)}
                  >{categoryDescription}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar;