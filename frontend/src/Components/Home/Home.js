import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { followInapi, getFollowersInapi, getFollowingsInapi, getSpecificUserInapi, unfollowInapi } from '../api/api';
import './style.css'

const Home = () => {

  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState();
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);

  const getInfoHandle = async () => {
    const name = document.getElementById('name').value;
    const data = await getSpecificUserInapi(name);
    document.getElementById('name').value = '';
    // console.log("getSpecificUser", data[0]);
    setUserInfo(data[0])
  }

  const getFollowers = async () => {
    const name = document.getElementById('name_getfollowers').value;
    const followers = await getFollowersInapi(name);
    document.getElementById('name_getfollowers').value = '';
    setFollowers(followers);
  }

  const getFollowings = async () => {
    const name = document.getElementById('name_getfollowings').value;
    const followings = await getFollowingsInapi(name);
    document.getElementById('name_getfollowings').value = '';
    setFollowings(followings);
  }

  const Follow = async () => {
    const name = document.getElementById('name_follow').value;
    const data = await followInapi(name);
    document.getElementById('name_follow').value = '';
    alert(data);
  }

  const unfollow = async () => {
    const name = document.getElementById('name_follow').value;
    const data = await unfollowInapi(name);
    document.getElementById('name_follow').value = '';
    alert(data);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className='container'>
        <h1>Test API's Here</h1>
        <p style={{ color: 'red' }}>*NOTE: "For Testing API's you can register and login "</p>
        <b style={{ color: 'red' }}>"Or Else you can also use UserNames: 'pankaj', 'saurabh','abc' For test API'S only"</b>
        <div >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ margin: '1rem' }}>
              <ul className="form-items">
                <li>
                  <h1>Get Specific User Info</h1>
                </li>
                <li>
                  <label htmlFor="name">UserName</label>
                  <input type="name" name="name" id="name" />
                </li>
                <li>
                  <button className="primary" onClick={getInfoHandle}>GetInfo</button>
                </li>
              </ul>
              {
                userInfo ?
                  <div className='specificuserinfo'>
                    <p><b>UserName:</b>"{userInfo.name}"</p>
                    <p><b>email:</b>"{userInfo.email}"</p>
                  </div>
                  :
                  ''
              }
            </div>

            <div style={{ margin: '1rem' }}>
              <ul className="form-items">
                <li>
                  <h1>Get User Followers</h1>
                </li>
                <li>
                  <label htmlFor="name_getfollowers">UserName</label>
                  <input type="name" name="name" id="name_getfollowers" />
                </li>
                <li>
                  <button className="primary" onClick={getFollowers}> Get Followers</button>
                </li>
              </ul>
              {
                followers.length != 0 ?
                  <div className='followersuserinfo'>
                    <h2 style={{ marginLeft: '1rem' }}>UserNames: </h2>
                    <div style={{ width: '16rem', marginLeft: '6rem' }}>
                      {
                        followers.map((x) =>
                          <p>{x},</p>
                        )
                      }
                    </div>


                  </div>
                  :
                  ''
              }
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ margin: '1rem' }}>
              <ul className="form-items">
                <li>
                  <h1>Get User Followings</h1>
                </li>
                <li>
                  <label htmlFor="name_getfollowings">UserName</label>
                  <input type="name" name="name" id="name_getfollowings" />
                </li>
                <li>
                  <button className="primary" onClick={getFollowings}> Get Followings</button>
                </li>
              </ul>
              {
                followings.length != 0 ?
                  <div className='followersuserinfo'>
                    <h2 style={{ marginLeft: '1rem' }}>UserNames: </h2>
                    <div style={{ width: '16rem', marginLeft: '6rem' }}>
                      {
                        followings.map((x) =>
                          <p>{x},</p>
                        )
                      }
                    </div>


                  </div>
                  :
                  ''
              }

            </div>

            <div style={{ margin: '1rem' }}>
              <ul className="form-items">
                <li>
                  <h1>Follow to Specific User</h1>
                  <b style={{ color: 'red', fontSize: '1.3rem' }}>* if you want to follow make sure that you must be logged in</b>
                </li>
                <li>
                  <label htmlFor="name_follow">UserName</label>
                  <input type="name" name="name" id="name_follow" />
                </li>
                <li>
                  <button className="primary" onClick={Follow}> Follow </button>
                  <button className="primary" onClick={unfollow}> Unfollow </button>
                </li>
              </ul>
            </div>
          </div>


        </div>

      </div>
    </div>
  )
}

export default Home