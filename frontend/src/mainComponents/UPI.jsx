import Header from "../components2/Header"
import SubmitButton from "../components2/SubmitButton"
import  {useNavigate}  from "react-router-dom"

const UPI = () => {
    const navigate = useNavigate();
    function nav(){
        navigate('/thankyou')
    }
    return (
       
        <div className="text-[#ECECEC]">
            <div className="pt-10">
                <div className=" flex pt-10  justify-center">
                <Header children={"Enter UPI PIN"}></Header>

            </div>
            <div class="h-full mt-10 flex flex-col items-center justify-center space-y-6">
                <div class="flex gap-4">
                    <input  type="text" maxlength="1" class="w-14 h-14 text-center text-2xl rounded-lg border border-gray-700 bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]" />
                    <input  type="text" maxlength="1" class="w-14 h-14 text-center text-2xl rounded-lg border border-gray-700 bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]" />
                    <input  type="text" maxlength="1" class="w-14 h-14 text-center text-2xl rounded-lg border border-gray-700 bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]" />
                    <input  type="text" maxlength="1" class="w-14 h-14 text-center text-2xl rounded-lg border border-gray-700 bg-[#1C1C1C] text-white focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]" />
                    
                </div>
            </div>
            <div className="flex justify-center">
                <button onClick={nav} className="mt-5 px-[7%] flex justify-center bg-[#FF6B6B] hover:bg-[#FF4C4C] text-center border border-[#FF6B6B] rounded-md font-semibold transition duration-300 hover:border-[#FF4C4C]" >
                    Confirm
                </button>
             </div>
             
            </div>
        </div>
    )
}

export default UPI