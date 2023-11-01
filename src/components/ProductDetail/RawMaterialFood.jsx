import React from "react";
import classes from './ProductDetail.module.css'
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RatingStars from "../UI/RatingStars/Index";
import Footer from "../UI/Footer/index";
import { useState,useEffect,useContext } from "react";
import api from '../../apiRequest/axios';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";

const RawMaterialFood = () => {
    const [listItem,setListItem] = useState([])
    const navigate = useNavigate();
    const getData = async() => {
        const res = await api.get("/item")
        return res
    }
    useEffect(() => {
      
        getData().then((res) => {
          setListItem(res.data.data)
          
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[])
    const formatter = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
    });
    return (
        <section>
           <div className="container">
                    <div className="row ">
                    {listItem.map((listItem) =>{
                        return(

                            <div 
                            key = {listItem.id_item}
                            className="col-lg-6 mb-5 "
                            >
                                <div className={classes['container-item']}>
                                     <div className={classes['image-item']}>
                                    <img src={listItem.image} alt="food image" width="200px" height="200px"></img>
                                </div>
                                <div className={classes['des-item']} >
                                <div className={classes['item-detail']}>
                                    <span className={classes.namefood}
                                          onClick={() => navigate(`/product-detail/${listItem.id_item}`)}  
                                    >
                                        {listItem.name}
                                    </span>
                                    <div className={classes.rating}>
                                        <RatingStars rating={listItem.rating} />
                                    </div>
                                    <p>
                                        {listItem.description}
                                    </p>
                                    <span className={classes.price}>{formatter.format(listItem.price)}</span>
                                </div>
                                </div>
                                <div className={classes['des-icon']}>
                                <div className={classes['icon-add2']}
                                    // onClick={() => handleAddToCart(listItem.id_item)}
                                >
                                  <ShoppingBasketIcon></ShoppingBasketIcon>
                                </div>
                                </div>
                                </div>
                            </div>
                            )
                        })}
                    
                    
                    </div>
                </div>
        </section>
    )
};

export default RawMaterialFood;