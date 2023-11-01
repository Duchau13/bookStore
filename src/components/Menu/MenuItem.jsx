import React from "react";
import classes from './MenuItem.module.css'
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "./ListItem";

const MenuItem = () =>{
    return (
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5  text-center align-baseline'>Sản Phẩm</h1>
                <p className="text-center "><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>Sản Phẩm</p>
                </div>
                
            </div>
            <ListItem/>
        </div>
    )
}

export default MenuItem;