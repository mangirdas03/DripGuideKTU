import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const User = (props: {name: string, role: boolean, mail: string}) => {
    const navigate = useNavigate();
    const [userRole, setRole] = useState("");
    const [icon, setIcon] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newPassConfirm, setNewPassConfirm] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0)
        if(props.role){
            setRole("Administrator")
            setIcon("👨‍💼");
        }
        else{
            setRole("User")
            setIcon("👤");
        } 
    }, []);

    const ChangePass = async() => {
        const MySwal = withReactContent(Swal)
        if(newPass.length < 6 || newPassConfirm.length < 6 || currentPass.length < 6){
            MySwal.fire({
                icon: "error",
                title: <p>Password must be at least 6 characters long!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        if(newPass !== newPassConfirm){
            MySwal.fire({
                icon: "error",
                title: (<p>Password must match!</p>),
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        if(!/\d/.test(newPass)){
            MySwal.fire({
                icon: "error",
                title: <p>Passwords must include a digit!</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        const response = await fetch('http://localhost:8000/api/changepassword', {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({currentPass, newPass, newPassConfirm})
        });
        if(response.ok)
        {
            setCurrentPass("");
            setNewPass("");
            setNewPassConfirm("");
            MySwal.fire({
            icon: 'success',
            title: <p>Password changed successfully!</p>,
            showConfirmButton: true,
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue'
            })
        }
        else{
            MySwal.fire({
                icon: "error",
                title: <p>Password change failed! </p>,
                text: "Wrong current password.",
                showConfirmButton: true,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
            });
        }
    }

    return (
        <div className="center-container-small">
            <div className="user-icon-container">
            {icon}
            </div>
            <p className="user-name">{props.name}</p>
            <div className="user-box">
                <p className="user-box-text">E-mail: {props.mail}</p>
                <p className="user-box-text">Role: {userRole}</p>
            </div>
            <div className="user-box">
                <p className="user-name">Change password</p>
                <br />
                <div className="auth-element">
                    <p className="auth-element-label">Current password</p>
                    <input type="password" className="auth-input" placeholder="Current password"
                       value={currentPass} onChange={e => setCurrentPass(e.target.value)}
                    />
                </div>
                <div className="auth-element">
                    <p className="auth-element-label">New password</p>
                    <input type="password" className="auth-input" placeholder="New password"
                       value={newPass} onChange={e => setNewPass(e.target.value)}
                    />
                </div>
                <div className="auth-element">
                    <p className="auth-element-label">Re-enter new password</p>
                    <input type="password" className="auth-input" placeholder="Re-enter new password"
                       value={newPassConfirm} onChange={e => setNewPassConfirm(e.target.value)}
                    />
                </div>
                <div className="auth-element">
                        <button className="btn btn-lg" onClick={() => ChangePass()} type="button">Change</button>
                </div>
            </div>

        </div>
    );
};

export default User;