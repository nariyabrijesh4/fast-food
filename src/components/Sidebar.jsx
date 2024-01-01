import React, { useContext, useEffect, useState } from 'react'
import '../css/sidebar.css'
import { Link } from 'react-router-dom';

import { userContext } from '../context/Usercontext';

function Sidebar() {
  const { data, fatchData } = useContext(userContext);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCatagory = (index) => {
    setSelectedItem(index)
  }


  useEffect(() => {
    fatchData();
  }, [])

  return (
    <>
      <div className='sidebar-outer'>
        <ul className='catagorys'>
          {
            data.map(({ categoryDescription, id }, index) => (
              <li className='link'>
                <Link
                  to={"/" + categoryDescription + "/" + id}
                  style={selectedItem === index ? { background: "#ede7f6", color: "#5e35b1", boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px" } : {}}
                  className='catagory-name'
                  onClick={() => handleCatagory(index)}
                >
                  {categoryDescription}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default Sidebar;