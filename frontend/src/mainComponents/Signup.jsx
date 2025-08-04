import Header from "../components2/Header"
import Input from "../components2/Input"
import SubmitButton from "../components2/SubmitButton"
import { useNavigate } from "react-router-dom";
import { signupSchema } from '../validation/signupSchema'
const backendURL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios"
import { useState, useRef } from "react";
const Signin = () => {
  const firstNameref = useRef()
  const lastNameref = useRef()
  const usernameref = useRef()
  const passwordref = useRef()
  const navigate = useNavigate()
  
 
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      firstName: firstNameref.current.value,
      lastName: lastNameref.current.value,
      username: usernameref.current.value,
      password: passwordref.current.value,
    }

    const result = signupSchema.safeParse(data)
   if (!result.success) {
  const fieldErrors = {}

  if (result.error && Array.isArray(result.error.errors)) {
    result.error.errors.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });
  } else {
    console.error("Unexpected validation error:", result.error);
  }

  setErrors(fieldErrors);
  return;
} else {
  setErrors({})
}
  console.log("BACKEND URL:", backendURL);
   try {
     console.log(backendURL)
  const res = await axios.post(`${backendURL}/api/v1/user/signup`, data);
  console.log('response:', res.data);

  // ✅ Save token to localStorage
  if (res.data.token) {
    
    localStorage.setItem('token', res.data.token);
  }
        
        if (res.data.token && res.data.user) {
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));

  alert('Signup successful! Redirecting...');

    navigate('/dashboard' ,  { state: res.data.user });
}


  if (res.data.msg === 'user created succesfully') {

      navigate('/dashboard' ,  { state: res.data.user });

  }
} catch (err) {
  console.log('error:', err.response?.data || err.message);
}
  }
  function nav() {
    navigate('/signin')
  }
  return (
    <div className=""  >
      <div className="flex justify-center pt-10">
        <div className="ml-24 ">
          <Header>Sign up</Header>
        </div>
      </div>
      <div className="flex justify-center  mt-5 ">
        <div className="" >
          <Input children1="First Name"
            children2=" David"
            ref={firstNameref}
          >
          </Input>
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
          <Input className="" children1="Last Name"
            children2=" Roy"
            ref={lastNameref}>
          </Input>
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
          <Input className="" children1="Username"
            children2=" davidroy123@gmail.com"
            ref={usernameref}>
          </Input>
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
          )}
          <Input className="" children1="Password"
            children2=" Enter your password"
            ref={passwordref}>
          </Input>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <div >
            <SubmitButton label="Submit it" onClick={handleSubmit} ></SubmitButton>
          </div>
          <div className="pt-4 flex justify-center w-[155%] text-gray-500">
             Have an Account? <span onClick={nav} className="underline cursor-pointer"> Sign In </span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Signin
