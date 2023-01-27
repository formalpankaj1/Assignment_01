import React from 'react'
import axios from 'axios'
import { apiUrl } from './config';

export const registerInapi = async ({ name, email, password, repassword }) => {
    try {
        if (password != repassword) {
            return { error: "password not match" };
        }
        const response = await axios({
            url: `${apiUrl}/users/register`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                name,
                email,
                password,
            },
        });
        // console.log(response);
        if (response.status >= 200 && response.status <= 300) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}

export const signIn = async ({ email, password }) => {
    try {

        const response = await axios({
            url: `${apiUrl}/users/login`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            data: {
                email,
                password,
            },
        });
        // console.log(response);
        if (response.status >= 200 && response.status <= 300) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}

export const getSpecificUserInapi = async (username) => {
    try {

        const response = await axios({
            url: `${apiUrl}/users/${username}`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(response);
        if (response.status >= 200 && response.status <= 300) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}

export const getFollowersInapi = async (username) => {
    try {

        const response = await axios({
            url: `${apiUrl}/users/${username}/followers`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(response);
        if (response.status >= 200 && response.status <= 300) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}

export const getFollowingsInapi = async (username) => {
    try {

        const response = await axios({
            url: `${apiUrl}/users/${username}/following`,
            method: 'GET',
            header: {
                'Content-Type': 'application/json',
            }
        });
        // console.log(response);
        if (response.status >= 200 && response.status <= 300) {
            return response.data;
        } else {
            throw new Error(response.data.message);
        }

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}
const getUserInfo = () => {
    return localStorage.getItem('profile') ?
        JSON.parse(localStorage.getItem('profile')) :
        { name: '', email: '', password: '' };
};
export const followInapi = async (username) => {
    try {
        const { token } = getUserInfo();
        if (!token) {
            alert('signin to follow');
        } else {
            const response = await axios({
                url: `${apiUrl}/users/${username}/follow`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                }
            });
            // console.log(response);
            if (response.status >= 200 && response.status <= 300) {
                return response.data;
            } else {
                throw new Error(response.data.message);
            }

        }

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}
export const unfollowInapi = async (username) => {
    try {
        const { token } = getUserInfo();
        if (!token) {
            alert('signin to Un-follow');
        } else {
            const response = await axios({
                url: `${apiUrl}/users/${username}/follow`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
                }
            });
            // console.log(response);
            if (response.status >= 200 && response.status <= 300) {
                return response.data;
            } else {
                throw new Error(response.data.message);
            }

        }

    } catch (err) {
        console.log(err);
        return { error: err.response.data.message || err.message };
    }
}
