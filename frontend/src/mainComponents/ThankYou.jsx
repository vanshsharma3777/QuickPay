import { useEffect } from "react"

import { useNavigate } from "react-router-dom"
const Thankyou=()=>{
   const navigate=useNavigate()
     useEffect(()=>{
        const timer= setTimeout(() => {
            navigate('/dashboard')
        }, 2000);

         return (()=>{
              clearTimeout(timer)
        })
     },[navigate])
   
    return (
      <div className="  h-screen flex items-center justify-center ">
          <div className="">
            <div className="text-[#ECECEC] h-full flex  items-center justify-center   text-2xl   " >
            Payment Successfull
            </div>
          
            <div  className="pt-2  flex items-center justify-center text-sm text-center text-gray-500" > Redirecting to home 
             <div className="w-4 h-4 ml-2 border-2 border-t-[#1F6FEB] border-gray-100 rounded-full animate-spin"></div>
              </div>
          </div>
             
      </div>
    )
}

export default Thankyou