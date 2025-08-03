import { useState ,  Suspense  } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter , Routes , Route} from"react-router-dom"
const Dashboard =React.lazy(()=>import("./mainComponents/Dashboard"))
const SendMoney =React.lazy(()=>import("./mainComponents/SendMoney"))
const Confirm =React.lazy(()=>import("./mainComponents/Confirm"))
const UPI =React.lazy(()=>import("./mainComponents/UPI"))
const ThankYou =React.lazy(()=>import("./mainComponents/ThankYou"))
const Signup =React.lazy(()=>import("./mainComponents/Signup"))
const Signin =React.lazy(()=>import("./mainComponents/Signin"))
const Welcome =React.lazy(()=>import("./mainComponents/Welcome"))

function App() {
  function lazyLoad(){
    return (
      <div className='flex h-full items-center justify-center '>
         <div >
          <div  className="  flex items-center justify-center text-xl  text-gray-500" > LOADING
             <div className="w-6 h-6 ml-2 border-2 border-t-[#1F6FEB] border-gray-100 rounded-full animate-spin"></div>
              </div>
         </div>
      </div>
    )
  }
  return (
  <div className='bg-[#1C1C1C]  w-full min-h-screen min-w-screen'>
     <BrowserRouter >
      <Routes>
          <Route path='/signup' element={<Suspense fallback={lazyLoad()}><Signup/></Suspense>}></Route>
          <Route path='/signin' element={<Suspense fallback={lazyLoad()}><Signin/></Suspense>}></Route>
          <Route path='/dashboard' element={<Suspense fallback={lazyLoad()}><Dashboard/></Suspense>}></Route>
          <Route path='/send' element={<Suspense fallback={lazyLoad()}><SendMoney/></Suspense>}></Route>
          {/* <Route path='/security' element={<Suspense fallback={lazyLoad()}><UPI/></Suspense>}></Route> */}
          <Route path='/confirm' element={<Suspense fallback={lazyLoad()}><Confirm/></Suspense>}></Route>
          <Route path='/thankyou' element={<Suspense fallback={lazyLoad()}><ThankYou/></Suspense>}></Route>
          <Route path='/' element={<Suspense fallback={lazyLoad()}><Welcome/></Suspense>}></Route>
      </Routes>
   </BrowserRouter>
  </div>
  )
}

export default App
