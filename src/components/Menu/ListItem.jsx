import React from "react";
import classes from './ListItem.module.css'
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RatingStars from "../UI/RatingStars/Index";
import Footer from "../UI/Footer/index";
import { useState,useEffect,useContext } from "react";
import api from '../../apiRequest/axios';
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from "react-paginate";
import Cookies from "js-cookie";
import AuthContext from "../../apiRequest/Authprovider";

const ListItem = () =>{
    const [listItems,setListItems] = useState([])
    const [types, setTypes] = useState([])
    const [activeTypes, setActiveTypes] = useState(1)
    const [pageCount,setPageCount] = useState(0)
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const quantity = {quantity: 1}
    // useContext
    const {auth,setAuth} = useContext(AuthContext);
    //api lay loại hàng
    

    const getData = async() => {
        const res = await api.get("/item")
        return res
    }
    const getType = async () => {
        const res = await api.get("/type")
        return res
    }
    useEffect(() => {
      
        getData().then((res) => {
          setListItems(res.data.data)
          const totalItems = res.data.total
          setPageCount(Math.ceil(totalItems/12))
          
        })
        getData().catch((err) => {
          console.log(err)
        })
        getType().then((res) => {
            setTypes(res.data.data)
          })
          getType().catch((err) => {
            console.log(err)
          })
    },[])
    
    const handleTypes = async (id_type) => {
        const currentData = await fetchDataType(id_type);
        //console.log(data.selected + 1)
        console.log(currentData);
        setListItems(currentData);
        setActiveTypes(id_type);
    }
    //api lấy danh sách item
    const fetchData = async (currentPage) => {
        const id_type = types
        const res = await api.get(`/item?page=${currentPage}&id_type=${id_type}`)
        const data = res.data.data;
        return data;
        
    }
    
    const fetchDataType = async (id_type) => {
        const res = await api.get(`/item?id_type=${id_type}`)
        const data = res.data.data;
        return data;
        
    }
    const handlePgaeclick = async (data) => {
      let currentPage = data.selected +1;
      const currentData = await fetchData(currentPage);
      console.log(data.selected + 1)
      setListItems(currentData);
      
    }
    console.log(Cookies.get('accessToken'));
    const formatter = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "VND",
    });
    console.log(listItems)
    const handleAddToCart = async (id_item) => {
        api.post(`cart/add/${id_item}`,quantity,)
        .then(function (res) {
            console.log(res)
            toast.success('Thêm hàng thành công', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                }); 
        })
        .catch(function (res) {
            console.log(res)
            toast.error('Thêm hàng thất bại', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        });
    }
    return (
        <div>
            <div className="container">
                <h1 className={classes['head-content']}>Danh Sách Sản Phẩm</h1>
                <div>
                    <button className={classes["suggest-items"]}>Gợi Ý Sản Phẩm</button>
                </div>
                <div className={classes['list-type']}>
                    {types.map((type) =>{
                        return(
                        <div 
                        key={type.id_type}
                        className={ activeTypes===type.id_type ? classes['active_type'] : classes['']}
                         
                        onClick={e => handleTypes(type.id_type)}
                        >
                            <span className={classes['name-type']}>{type.name}</span>
                        </div>
                    )})}
                </div>
                <div className="container">
                    <div className="row ">
                    {listItems.map((listItem) =>{
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
                                <div className={classes['icon-add']}
                                    onClick={() => handleAddToCart(listItem.id_item)}
                                >
                                  <ShoppingBasketIcon></ShoppingBasketIcon>
                                </div>
                                </div>
                                </div>
                            </div>
                            )
                        })}
                    
                    
                    </div>
                    <ToastContainer 
                        position="top-right"
                        autoClose={1500}
                        hideProgressBar
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </div>
            <div className={classes['container-pagination']}>
                <ReactPaginate 
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={3}
                    pageRangeDisplayed={3}
                    onPageChange = {handlePgaeclick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    activeClassName={'active'}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                />
            </div>
            <Footer/>
        </div>
    )
}

export default ListItem;