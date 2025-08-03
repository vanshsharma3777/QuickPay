import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
const Welcome=()=>{
  const [fadeOut, setFadeOut] = useState(false);

       const navigate=useNavigate()
    useEffect(()=>{
        const fadeTimer =setTimeout(()=>{
           setFadeOut(true)
        },2000)

        const visit = setTimeout(() => {
      navigate('/signin')// remove WelcomePage after transition
    }, 3000);

        return ()=>{
            clearTimeout(visit)
            clearTimeout(fadeOut)
        }
    },[navigate])
    return (
        <div  className={`h-screen w-screen flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"}`}>
            <div class="h-screen w-screen   flex items-center justify-center">
  <div class="text-center space-y-6 px-4">
    <h1 class="text-4xl sm:text-6xl font-bold text-white ">
      Welcome to <span class="text-[#1F6FEB]">QUICKPAY</span>
    </h1>
    <p class="text-gray-400 text-lg sm:text-xl max-w-md mx-auto">
      Fast, secure, and effortless payments — all in one place.
    </p>
   
  </div>
</div>

        </div>
    )
}

export default Welcome