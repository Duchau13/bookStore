import React from "react";
import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import api from '../../apiRequest/axios';
import classes from './ListOrders.module.css'

const ListOders = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate();

    const [orders,setOrders] = useState([])

    const getOrders = async() => {
        const res = await api.get("/order")
        return res
    }
    useEffect(() => {
      
        getOrders().then((res) => {
          setOrders(res.data.data)
          console.log(res)
        })
        getOrders().catch((err) => {
          console.log(err)
        })
    },[])

    //console.log(orders)
    function Status(e) {
        const order = e.value
        //console.log(order)
        if(order==0){
            return(    
                <p className={classes['text-wait']} >Chưa xác nhận</p>   
            )
        }
        if(order==3){
            return(    
                <p className={classes['text-unconfirm']} >Đang giao</p>   
            )
        }
        if(order==4){
            return(    
                <p className={classes['text-confirm']} >Hoàn thành</p>   
            )
        }
        if(order==2){
            return ( 
                <p className={classes['text-cancel']} >Đã Huỷ </p>
        )}
        else{
            return (
                <p className={classes['text-unconfirm']} >Đã xác nhận </p>
        )}
    }
    return (
        <div className={classes["container"]}>
            <div className={classes["title"]}>
                <h1>Danh Sách Hoá Đơn</h1>
            </div>
            {orders.map((order) =>{
            return(
            <div className={classes["container__orders"]}>
            <div className={classes["cart-item"]} key={order.id_order}>
                

                <div className={classes["name-item"]}>
                    <p onClick={() => navigate(`/orders/${order.id_order}`)}> 
                        Đơn hàng ngày: {order.time_order}
                    </p>
                </div>
                <div className={classes["price"]}>
                    <p>Giá Sản Phẩm : {order.item_fee}</p>
                </div>
                <div className={classes["price"]}>
                    <p>Phí ship : {order.delivery_fee}</p>
                </div>
                <div className={classes["total-price"]}>
                    <p>Tổng Giá : {order.total}</p>
                </div>
                <div className={classes["total-price"]}>
                    <Status value={order.status}/>
                </div>
            </div>
            <hr></hr>
            </div>
            )})}
        </div>
    )
}

export default ListOders