import { useNavigate } from 'react-router-dom'
import { useSignOutMutation } from '../Features/api/authApi';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../Features/slice/authSlice'
import { useState } from 'react';

const DashBoard = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [signOut] = useSignOutMutation();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleClick = async() => {
        try {
            const response = await signOut()
            console.log(response);
            dispatch(logoutSuccess())

            localStorage.removeItem('PhoneNo')
            localStorage.removeItem('ApiToken')
            navigate('/')
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]

        const reader = new FileReader();
        if(file)
        reader.onloadend = () => {setImageUrl(reader.result)}
        reader.readAsDataURL(file);
    }

  return (
    <div>
        <div>
        <button onClick={handleClick}>Logout</button>
        </div>
        <div>
            <form action="" style={{display: 'flex', flexDirection: 'column', marginTop: '5px'}}>
                <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '50%' }}/>
                <input type="file" onChange={handleFileUpload}/>
                <input placeholder='Title' type="text" />
                <input placeholder='Price' type="number" />
                <textarea placeholder='Description' name="" id="" cols="30" rows="10"></textarea>
                <input placeholder='Ad Expiry Date' type="text" />
                <select name="" id=""><option value="">Select Location</option></select>
            </form>
        </div>
    </div>
  )
}

export default DashBoard