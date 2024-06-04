import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    function capitalizeFirstLetter(string) {
        if (!string) return string; // Return the original string if it is empty or not a string

        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    const navigate = useNavigate()
    const [data, setData] = useState({
        Amount: '',
        Type: 'travel',
        Comment: ''
    })

    const [loading, setLoading] = useState(false)
    const [userdata, setUserData] = useState([])
    const onchanges = (e) => {
        setData((data) => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }
    const onsubmit = async () => {
        const element = document.querySelector('.loader');
        if (data.Amount.length > 0 && data.Comment.length > 0 && data.Type.length > 0) {
            try {
                element.classList.add('circle');
                document.querySelector('.addButton').style.display = 'none';
                const response = await fetch(`https://script.google.com/macros/s/AKfycbxrOWiY-4_QQfldKmHb2dyr32hKAZub0aN9wRUzIDfm8bDlkX7rfLoVZXFC4mBO3zPb/exec?insert=insert&comment=${data.Comment}&amount=${data.Amount}&type=${data.Type}&userid=${sessionStorage.getItem("auth")}`)
                const dataProcess = await response.json();
                setUserData((prevUserData) => [
                    ...prevUserData,
                    {
                        ID: dataProcess.id,
                        Amount: dataProcess.amount,
                        Type: dataProcess.type,
                        Comment: dataProcess.comment
                    }
                ]);
                setData({
                    Amount: '',
                    Type: 'travel',
                    Comment: ''
                })
                element.classList.remove('circle');
                document.querySelector('.addButton').style.display = "inline"
            } catch (error) {
                document.querySelector('.details').innerHTML = "Something went work " + error
            }
            element.classList.remove('circle');
        } else {
            alert("Please fill all required details")
        }

    }
    const deleteFunct = async (id) => {
        const deleteIcon = document.querySelector('.delete' + id)
        deleteIcon.classList.toggle('hidden')
        try {
            const response = await fetch(`https://script.google.com/macros/s/AKfycbyXGGt3IrGyryqgq9VFPsTboBmHcn6r42Y54NEQVyf-mExy46nS-ed_TODNJVAnSJ8L/exec?deleteitem=true&dataId=${id}&userid=${sessionStorage.getItem("auth")}`)
            // eslint-disable-next-line
            const data = await response.json();
            const newUserDetails = userdata.filter(userdata => userdata.ID !== id)
            setUserData(newUserDetails)
            deleteIcon.classList.remove('hidden')
        } catch (error) {
            document.querySelector('.details').innerHTML = "Something went work " + error
        }

    }
    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch(`https://script.google.com/macros/s/AKfycbyXuUNGM85Xz6LLgfPUDEKTLJTAE0xc6Z--GwNzO44inyQYzXYp6BjKuFRGnABe0_b3/exec?userid=${sessionStorage.getItem('auth')} `)
            const data = await response.json();
            setUserData(data.data);
            setLoading(false)
        } catch (error) {
            document.querySelector('.details').innerHTML = "Something went work " + error
        }
    }

    useEffect(() => {
        sessionStorage.getItem("auth") ? fetchData() : navigate('/login')
        // eslint-disable-next-line
    }, [])
    return (
        <>
            <div className='bg-blue-100 container mx-auto mt-4 md:flex  md:items-center md:justify-between p-5 max-sm:text-left '>
                <div className='max-sm:mt-1'>
                    <div><label htmlFor="amount">Amount</label> <input type="number" value={data.Amount} name="Amount" id="amount" className='ml-4 border-gray-300 border-solid border-2 max-sm:ml-[30px]' onChange={onchanges} /></div>
                </div>
                <div className='max-sm:mt-1'>
                    <label htmlFor="type">Type</label>
                    <select name="Type" id="type" className='ml-4 border-gray-300 border-solid border-2 max-sm:ml-[56px]' onChange={onchanges}>
                        <option value="travel">Travel</option>
                        <option value="food">Food</option>
                        <option value="wearable">Wearable</option>
                    </select>
                </div>

                <div className="max-sm:mt-1">
                    <label htmlFor="comment">Comment</label> <input placeholder='Comment you expense' value={data.Comment} type="text" name="Comment" id="comment" onChange={onchanges} className='ml-4 border-gray-300 border-solid border-2 ' />
                </div>

                <div className='loader mr-5 hover:cursor-pointer max-sm:text-center max-sm:mt-1' >
                    <i className="fa-solid fa-plus text-3xl addButton" onClick={onsubmit}></i>
                </div>
            </div>
            <div className="container mx-auto  lg:w-4/5 p-2 mt-3 bg-slate-200 shadow-lg details">
                <h3 className='underline font-serif font-bold'>Your Expense Records</h3><br />
                <div className='flex bg-green-600 justify-start'>
                    <div className='w-[60%] max-sm:w-[50%]'><p>Comment</p></div>
                    <div className='w-[15%]'><p>Type</p></div>
                    <div className='w-[15%] max-sm:w-[20%]'><p>Amount</p></div>
                    <div className='w-[5%]'><p>Action</p></div>
                </div>
                {loading && <div className='font-bold'>Loading you expenses. Please wait !</div>}
                {userdata.map((item, index) => (
                    <div key={index} className={`${index % 2 === 0 ? "bg-blue-400" : "bg-slate-400"} flex text-center  font-normal p-2`} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div className={`w-[60%] max-sm:w-[50%]`}><p>{capitalizeFirstLetter(item.Comment)}</p></div>
                        <div className=' w-[15%] '><p>{capitalizeFirstLetter(item.Type)}</p></div>
                        <div className='w-[15%] max-sm:w-[20%]'><p>{item.Amount}</p></div>
                        <div className='w-[5%]' onClick={() => deleteFunct(item.ID)}>
                            <i className={`fa-solid fa-trash fa-2x delete${item.ID}`}></i>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Home
