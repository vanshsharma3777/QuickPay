import { useNavigate , useLocation } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
const Confirm =()=>{
    const location = useLocation();
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { recepient, amount } = location.state || {};

    useEffect(()=>{
        if(!recepient||!amount){
            navigate('/send')
        }
    },[recepient , amount , navigate])
    const handleConfirm =async()=>{
        if(!recepient||!recepient._id||!amount){
            alert("Missing transaction data")
            return;
        }
        setLoading(true)
        
        if(amount<=0){
            navigate('/dashboard')
            alert('Invalid amount')

            return;
        }
        const token = localStorage.getItem('token')
        try{
            const res = await axios.post("http://localhost:100/api/v1/amount/transfer", {
                 to: recepient._id,
                 amount: amount,
            },{
                 headers: {
            Authorization: `Bearer ${token}`,
          },
          
            })
            console.log("response:", res.data)
            navigate('/thankyou')
        }
        catch(err){
            
            const errMsg= err.response?.data?.msg || 'something went wrong'
            if(errMsg==='Insufficient balance'){
                setError('Insufficient balance')
                navigate('/dashboard')
                alert('Insufficient balance');
            }
            else{
                console.log(errMsg)
                alert(errMsg);
            }
        } 
        finally{
            setLoading(false)
        }
    }
    function back(){
        navigate('/dashboard')
    }
    
    function pay(){
        navigate('/thankyou')
    }
    return(
        <div className="pt-10">
            <div className="text-[#ECECEC]" >
            <div className="text-2xl flex justify-center ">
                Alert
            </div>
            <div className="flex justify-center mt-2 ">
                You are transfering Rs{amount} from your account to {recepient?.firstName} {recepient?.lastName}
            </div>
            <div className="flex justify-center pt-10">
               Confirm to complete the transaction
            </div>
            <div className="flex justify-center ">
                <button onClick={handleConfirm} className="mt-2 px-16 bg-[#FF6B6B] hover:bg-[#FF4C4C] text-center border border-[#FF6B6B] rounded-md font-semibold transition duration-300 hover:border-[#FF4C4C]">
                Confirm
                </button>
            </div>
            <div onClick={back} className="pt-2 cursor-pointer hover:underline flex justify-center text-gray-500"> Back to Home </div>
             
        </div>
        </div>
    )
}

export default Confirm