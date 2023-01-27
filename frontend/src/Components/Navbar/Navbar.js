import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth_logout_remove_from_localstorage } from '../../store/authslice';
import './Style.css';

const Navbar = () => {
    const location = useLocation();
    const history = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch(auth_logout_remove_from_localstorage())
        history('/');
        setUser(null)
    }

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        <div className='navbar'>
            <div className='nav_heading'><h1><a href='/'>SocialMediaApp</a></h1></div>
            <div className='nav_ul'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    {/* <li><Link to="/login">Login</Link></li> onClick={logout} */}
                    {
                        user ?
                            <div className='nav_username'>
                                <li><a href='/profile'>{user.name}</a></li>
                                <li><p onClick={logout}>Logout</p></li>
                            </div>
                            :
                            <li><Link to="/login">Login</Link></li>

                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar