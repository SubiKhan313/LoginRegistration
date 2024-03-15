import { useState, useEffect } from 'react'
import { useSignUpMutation } from '../Features/api/authApi'
import { useNavigate } from 'react-router-dom';
import { setApiToken, setUserId } from '../Features/slice/authSlice';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const phoneValue = localStorage.getItem('PhoneNo')

    useEffect(() => {
      if (phoneValue !== null){
        setPhone(phoneValue)
      }
    }, [phoneValue])
  
  const handleSubmit = async(event) => {
    event.preventDefault();

    const formData = new FormData()
    formData.append('phone', phone)
    formData.append('password', password)

    try {
      const response = await signUp(formData)
      console.log(response);
      if(response.data.success){
      localStorage.setItem('ApiToken', response.data.data.api_token)
      localStorage.setItem('user_id', response.data.data.user_id)


      dispatch(setUserId(response.data.data.user_id))
      dispatch(setApiToken(response.data.data.api_token))

       navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  }

  const change = () => {}

  const handleChange = (event) => {
    setPassword(event.target.value)
  }
  return (
    <div>
      <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
        <input style={{margin: '7px'}} value={phone} type="number" name='phone' onChange={change} required/>
        <input style={{margin: '7px'}} type="password" value={password} name='password' onChange={handleChange} required/>
        <button type='submit'>SignUp</button>
      </form>
    </div>
  )
}

export default SignUp