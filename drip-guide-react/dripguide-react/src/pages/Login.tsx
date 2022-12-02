import React, {SyntheticEvent, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { SERVER_URL } from "../components/Links";


const Login = (props: {setName: (name: string) => void}) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    const Submit = async (e: SyntheticEvent) => {
        const MySwal = withReactContent(Swal)
        e.preventDefault();

        if(name.length < 5 || password.length < 5){
            MySwal.fire({
                icon: "error",
                title: <p>Wrong email or password!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }

        const response = await fetch(SERVER_URL + '/login', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, password})
        });
        if(response.ok)
        {
            const content = await response.json();
            props.setName(content.name);
            MySwal.fire({
            icon: 'success',
            title: <p>Successfully logged in!</p>,
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            timer: 1200,
            color: 'white',
            background: '#3e4956',
            //didOpen: () => {
                //MySwal.clickConfirm()
            //}
            }).then(() =>{
                navigate('/user');
            })
        }
        else{
            MySwal.fire({
                icon: "error",
                title: <p>Wrong email or password!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
        }

    }

    return (
        <div className="center-container-small">
            <h1 className="center-text-title">Sign in</h1>
                <form onSubmit={Submit}>
                    <div className="auth-element">
                    <input type="name" className="auth-input" placeholder="Name"
                        onChange={e => setName(e.target.value)}
                    />
                    </div>
                    <div className="auth-element">
                        <input type="password" className="auth-input" placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="auth-element">
                        <button className="btn btn-lg" type="submit">Sign in</button>
                    </div>
                </form>
            </div>
    );
};

export default Login;