import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../apiRequest/axios";
import classes from "./ListDiscount.module.css";

const ListDiscount = () => {
  const [discountList, setDiscount] = useState([]);

  const getDiscountList = async () => {
    const res = await api.get("/discounts", {});
    return res;
  };
  useEffect(() => {
    getDiscountList().then((res) => {
      setDiscount(res.data.discountList);
      console.log(res);
    });
    getDiscountList().catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <>
      <div className={classes["main-content"]}>
        <img
          className="image"
          src="https://phuclong.com.vn/uploads/post/f08dcfd34af11f-traulanh120k_640x512.png"
          alt="Avatar"
          style={{ width: "100%" }}
        />
        <div className="container mx-auto mt-4">
          <div className="row">
            {discountList.map((item) => {
              return (
                <div className="col-md-4">
                  <div className="card" style={{ width: "25rem",marginBottom:"100px" }}>
                    <img
                      src="https://phuclong.com.vn/uploads/post/69ce5a2fa7a3ee-dgtkhaitruongplthangloi_640x512.jpg"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <div className={classes.code__discount}>
                        <h5 className="card-title">CODE: {item.code}</h5>
                      </div>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Ngày bắt đầu: {item.start_date}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Ngày kết thúc: {item.end_date}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Số lượng tối thiểu: {item.min_quantity}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        Số lượng còn lại: {item.quantity}
                      </h6>
                      <div className={classes["des_discount"]}>
                        <p className="card-text">Mô tả: Giảm {item.discount_percent}% cho tổng hoá đơn</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListDiscount;
