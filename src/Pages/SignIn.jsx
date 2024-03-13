import { useEffect } from 'react'
import { useSignInMutation } from '../Features/api/authApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setApiToken, setUserId } from '../Features/slice/authSlice'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [signIn] = useSignInMutation()
  const navigate = useNavigate()

    const phonevalue = localStorage.getItem('PhoneNo')

    useEffect(() => {
      if (phonevalue !== null){
        setPhone(phonevalue)
      }
    }, [phonevalue])


    const handleSubmit = async(event) => {
      event.preventDefault()

      const formData = new FormData()
      formData.append('phone', phone)
      formData.append('password', password)

      try {
        const response = await signIn(formData)
        console.log(response);
        if (response.data.success === true)
        {
          localStorage.setItem('ApiToken', response.data.data.api_token)

          dispatch( setUserId(response.data.data.user_id))
          dispatch( setApiToken(response.data.data.api_token))

          navigate('/dashboard')
        } else
        {
          alert(response.data.message)
        }
      } catch (error) {
        console.error('Error: ', error);
      }
    }
  return (
    <div>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit}>
            <input style={{margin: '7px'}} value={phone} type="number" readOnly/>
            <input style={{margin: '7px'}} value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
            <button style={{margin: '7px'}} type='submit'>SignIn</button>
        </form>
    </div>
  )
}

export default SignIn