import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function NavBar(props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const handleDropdownToggle = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const logout = ()=>{
      sessionStorage.clear();
      props.setAuth(null)
      props.setName(null)
      navigate('/login')
  }
  function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <nav className="bg-gray-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-2xl font-bold">
          <Link to="/"><span className="text-blue-500">Expense</span>-<span className="text-green-500">Tracker</span></Link>
        </div>
        <div>
        {props.auth ? (
            <div className="relative inline-block">
              <button onClick={handleDropdownToggle} className="text-black px-4 py-2">
                Hello, {capitalizeFirstLetter(props.name)} ▼
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg">
                  <button onClick={logout} className="block w-full px-4 py-2 text-left text-black hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span>
              <Link to="/login" className="text-black mr-4 whitespace-nowrap">Login</Link>
              <Link to="/signup" className="text-black whitespace-nowrap">Sign Up</Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
