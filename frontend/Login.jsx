import React, { useState} from 'react';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
       event.preventDefault();
       
       //check if password is at least 6 characters long

       if (password.length < 6) {
           setError('Password must be at least 6 characters long.')
           return;
       }
           
       //Check if password is alphanumeric    
    }
    
    // We still need to create a method to verify the password with the server. 
    //This logic will be the groundwork for my future setup

try {
    const response = await fetch('/api/login', {
       method: 'POST',
       headers: {
           'Content_Type': 'application/json',

       },
       body:JSON.stringify({ username,password })
    });
    
    const data = await response.json();

    if(response.ok){
       console.log('Login successful:', data);
       setError('');
    }else{
        setError(data.message || 'Incorrect username or password.');

    } catch (error) {
        setError('Failed to connect to the server.');
        console.error('Error submitting login:', error);
    }
};

return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    </div>
    );
}

export default Login;