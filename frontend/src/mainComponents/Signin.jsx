import Header from "../components2/Header";
import Input from "../components2/Input"
import SubmitButton from "../components2/SubmitButton"
import { useRef, useState } from "react";
import { useNavigate  } from "react-router-dom";
const backendURL = import.meta.env.VITE_BACKEND_URL;
import { signinSchema } from "../validation/singinSchema";
import axios from "axios";
const Signup =()=>{
const [errors , setErrors]=useState({})

   const navigate = useNavigate()
   const usernameRef=useRef()
   const passwordRef=useRef()
   const  handleSubmit=async (e)=>{
      e.preventDefault()

      const data={
         username:usernameRef.current.value,
         password:passwordRef.current.value
      }
      const result = signinSchema.safeParse(data)
      if(!result.success){
         const fieldErrors={}
         result.error.errors.forEach((err)=>{
            fieldErrors[err.path[0]]=err.message
         })
         setErrors(fieldErrors)
         return
      }
      else{
         setErrors({})
      }
      try {
         const res = await axios.post(`${backendURL}/api/v1/user/signin`, data)
         const { token, user } = res.data;
        
         if(token){
            localStorage.setItem('token',token)
             localStorage.setItem("user", JSON.stringify(user));
            setTimeout(() => {
               navigate('/dashboard')
            }, 2000);
            alert('Login Successful!...')
         }
      } catch (err) {
         const errMsg=err.response?.data?.msg||'something went wrong'
         if(errMsg==='Incorrect password'){
               setErrors({password:'Incorrect password'})
         }
         else if(errMsg==='User not found'){
            setErrors({username:'User not found'})
         }
      else{
         setErrors({password:"Invalid username or password"} && {username:"Invalid username or password"})
      }
      }

   }
   function nav(){
      navigate('/signup')
   }
  return (
     
      <div className="pt-10 min-h-screen">
     <div className="flex justify-center">
        <div className="ml-24 ">
         <Header children={"Sign in"}></Header>
       </div>
     </div>
      <div className="flex justify-center  mt-5 ">
         <div className="" >
         
         <Input className="" children1="Username"
        children2=" davidroy123@gmail.com" ref={usernameRef}>
         </Input>
         {errors.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
         )}
         <Input className="" children1="Password"
         children2=" Enter your password" ref={passwordRef}>
         </Input>
         {errors.password && (
            <p className="text-red-500 text-sm"> {errors.password}</p>
         )}
            <SubmitButton label={"Submit it"} onClick={handleSubmit}></SubmitButton>
       </div>
      </div>
      <div className="pt-4 ml-24 flex justify-center text-gray-500">
        Don't have an Account? <span onClick={nav} className="underline cursor-pointer 
"> Sign Up </span>
      </div>
    </div>   
    )
}

export default Signup
