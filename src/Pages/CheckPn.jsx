import { useState } from 'react'
import { useCheckPhoneMutation } from '../Features/api/authApi';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    <div style={{display: 'flex', margin: '20px', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', marginTop: '250px'}}>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control onChange={handleChange} value={phone} type="tel" name='phone' maxLength={10} required placeholder="Enter Phone Number"/>
          </Form.Group>

          {/* <input style={{margin: '7px'}} onChange={handleChange} value={phone} type="tel" name='phone' maxLength={10} required/> */}

          <Button variant="primary" type="submit">
            Next
          </Button>

          {/* <button style={{margin: '7px'}} type='submit'>Next</button> */}
        </form>
    </div>
  )
}

export default CheckPn