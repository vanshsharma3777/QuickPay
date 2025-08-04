import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
const backendURL = import.meta.env.VITE_BACKEND_URL;
import axios from "axios"
const Dashboard = () => {
    const [amount, setAmount] = useState(0)
    const [letter, setLetter] = useState("")
    const [firstName, setFirstName] = useState("")
    const [username, setUsername] = useState("")
    const [lastName, setLastName] = useState("")
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    function nav() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/signin')
    }
    function send() {
        navigate('/send')
    }

    const filterusers = (users || []).filter((user) => {
        const fullname = `${user.firstName} ${user.lastName}`.toLowerCase()
        return fullname.includes(searchTerm.toLowerCase())
    })

    function handleSendMoney(user){
        
        navigate('/send' , {state :
            {recepient :{
                _id:user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                myamount:user.amount,
                username:user.username
            }}})
            
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const detail = async () => {
            try {
                const res = await axios.get(`${backendURL}/api/v1/amount/balance`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                setAmount(res.data.balance)
                setUsers(res.data.users || [])
                setLetter(res.data.user.firstName[0].toUpperCase())
                setFirstName(res.data.user.firstName[0].toUpperCase() + res.data.user.firstName.slice(1).toLowerCase())
                setLastName(res.data.user.lastName[0].toUpperCase() + res.data.user.lastName.slice(1).toLowerCase())
            }
            catch (err) {
                console.log('error :', err.response?.data || err.message)
            }
        }
        detail()
    }, [navigate])
    return (

        <div className="min-h-screen">
            <div className="p-9 text-[#ECECEC]">
                <div className="text-5xl font-serif font-medium text-[#F5F5F5] ">
                    Quick Pay
                </div>
                <div className="mt-8 text-xl  ">
                    <div className="flex items-center  ">
                        <div className="border rounded-full h-10 w-10 mr-2 bg-green-500 text-center text-black font-semibold flex items-center text-2xl border-[#00FF95] justify-center ">{letter}</div>
                        <div>
                            {firstName} {lastName}
                        </div>
                        <div className="ml-auto right-9  flex items-center" onClick={nav}>
                            <div className="border rounded-full cursor-pointer  h-10 w-10 mr-2 bg-red-500 text-center text-black font-semibold flex items-center text-2xl   justify-center border-[#FF6B6B] " >L</div>
                            <div className="cursor-pointer hover:underline">Log Out</div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 ml-2 text-green-500">
                    {amount === null
                        ? "Check Your Balance"
                        : `Balance: ₹${Number(amount).toLocaleString()}`}
                </div>
                <div className=" ">
                    <div className="sticky top-0 z-50">
                        <div className="flex justify-center">
                            <input className="flex  justify-center w-[60%]  m-5 p-3 text-xl  rounded-full bg-[#2A2A2A] transition hover:bg-[#00C2FF] transition-colors duration-500 text-center ease-out-in hover:text-black" type="text" placeholder="Search Users" value={searchTerm} onChange={(e) => {
                                setSearchTerm(e.target.value)
                            }} >

                            </input>
                        </div>
                    </div>
                    <div className="h-full">
                        <div className=" ">
                            {filterusers.length === 0 ? (
                                <div className="text-center text-gray-400 mt-3 text-lg"> No user found ❌ </div>
                            ) : (
                                filterusers.map((user) => (
                                    (
                                        <div className="flex items-center pb-7 " key={user._id}>
                                            <div>
                                                <div className=" rounded-full h-10 w-10 mr-2 bg-gray-500 text-center text-black font-semibold flex items-center text-xl border-[#00FF95] justify-center ">{user.firstName[0].toUpperCase()}</div>
                                                <div></div>
                                            </div>
                                            <div>
                                                {user.firstName[0].toUpperCase() + user.firstName.slice(1)} {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
                                            </div>
                                            <button onClick={()=>handleSendMoney(user)} className="  border ml-auto   p-2 rounded-xl bg-[#1F6FEB] hover:bg-[#00BFFF] transition duration-300">
                                                Send Money
                                            </button>
                                        </div>
                                    )
                                ))
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Dashboard
