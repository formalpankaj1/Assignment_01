import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'

const Profile = () => {

    // const history = useNavigate();

    // const handleSubmit = () => {
    //     e.preventDefault();

    //     const data = {
    //         title:document.getElementById('title').value,
    //         message:document.getElementById('message').value,
    //     }

    //     dispatch(addPost(data, history));
    // }

    return (
        <div style={{display:'flex',flexDirection:'column', justifyContent:'center'}}>
            <div className='container'>
                <h1>Follwers: </h1>
                <h1>Followings:</h1>
            </div>
            {/* <div className="form-container">
                <form id="register-form" onSubmit={handleSubmit} >
                    <ul className="form-items">
                        <li>
                            <h1>Create Post</h1>
                        </li>
                        <li>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" />
                        </li>
                        <li>
                            <label htmlFor="message">Message</label>
                            <input type="text" name="message" id="message" />
                        </li>
                        <li>
                            <button type="submit" className="primary">Post</button>
                        </li>
                    </ul>
                </form>
            </div> */}

        </div>
    )
}

export default Profile