import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../store/authslice';
import './style.css'

const Login = () => {
    const history = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
        }

        dispatch(signin(data, history));
    }
    return (
        <div className="form-container">
            <form id="signin-form" onSubmit={handleSubmit}>
                <ul className="form-items">
                    <li>
                        <h1>Sign-In</h1>
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
                        <button type="submit" className="primary">Signin</button>
                    </li>
                    <li>
                        <div>
                            New User?......
                            <a href="/register">Create your account</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default Login