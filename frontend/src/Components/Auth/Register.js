import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../store/authslice';

const Register = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name:document.getElementById('name').value,
            email:document.getElementById('email').value,
            password: document.getElementById('password').value,
            repassword:document.getElementById('repassword').value,
        }

        dispatch(register(data, history));
        // if (isSignup) {
           
        // } else {
        //     dispatch(signin(form, history));
        // }

    }
    
    return (
        <div className="form-container">
            <form id="register-form" onSubmit={handleSubmit} >
                <ul className="form-items">
                    <li>
                        <h1>Create Account</h1>
                    </li>
                    <li>
                        <label htmlFor="name">Name</label>
                        <input type="name" name="name" id="name" />
                    </li>
                    <li>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" />
                    </li>
                    <li>
                        <label htmlFor="repassword">Re-Enter Password</label>
                        <input type="password" name="repassword" id="repassword" />
                    </li>
                    <li>
                        <button type="submit" className="primary">Register</button>
                    </li>
                    <li>
                        <div>
                            Already have an account?.....
                            <a href="/login">Sign-In</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Register