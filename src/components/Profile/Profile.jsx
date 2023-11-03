import { useEffect,useContext,useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


import AuthContext from "../../apiRequest/Authprovider"
import classes from './Profile.module.css'
import api from '../../apiRequest/axios';

const Profile = () => {
    const token = localStorage.getItem('token')
    const [info,setInfo] = useState({})
    const navigate = useNavigate()
    const {auth,setAuth} = useContext(AuthContext)

    console.log(auth)


    

    useEffect(()=>{
        if(!localStorage.getItem('role')){
            navigate("/")
        }
    },[])

    // console.log(info)
    const handleSubmit = (e) =>{
        e.preventDefault();

        try{
        {
            api.put(`account/updateprofile`, {
                name: info.name,
                phone: info.phone,
                address: info.address
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
                    navigate('/profile')
                }, 2000);
            })
            .catch(err =>{
                console.log(err)
                toast.error('Thao tác thất bại', {
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
        
        }catch(error){
            console.log(error);
        }
        
    }
    const handleLogout = (e) =>{
        try{
        {
            api.get(`user/logout`)
            .then(res =>{
                toast.success('Đăng Xuất Thành Công', {
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
                    localStorage.clear()
                    navigate('/')
                }, 2000);
            })
            .catch(err =>{
                console.log(err)
                toast.error('Thao tác thất bại', {
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
        
        }catch(error){
            console.log(error);
        }
        
    }
    const handleChange= (e) => {
        setInfo(info => ({
          ...info,  
          [e.target.name]: e.target.value
        }));
    }
    return(
        <div style={{marginTop:"80px"}} className={classes["main-container"]}>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className={classes["user-info"]}>
                            <div className={classes["main-title"]}>
                                <h5>Thông tin cá nhân</h5>
                            </div>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Tên</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <input name="name" value={auth.name} type="text" onChange={handleChange}/>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Email</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <h5>{auth.email}</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>SDT</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <input name="phone" value={auth.phone} type="text" onChange={handleChange}/>
                                </div>
                            </div>
                            <hr />
                            <div className={classes["data-user"]}>
                                <div className={classes["title"]}>
                                    <h6>Địa chỉ</h6>
                                </div>
                                <div className={classes["value-info"]}>
                                    <input 
                                        className={classes["input-location"]}
                                        name="address" 
                                        value={auth.address}
                                        type="text"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <hr></hr>
                            <div className={classes["button__update"]}> 
                                
                                <div className={classes["log-out"]} onClick={handleLogout}>
                                    <button>Đăng Xuất</button>
                                </div>
                            
                                <div className={classes["button-update"]} onClick={handleSubmit}>
                                    <button>Cập nhập thông tin</button>
                                </div>
                                <Link to="/change-password">
                                <div className={classes["log-out"]}>
                                    <button>Đổi Mật Khẩu</button>
                                </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className={classes["total-order"]}>
                            <p>Tổng hoá đơn: 9</p>
                        </div>
                        <div className={classes["total-pay"]}>
                            <p>Tổng tiền thanh toán: 20.000.000</p>
                        </div>
                        <div className={classes["order-type"]}>
                            <div className={classes["order-final"]}>
                                <p>Hoá đơn thành công: 5</p>
                            </div>
                            <div className={classes["order-cancel"]}>
                                <p>Hoá đơn đã huỷ: 4</p>
                            </div>
                        </div>
                    </div>
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

export default Profile;