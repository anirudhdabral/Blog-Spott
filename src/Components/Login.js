import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { GlobalInfo } from '../App'
import { useDispatch } from 'react-redux';
import users from '../login-details';

function Login() {
    const navigate = useNavigate()
    const { madeBy } = useContext(GlobalInfo)
    const dispatch = useDispatch()
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [idError, setIdError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    function valid() {
        if (id.length !== 5) {
            setIdError("ID should be of 5 digits");
            var idCheck = true;
        }
        else {
            idCheck = false;
            setIdError("");
        }
        if (password.length === 0) {
            setPasswordError("Please enter your password");
            var passwordCheck = true;
        }
        else {
            passwordCheck = false;
            setPasswordError("");
        }
        return (idCheck === false && passwordCheck === false)
    }


    async function submitLogin() {
        if (valid()) {
            for (let i = 0; i <= users.length; i++) {
                if (i === users.length) {
                    console.log("nahi mila")
                    setInvalidCredentials(true)
                    return
                }
                if (users[i].id === Number(id) && users[i].password === password) {
                    dispatch({
                        type: 'LOG_IN'
                    })
                    navigate('/')
                }
            }
        }
    }

    return (
        <div className='card login-card'>
            <div className='h3 m-3 text-center'>Welcome to Blog Spott</div>
            {
                invalidCredentials ?
                    <div class="alert alert-danger" role="alert">
                        <strong>Invalid credentials!</strong> Check ID and password and try again.
                    </div>
                    : null
            }
            <div class="form-floating mb-3">
                <input type="number" class="form-control" placeholder="Login ID"
                    onChange={(e) => { setId(e.target.value)}} />
                <label for="floatingInput">Login ID</label>
                <small className='text-danger'>{idError}</small>
            </div>
            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="Password"
                    onChange={(e) => { setPassword(e.target.value) }} />
                <label for="floatingPassword">Password</label>
                <small className='text-danger'>{passwordError}</small>
            </div>
            <button type='button' className='btn btn-primary btn-lg login-btn'
                onClick={() => {
                    submitLogin()
                }}>Login into awesomeness...</button>
            <small className='text-muted sticky-bottom made-by'>{madeBy}</small>
        </div>
    );
}

export default Login;