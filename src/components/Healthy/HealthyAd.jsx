import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import classes from "./HeadthyAd.module.css";

//images
import vegetable from "../../assets/images/slider/slider_bg_3.jpg";
import icon1 from "../../assets/icons/1.png";
import icon2 from "../../assets/icons/2.png";
import greenChilli from "../../assets/images/parallax_decors/h_healthy_green_chilli.png";
import redChilli from "../../assets/images/parallax_decors/h_healthy_red_chilli.png";
import yellowChilli from "../../assets/images/parallax_decors/h_healthy_yellow_chilli.png";
import cutChilli from "../../assets/images/parallax_decors/h_healthy_cut_chilli.png";

import Button from "../../components/UI/Button";
import { Link } from "react-router-dom";

const HealthyAd = () => {
  return (
    <section className="healthy" style={{ margin: "100px 0" }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={4}>
            <div className={classes.headers}>
              <h2>Luôn luôn chất lượng</h2>
              <h1>
                Lựa chọn tốt nhất cho <br /> sức khỏe của bạn
              </h1>
            </div>
            <p className={classes.desc}>
              "Chúng tôi đặc biệt quan tâm đến những khách hàng ăn kiêng, nếu
              bạn là người quan tâm đến khẩu phần ăn khoa học, đừng lo, thực đơn
              chúng tôi cung cấp những món ăn kèm tốt nhất."
            </p>
            <ul className={classes["ad-list"]}>
              <li className={classes["ad-item"]}>
                <div className={classes["icon-item"]}>
                  <img src={icon1} alt="icon1" />
                </div>
                <div className={classes["ad-item_desc"]}>
                  <h5>Sách đa dạng</h5>
                  <p>Tha hồ cho bạn lựa chọn</p>
                </div>
              </li>
              <li className={classes["ad-item"]}>
                <div className={classes["icon-item"]}>
                  <img src={icon2} alt="icon2" />
                </div>
                <div className={classes["ad-item_desc"]}>
                  <h5>Sản phẩm chất lượng</h5>
                  <p>Được nhập từ những nhà sách chất lượng</p>
                </div>
              </li>
            </ul>
            <Link to="/menu" className={classes["shop-btn"]}>
              <Button>Ghé mua sách</Button>
            </Link>
          </Col>
          <Col lg={8} style={{ position: "relative" }}>
            <img
              src="https://bizweb.dktcdn.net/100/364/248/files/deckle.jpg?v=1581709110642"
              alt="tô rau củ"
              style={{ width: "100%", height: "100%" }}
            />
            {/* <img
              src={greenChilli}
              alt="ớt xanh"
              className={`${classes.chillies} ${classes.green}`}
            />
            <img
              src={yellowChilli}
              alt="ớt vàng"
              className={`${classes.chillies} ${classes.yellow}`}
            />
            <img
              src={redChilli}
              alt="ớt đỏ"
              className={`${classes.chillies} ${classes.red}`}
            />
            <img
              src={cutChilli}
              alt="ớt cắt"
              className={`${classes.chillies} ${classes.cut}`}
            /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HealthyAd;
