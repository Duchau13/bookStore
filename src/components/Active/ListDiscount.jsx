import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../apiRequest/axios";
import classes from "./ListDiscount.module.css";

const ListDiscount = () => {
  let params = new URLSearchParams(window.location.search);
  let id_user = params.get("id_user");
  let activeID = params.get("activeID");

  const getDiscountList = async () => {
    const res = await api.get(
      `user/active?id_user=${id_user}&activeID=${activeID}`,
      {}
    );
    return res;
  };
  useEffect(() => {
    getDiscountList().then((res) => {
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
          src="https://cdnimg.vietnamplus.vn/t1200/Uploaded/fsmya/2022_11_11/vnpkm.png"
          alt="Avatar"
          style={{ width: "100%", marginTop: "76px" }}
        />
        <div
          style={{
            textAlign: "center",
            marginBottom: "50px",
          }}
          className="container mx-auto mt-4"
        >
          KÍCH HOẠT TÀI KHOẢN THÀNH CÔNG
        </div>
      </div>
    </>
  );
};

export default ListDiscount;
