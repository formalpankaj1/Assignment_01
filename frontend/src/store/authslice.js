import * as api from '../Components/api/api.js';
const { createSlice } = require('@reduxjs/toolkit');

const authslice = createSlice({
    name: 'user',
    initialState: { authData: null },
    reducers: {
        auth_addUserToLocalstorage(state, action) {
            // console.log("action in auth_addUser : ", action.payload);
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
            return { ...state, authData: action?.payload };

        },
        auth_logout_remove_from_localstorage(state, action) {
            localStorage.clear();
            return { ...state, authData: action?.payload };
        },
        // addSpecificUser_Localstorage(state, action) {
        //     localStorage.setItem('specificUser', JSON.stringify({ ...action?.payload }));
        // }
    },

});

export const { auth_addUserToLocalstorage, auth_logout_remove_from_localstorage } = authslice.actions;
export default authslice.reducer;

export function signin(formdata, router) {
    return async function signinThunk(dispatch, getState) {
        try {

            const data = await api.signIn(formdata);

            if (!data.error) {
                dispatch(auth_addUserToLocalstorage(data));
                router('/');
            } else {
                alert('invalide credentials');
            }

        } catch (err) {
            console.log(err);
            alert("invalid credentials");
        }
    };
}

export function register(formdata, router) {
    return async function registerThunk(dispatch, getState) {
        try {
            const data = await api.registerInapi(formdata);
            // console.log("register", data);

            dispatch(auth_addUserToLocalstorage(data));
            router('/');

        } catch (err) {
            console.log("error in register ", err);
            // alert(" User already exist..");
        }
    };
}

// export function getSpecificUser(username, router) {
//     return async function getSpecificUserThunk(dispatch, getState) {
//         try {
//             const data = await api.getSpecificUserInapi(username);
//             console.log("getSpecificUser", data[0]);

//             dispatch(addSpecificUser_Localstorage(data[0]));
//             router('/');

//         } catch (err) {
//             console.log("error in register ", err);
//             // alert(" User already exist..");
//         }
//     };
// }