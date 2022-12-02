import React, {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SERVER_URL } from "../components/Links";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const Submit = async (e: SyntheticEvent) => {
        const MySwal = withReactContent(Swal)
        e.preventDefault();
        
        if(name.length < 6 || password.length < 6){
            MySwal.fire({
                icon: "error",
                title: <p>Name and password must be at least 6 characters long!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        if(!email.includes("@") || email.length < 8 || !email.includes(".")){
            MySwal.fire({
                icon: "error",
                title: <p>Incorrect email address!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        if(password != confirm){
            MySwal.fire({
                icon: "error",
                title: <p>Passwords must match!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        if(!/\d/.test(password)){
            MySwal.fire({
                icon: "error",
                title: <p>Passwords must include a digit!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        if(name.length > 40 || password.length > 40 || email.length > 40){
            MySwal.fire({
                icon: "error",
                title: <p>Name, password and email cannot be longer than 45 characters!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        const response = await fetch(SERVER_URL + '/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, password, email})
        });
        
        if(response.status == 409){
            MySwal.fire({
                icon: 'error',
                title: <p>Name or email already registered!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                })
            return
        }
        if(response.ok){
            MySwal.fire({
                icon: 'success',
                title: <p>Successfully registered!</p>,
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: false,
                timer: 1200,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                //didOpen: () => {
                    //MySwal.clickConfirm()
                //}
                }).then(() =>{
                    navigate('/login');
                })
        }
    }
    
    return (
        <div className="center-container-small">
            <h1 className="center-text-title">Sign up</h1>
            <form onSubmit={Submit}>
            <div className="auth-element">
                <input type="name" className="auth-input" placeholder="Name" required
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="auth-element">
                <input type="mail" className="auth-input" placeholder="Email address" required
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="auth-element">
                <input type="password" className="auth-input" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="auth-element">
                <input type="password" className="auth-input" placeholder="Confirm password" required
                    onChange={e => setConfirm(e.target.value)}
                />
            </div>
            <div className="auth-element">
            <button className="btn btn-lg" type="submit">Sign up</button>
            </div>
 
            </form>
        </div>
    );
};

export default Register;