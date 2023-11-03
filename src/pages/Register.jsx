import {React, useState} from 'react';
import { useFormik } from "formik";
import api from '../apiRequest/axios';
import { useNavigate } from 'react-router-dom';
//import CloseIcon from "@mui/icons-material/Close";
//import { NavLink } from "react-router-dom";
//import { Fragment } from "react";
import LabledInput from "../components/UI/Input/LabledInput"
import Button from "../components/UI/Button/SmallButton"
import {ToastContainer, toast} from "react-toastify"

const validateLogin = (values) => {
    const errors = {};
  
    if (!values.email || values.email.trim().length === 0) {
      errors.email = "Xin hãy nhập email!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Email không hợp lệ!";
    }
  
    if (!values.password || values.password.trim().length === 0) {
      errors.password = "Xin hãy nhập mật khẩu!";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
      errors.password = "Mật khẩu không hợp lệ!";
    }
    if (!values.name || values.name.trim().length === 0) {
      errors.name = "Xin hãy nhập tên của bạn!";
    }
    if (!values.username || values.username.trim().length === 0) {
        errors.username = "Xin hãy nhập username của bạn!";
    }
    if (!values.phone || values.phone.trim().length === 0) {
        errors.phone = "Xin hãy nhập số điện thoại của bạn!";
      } else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(values.phone)) {
        errors.phone = "Số điện thoại không hợp lệ!";
    }
    if (!values.address || values.address.trim().length === 0) {
        errors.address = "Xin hãy nhập địa chỉ của bạn!";
    }
    return errors;
};




const Register = () => {
    const navigate = useNavigate();

    const handlesubmit = (values) => {
      api.post(`/account/create`,values)
      .then(function (res) {
        toast.success('Đăng ký thành công!', {
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
        }, 3000);
      })
      .catch(function (res) {
        toast.error(`${res.response.data.message}`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        })
    }
    const formikRegister = useFormik({
        initialValues: {
          username: "",
          password: "",
          name:"",
          email: "",
          phone:"",
          address:"",
      
        },
        validate: validateLogin,
        onSubmit: values => {
            handlesubmit(values)
        }
      });
    return (
      
    <div>
      <div className="container " style={{marginTop:"100px"}}> 
      <div>
        <h1 className='display-6 mark text-center'>Đăng ký tài khoản</h1>
      </div>
      <form onSubmit={formikRegister.handleSubmit}> 
        <LabledInput
         name="username"
         label="username"
         placeholder="Nhập username"
         required={true}
         value={formikRegister.values.username}
         onChange={formikRegister.handleChange}
         onBlur={formikRegister.handleBlur}
         error={
            formikRegister.touched.username && formikRegister.errors.username
            ? formikRegister.errors.username
            : null
         }
        />
        <LabledInput
        name="email"
        label="Email"
        placeholder="Nhập Email"
        required={true}
        value={formikRegister.values.email}
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        error={
            formikRegister.touched.email && formikRegister.errors.email
            ? formikRegister.errors.email
            : null
        }
      />
      <LabledInput
        name="password"
        label="Mật khẩu"
        placeholder="Nhập 8 kí tự có ít nhất 1 chữ cái viết hoa và 1 số"
        required={true}
        type="password"
        value={formikRegister.values.password}
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        error={
            formikRegister.touched.password && formikRegister.errors.password
            ? formikRegister.errors.password
            : null
        }
      /> 
      <LabledInput
        name="name"
        label="Họ tên của bạn"
        placeholder="Nhập họ tên của bạn"
        required={true}
        value={formikRegister.values.name}
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        error={
            formikRegister.touched.name && formikRegister.errors.name
            ? formikRegister.errors.name
            : null
        }
      /> 
      <LabledInput
        name="phone"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại của bạn"
        required={true}
        value={formikRegister.values.phone}
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        error={
            formikRegister.touched.phone && formikRegister.errors.phone
            ? formikRegister.errors.phone
            : null
        }
      /> 
      <LabledInput
        name="address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ của bạn"
        required={true}
        value={formikRegister.values.address}
        onChange={formikRegister.handleChange}
        onBlur={formikRegister.handleBlur}
        error={
            formikRegister.touched.address && formikRegister.errors.address
            ? formikRegister.errors.address
            : null
        }
      /> 
      <Button type="submit">Đăng Ký</Button>
     </form> 
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
};

export default Register;