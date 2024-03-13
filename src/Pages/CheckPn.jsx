import { useState } from 'react'
import { useCheckPhoneMutation } from '../Features/api/authApi';
import { useNavigate } from 'react-router-dom';

const CheckPn = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [checkPhone] = useCheckPhoneMutation();

    // useEffect(() => {
    //   localStorage.setItem('dataKey', phone);
    // }, [phone]);

    const handleSubmit =  async(event) => {
      event.preventDefault();

      const formData = new FormData()
      formData.append("phone" , phone)
      formData.append("type" , "signup")

      try {
      const response =   await checkPhone(formData)
      console.log(response);
      if(response.data.status === 'new-user')
      {
        localStorage.setItem("PhoneNo", phone)
        navigate('/signup')
      }
      else{
        localStorage.setItem("PhoneNo", phone)
        navigate('/signin')
      }

      } catch (error) {
        console.error('Error: ', error);
      }
    }

    const handleChange = (event) => {
   setPhone(event.target.value)
    }


  return (
    <div>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit} >
        <input style={{margin: '7px'}} onChange={handleChange} value={phone} type="tel" name='phone' maxLength={10} required/>
        {/* <input style={{margin: '7px'}} onChange={handleChange} value={phone.type} type="text" name=''/> */}
        <button style={{margin: '7px'}} type='submit'>Next</button>
        </form>
    </div>
  )
}

export default CheckPn