const SubmitButton =({label , onClick})=>{
return (
       
    <div onClick={onClick} className="mt-7 pt-3 pb-2  border border-gray-500 rounded-xl w-[155%] bg-[#FF6B6B] hover:bg-[#FF4C4C] text-center  border-[#FF6B6B]  font-semibold transition duration-300 hover:border-[#FF4C4C]" >
        {label}
    </div>
)
}

export default SubmitButton