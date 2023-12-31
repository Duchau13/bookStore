import React from "react";
import classes from './ChangePassword.module.css'
import { useState,useEffect } from "react";
import api from '../../apiRequest/axios';
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"


const ChangePassword = () => {
    const token = localStorage.getItem('token')
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [resetPassword,setResetPassword] = useState("");
    const [error,setError] = useState("")
    const navigate = useNavigate()

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setResetPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        try{
            {
                api.put(`account/changepassword`, {
                    oldPassword: password,
                    newPassword: newpassword,
                    repeatPassword: resetPassword
                },
                    {
                        headers: {
                            Access_token: token,
                        }
                    }
                )
                .then(res =>{
                    toast.success('Cập nhập thông tin thành công', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setTimeout(() => {
                        navigate('/')
                    }, 2000);
                })
                .catch(err =>{
                    console.log(err);
                    setError(err.response.data.message)
                    console.log(error)
                    if(error===""){
                        return(
                        toast.error('Thao tác thất bại', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        }));
                    }
                    else{
                        return(
                            toast.error(<div>{error}</div>, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "colored",
                                })
                            )
                    }   
                })
                
            }
            }catch(error){
                console.log(error);
        }    
    };
    // console.log(password)

    return(
        <div className="container">
            <div className={classes["form__changepw"]}>
        <div className={classes["login"]}>
            <h1>Đổi Mật Khẩu</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="password">Mật Khẩu Cũ</label>
            <input
                type="text"
                id="password"
                name="password"
                onChange={handlePasswordChange}
                required
            />
            <label htmlFor="newpassword">Mật Khẩu Mới</label>
            <input
                type="password"
                id="newpassword"
                name="newpassword"
                onChange={handleNewPasswordChange}
                required
            />
            <label htmlFor="repeatpassword">Nhập Lại Mật Khẩu Mới</label>
            <input
                type="password"
                id="repeatpassword"
                name="repeatpassword"
                onChange={handleRepeatPasswordChange}
                required
            />
            <button type="submit">Đổi Mật Khẩu</button>
        </form>
        </div>
        </div>
        <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
        />
    </div>
    )
}


export default ChangePassword