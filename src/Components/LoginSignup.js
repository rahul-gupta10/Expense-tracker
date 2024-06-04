import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginSignup(props) {
    const navigate = useNavigate()
    const [details, setDetails] = useState({
        Name: '',
        Email: '',
        Password: ''
    })
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: ''
    })

    const onchanges = (e) => {
        document.querySelector('.errmsg').innerHTML = ""
        setDetails((details) => ({
            ...details,
            [e.target.name]: e.target.value
        }));
    }
    const loginchange = (e) => {
        document.querySelector('.lerrmsg').innerHTML = ""
        setLoginData((loginData) => ({
            ...loginData,
            [e.target.name]: e.target.value
        }));
    }

    const login = async (e) => {
        e.preventDefault()
        document.querySelector('.lerrmsg').innerHTML = ""
        if (loginData.Email.length !== 0 && loginData.Password.length !== 0) {
            try {
                document.querySelector('.login').innerHTML = "Please wait..."
                const response = await fetch(`https://script.google.com/macros/s/AKfycbzUubzLAdUGIgGAwwbhuFQz8wgQ_X5hlH_Dhlvj04yUYpktljQyTEuyu6vbMePmDmuA/exec?email=${loginData.Email}&password=${loginData.Password}`)
                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    sessionStorage.setItem('auth', data.data[0].UserID)
                    props.setAuth(sessionStorage.getItem('auth'))
                    sessionStorage.setItem('name', data.data[0].Name)
                    props.setName(sessionStorage.getItem('name'))
                    navigate('/')
                } else {
                    document.querySelector('.lerrmsg').innerHTML = "Failed to login. Please check you credentials!"
                }
            } catch (error) {
                document.querySelector('.lerrmsg').innerHTML = "Somethings went wrong" + error
            }
            document.querySelector('.login').innerHTML = "Login"
        } else {
            document.querySelector('.lerrmsg').innerHTML = "Please fill all details!"
        }
    }

    const signup = async (e) => {
        e.preventDefault();
        const button = document.getElementById('myButton');
        if (details.Name.length !== 0 && details.Email.length !== 0 && details.Password.length !== 0) {
            button.disabled = true;
            button.innerHTML = "Creating.."
            try {
                const response = await fetch(`https://script.google.com/macros/s/AKfycbxVVUTXqJfR1BuPw4lMqvXFMfazVAqr39jzcHIKqilnQpoNPbieq_yxMNjlXmfhELMu/exec?signup=signup&name=${details.Name}&signupemail=${details.Email}&signuppassword=${details.Password}`)
                const data = await response.json();
                if (data.userID) {
                    document.querySelector('.errmsg').innerHTML = "Account Created, Please Login !"
                    const myDiv = document.getElementById('msg');
                    myDiv.style.color = 'green';
                    setDetails({
                        Name: '',
                        Email: '',
                        Password: ''
                    })
                    sessionStorage.setItem('auth', data.userID)
                    props.setAuth(sessionStorage.getItem('auth'))
                    sessionStorage.setItem('name', data.name)
                    props.setName(sessionStorage.getItem('name'))
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                }
                else{
                    document.querySelector('.errmsg').innerHTML = data.data;
                }
            }
            catch (error) {
                document.querySelector('.errmsg').innerHTML = "Somethings went wrong!" + error
            }
            button.disabled = false;
            button.innerHTML = "Sign Up"
        } else {
            document.querySelector('.errmsg').innerHTML = "Please fill all details!"
        }

    }
    return (
        <>
            {props.action === "signup" &&
                <div className="signup-form min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign up</h2>
                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                {/* Signup form */}
                                <form className="space-y-6">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <div className="mt-1">
                                            <input id="text" name="Name" type="text" value={details.Name} onChange={onchanges} autoComplete="on" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input id="email" name="Email" type="email" value={details.Email} onChange={onchanges} autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Passowrd
                                        </label>
                                        <div className="mt-1">
                                            <input id="Passowrd" name="Password" type="password" value={details.Password} onChange={onchanges} autoComplete="off" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                        </div>
                                    </div>
                                    {/* More form fields */}
                                    <div>
                                        <button type="submit" id='myButton' onClick={signup} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Sign up
                                        </button>
                                        <p className="errmsg mt-2 text-red-600" id='msg'></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
            {props.action === "login" &&
                <div className="login-form min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-center text-3xl font-extrabold text-gray-900">Login</h2>
                        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                                {/* Signup form */}
                                <form className="space-y-6">

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Email address
                                        </label>
                                        <div className="mt-1">
                                            <input id="email" name="Email" onChange={loginchange} value={loginData.Email} type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                            Passowrd
                                        </label>
                                        <div className="mt-1">
                                            <input id="Passowrd" name="Password" type="password" onChange={loginchange} value={loginData.Password} autoComplete="off" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                                        </div>
                                    </div>
                                    {/* More form fields */}
                                    <div>
                                        <button type="submit" onClick={login} className=" login w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            Login
                                        </button>
                                        <p className="lerrmsg mt-2 text-red-600" id='lmsg'></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default LoginSignup
