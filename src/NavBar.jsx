import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div style={{margin: '5px'}}>
        <Link style={{margin: '5px'}} to='/'>Home</Link>
        <Link style={{margin: '5px'}} to='/checkpn'>Login</Link>
    </div>
  )
}

export default NavBar