import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div style={{margin: '5px'}}>
        <Link style={{margin: '5px'}} to='/'>Home</Link>
        <Link style={{margin: '5px'}} to='/checkpn'>CheckPhone</Link>
        {/* <Link style={{margin: '5px'}} to='/signin'>SignIn</Link> */}
        {/* <Link style={{margin: '5px'}} to='/signup'>SignUp</Link> */}
    </div>
  )
}

export default NavBar