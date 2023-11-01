import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useContext } from "react";

import combo from "../../assets/images/banner/combo.png";
import pizza from "../../assets/images/banner/pizza.png";
import burger from "../../assets/images/banner/burger.png";
import chicken from "../../assets/images/banner/chicken.png";
import pasta from "../../assets/images/banner/pasta.png";
import drinks from "../../assets/images/banner/drinks.png";

import BannerItem from "./BannerItem";
import AuthContext from "../../apiRequest/Authprovider";

const BannerItems = [
  {
    id: 1,
    name: "Trà Sữa",
    link: "/menu",
    image: "https://phuclong.com.vn/uploads/dish/e3a453a57402ee-65000307trsanhnsen.png",
  },
  {
    id: 2,
    name: "Cà Phê",
    link: "/menu",
    image: "https://phuclong.com.vn/uploads/dish/8ebb07f0eeccc1-resize_damdadunggu07.png",
  },
  {
    id: 3,
    name: "Trà Đào",
    link: "/menu",
    image: "https://phuclong.com.vn/uploads/dish/4d247cffb2c4d5-hngtrchanh.png",
  },
  {
    id: 4,
    name: "Đồ Ăn",
    link: "/menu",
    image: "https://phuclong.com.vn/uploads/dish/e8bf964785cc8f-anh_viber_20210127_153151.jpg",
  },
  {
    id: 5,
    name: "Bánh",
    link: "/menu",
    image: "https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/41-1.png",
  },
  {
    id: 6,
    name: "khác",
    link: "/menu",
    image: "https://phuclong.com.vn/uploads/dish/61b22d5643fc80-img_67711.png",
  },
];

const BannerList = () => {
  const {auth,setAuth} = useContext(AuthContext)
  console.log(auth)


  return (
    <section className="banner">
      <ul style={{ backgroundColor: "var(--green)", padding: "22px 20px" }}>
        <Container>
          <Row>
            {BannerItems.map((item) => (
              <BannerItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </ul>
    </section>
  );
};

export default BannerList;
