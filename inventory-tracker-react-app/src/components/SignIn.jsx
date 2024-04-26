import React, { useState } from 'react';


function SignIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Check if password is at least 6 characters long
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        // Check if password is alphanumeric
    

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login successful:', data);
                setError('');
                // Redirect to another route or update the state upon successful login
            } else {
                setError(data.message || 'Incorrect username or password.');
            }
        } catch (error) {
            console.error('Error submitting login:', error);
            setError('Failed to connect to the server.');
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

export default SignIn;
