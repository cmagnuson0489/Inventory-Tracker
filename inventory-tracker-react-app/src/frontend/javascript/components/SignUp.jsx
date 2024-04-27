import React, { useState } from 'react';

function SignUp(){
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email:''   
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });

    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log("Sign Up Data:", formData);
    //Sign up logic still needs to be added
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUp;
