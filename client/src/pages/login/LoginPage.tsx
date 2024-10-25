import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import "./loginPage.scss"
import { observer } from "mobx-react";
import store from "../../mobx/AppDataStore.ts";
import AxiosInstance from "../../axios/AxiosInstance.tsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";


function LoginPage() {
    const [redirect,setRedirect]=useState(false);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginEmail,setLoginEmail]=useState('');
    const [loginPassword,setLoginPassword]=useState('');

    function closeLoginPage(){
        store.setIsLoginOpen(false);
        store.setIsSignUpOpen(false);
    }

    async function handleSignUp(ev){
        ev.preventDefault();

        AxiosInstance.post('/signup',{name,email,password},{withCredentials:true})
            .then(res => {
                // Handle response
                alert('Registration Successful. Now you can login.')

            })
            .catch(err => {
                // Handle errors
                console.error(err);
                alert('Registration failed. Please try again.')
            });

    }

    async function handleLogin(ev){
        ev.preventDefault();
       // console.log(loginEmail);
       // console.log(loginPassword);

        AxiosInstance.post('/login',{loginEmail,loginPassword},{withCredentials:true})
            .then(res => {
                store.setAccessToken(res.data.accessToken);
                console.log(res.data.accessToken);
                AxiosInstance.get('/profile',{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
                    .then(res=>{
                        store.setUser(res.data);
                        setRedirect(true);
                    })
                    .catch(err=>{

                    });
            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });
    }
    if (redirect){
        return <Navigate to={'/profile'}/>
    }




    return (
        <div className="main">
            <div className="loginField">
                <div className="loginInner">
                <h1>Welcome back!</h1>
                    <div className="inputName">
                        Email
                    </div>
                    <input placeholder="Email" value={loginEmail}
                           onChange={e => setLoginEmail(e.target.value)}/>
                    <div className="inputName">
                        Password
                    </div>
                    <input placeholder="Password" value={loginPassword}
                           onChange={e => setLoginPassword(e.target.value)}/>

                </div>
                <div className="btn" onClick={handleLogin}>
                    Log In
                </div>
            </div>
        </div>

    )
}

export default observer(LoginPage)