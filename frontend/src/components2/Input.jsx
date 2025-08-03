import { forwardRef } from "react"

const Input =forwardRef(({children1 , children2 , type='text' , className=''}, ref)=>{
    return(
        <div >
            <div className="text-[#ECECEC] pt-6 ">
                <p className="text-md">
                {children1}
            </p>
            <input type={type} placeholder={children2} ref={ref} className="mt-1 pt-3 text-black pb-2 border border-gray-500 rounded-xl w-[155%] bg-gray-200" />
                </div>
        </div>
    )
})

export default Input 