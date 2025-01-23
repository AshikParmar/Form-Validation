import { useState } from 'react'
import './App.css';

function App() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [show, setShow] = useState(true);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    if (isValid(newErrors)) {
      // Show popup
      setIsPopupVisible(true);
  
      // Auto-close popup after 3 seconds
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 3000);
  
      // Clear input fields
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setIsPopupVisible(false);
    }

  };

  const showHandle = () => {
    setShow(!show);
  }

  const isValid = (newErrors) => {
    if(Object.keys(newErrors).length === 0){
      return true;
    }else{
      return false;
    }
    
  };

  const validateForm = () => {

    const errors = {};

    if(!username){
      errors.username = "Username is Required";
    }else if(username.length < 4){
      errors.username = "Username must be at least 4 character";
    }


    if(!email){
      errors.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(email)){
        errors.email = "Email is invalid";
    }


    if(!password){
      errors.password = "Password is required";
    }else if(password.length<6){
      errors.password = "Password must be at least 6 character long";
    }

    if(confirmPassword !== password){
      errors.confirmPassword = "Password do not match";
    }

    return errors;

  }


  

  return (
    <div className='box'>
      <h1>From Validation</h1>

      <form onSubmit={handleSubmit} >
        <div >
        <label >User Name:</label>
        <input type="text" 
        name='username'
        value={username}
        onChange={(e)=>{setUsername(e.target.value.trim())}}
        />
        {errors.username && (
                        <span className="error-message">
                            {errors.username}
                        </span>
        )}
        </div>

        <div>
        <label >Email:</label>
        <input type="email"
        name='email'
        value={email}
        onChange={(e)=>{setEmail(e.target.value.trim())}}
        />
        {errors.email && (
                        <span className="error-message">
                            {errors.email}
                        </span>
        )}
        </div>

        <div>
          <label >Password:</label>
          <div className='password'>
          <input type={ show ? "password" : "text"} 
          name='password'
          value={password}
          onChange={(e)=>{setPassword(e.target.value.trim())}}
          />
          {password && (
                  <p className='show-button'
                    onClick={showHandle}
                  >
                    { show ? "Show" : "Hide"}
                  </p>
          )}
        </div>

        
        {errors.password && (
                        <span className="error-message">
                            {errors.password}
                        </span>
        )}
        </div>

        <div>
          <label >Confirm Password:</label>
        <input type={ show ? "password" : "text"} 
        name='confirm-password'
        value={confirmPassword}
        onChange={(e)=>{setConfirmPassword(e.target.value.trim())}}        
        />
        
        {errors.confirmPassword && (
                        <span className="error-message">
                            {errors.confirmPassword}
                        </span>
        )}
        </div>


        <div>
          <button type='submit'>Submit</button>
        </div>

       
      </form>

      {/* Popup */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h3>Form Submitted!</h3>
            <p>Thank you! Your form has been successfully submitted.</p>
          </div>
        </div>
      )}

      
    </div>
  )
}

export default App
