import { useNavigate } from "react-router-dom"
import Header from "../components2/Header"
import axios from "axios"
import { useEffect, useState ,useRef } from "react"
import { useLocation } from "react-router-dom";
const SendMoney = () => {
    const [recepient  , setRecepient]=useState(null)
    const location =useLocation()
    const navigate = useNavigate()
    const inputRef=useRef()

        
    useEffect(()=>{
            if(location.state&&location.state.recepient){
                setRecepient(location.state.recepient)
            }
        },[location])
   const  handleSubmit=async ()=>{
        const inputValue=inputRef.current.value;
        
          if (!recepient || !recepient._id) {
        console.error("Recipient not available yet");
        return;
    }
    if(!inputValue||isNaN(inputValue)){
        alert("enter a valid amount")
        return;
    }
    navigate('/confirm',{
        state:{
            
            recepient,
            amount:inputValue
        }
        
    })
   }
    return (
        <div>
            <div className="text-[#ECECEC] pt-10 ">
                <div className="flex justify-center items-center">
                    <Header children='Transfer Money'>
                    </Header>
                </div>
                {
                    recepient && (
                        <div className="mt-5 text-md flex justify-center  ">
                    <div className="">
                        <div className="pb-2 pt-5">
                            Name: {recepient.firstName[0].toUpperCase() +recepient.firstName.slice(1).toLowerCase()} {recepient.lastName[0].toUpperCase() +recepient.lastName.slice(1).toLowerCase()}
                        </div>
                        <div className="pb-3">
                            Username: {recepient.username}
                        </div>
                        <div  className="pb-1" >
                            Amount (Rs):
                        </div>
                        <div> <input type="text" placeholder="Enter the amount"   ref={inputRef} className="pl-1 text-black  rounded-md w-[100%] bg-gray-200">
                        </input>
                        </div>
                        <button onClick={handleSubmit} className="mt-4 flex justify-center w-[100%] bg-[#FF6B6B] hover:bg-[#FF4C4C] text-center border border-[#FF6B6B] rounded-md font-semibold transition duration-300 hover:border-[#FF4C4C]">
                            Initiate Transaction
                        </button>
                    </div>

                </div>
                    )
                }
                 {!recepient && (
        <div className="text-center mt-10 text-red-500 font-semibold">
          No recipient data found.
        </div>
      )}

            </div>
            <div>

            </div>

        </div>
    )
}

export default SendMoney