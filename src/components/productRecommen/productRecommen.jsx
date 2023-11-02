import React, { useState } from "react";
import classes from './productRecommen.module.css'
import api from '../../apiRequest/axios';
import AuthItems from "../../apiRequest/ItemProvider";
import { useContext } from "react";
import AuthContext from "../../apiRequest/Authprovider";
import { useNavigate } from "react-router-dom";


const initialCards = [
    { id: "1", title: "Lựa chọn 1", description: "Phần truyện thiếu niên. Tôi thích đọc những cuốn sách không quá nặng nề.", image: "https://lh5.googleusercontent.com/Gbjy63YqPkNKz7p43v2EFaLAlsSHiAlyLo5zgM64uhV0gI0Lx7TCyZXJmYHU-_sXzVOThR9SsrzolQxFDqwyPaDbgMh9zq8z9eGE7XXaqNpc4jaNYYRdpVL3Hf3B26jxcLJnXy1MeaYrX4-F7w" },
    { id: "2", title: "Lựa chọn 2", description: "Phần truyện người lớn. Càng nóng bỏng càng tốt.", image: "https://thoidai.com.vn/stores/news_dataimages/thuy.dang/052019/29/00/in_article/5711_poster.medium.jpg" },
    { id: "3", title: "Lựa chọn 3", description: "Phần trưng bày hàng tháng. Tôi thích xem những gì người đọc khác giới thiệu", image: "https://songhantourist.com/upload/articles-images/images/Kdokawa_from%20Kadokawa%20Culture%20Museum.jpeg" },
    { id: "4", title: "Lựa chọn 4", description: "Phần truyện hư cấu. Mục tiêu chính là quên đi thực tế.", image: "https://c.wallhere.com/photos/15/95/Batman-95584.jpg!d" },
    { id: "5", title: "Lựa chọn 5", description: "Phần truyện phiêu lưu. Tôi thích những cuốn sách mang tôi đến những nơi mới mẻ.", image: "https://cdn.pixabay.com/photo/2016/11/22/19/25/adventure-1850178_960_720.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "Phần truyện khoa học viễn tưởng. Tôi thích những cuốn sách khám phá những khả năng của công nghệ và con người.", image: "https://png.pngtree.com/background/20230319/original/pngtree-sci-fi-world-cityscape-background-picture-image_2151048.jpg" },
];
const initialCards2 = [
    { id: "1", title: "Lựa chọn 1", description: "Một quán cà phê, ưu tiên một chỗ ngồi gần cửa sổ.", image: "https://statics.vinpearl.com/cafe-sach-ha-noi-1_1682237832.jpg" },
    { id: "2", title: "Lựa chọn 2", description: "Giường của tôi. Không có gì bằng việc ôm một cuốn sách hay.", image: "https://erado.vn/img/giuongbangiao3.jpg" },
    { id: "3", title: "Lựa chọn 3", description: "Trên một cái võng ngoài trời. Đọc sách dưới ánh nắng mặt trời thật kỳ diệu", image: "https://img.ltwebstatic.com/images3_spmp/2023/06/14/168672449587f012494e52cbe4384d58bd9b14c7b3_thumbnail_720x.webp" },
    { id: "4", title: "Lựa chọn 4", description: "Trên ghế sofa với một chiếc chăn và nhạc yêu thích của tôi phát trong nền.", image: "https://noithatxinh.vn/Images/Upload/images/thu-gian-voi-ghe-sofa-nam-doc-sach-noi-that-xinh-3.jpg" },
    { id: "5", title: "Lựa chọn 5", description: "Trong một căn phòng yên tĩnh với ánh sáng dịu nhẹ. Tôi muốn tập trung vào nội dung của sách.", image: "https://noithatmanhhe.vn/media/27634/toi-uu-anh-sang-tu-nhien-cho-phong-doc-sach.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "Trên một chiếc ghế đọc sách êm ái với một ly rượu hoặc sô-cô-la nóng. Tôi muốn tận hưởng không khí sang trọng và ấm cúng.", image: "https://sieuthinoithatnhatrang.com/upload/images/IMG_9701.jpg" },
];
const initialCards3 = [
    { id: "1", title: "Lựa chọn 1", description: "Ấm áp và thoải mái, như một cái ôm lớn..", image: "https://lh5.googleusercontent.com/Gbjy63YqPkNKz7p43v2EFaLAlsSHiAlyLo5zgM64uhV0gI0Lx7TCyZXJmYHU-_sXzVOThR9SsrzolQxFDqwyPaDbgMh9zq8z9eGE7XXaqNpc4jaNYYRdpVL3Hf3B26jxcLJnXy1MeaYrX4-F7w" },
    { id: "2", title: "Lựa chọn 2", description: "Căng thẳng, như thể tôi đang bị theo dõi..", image: "https://thoidai.com.vn/stores/news_dataimages/thuy.dang/052019/29/00/in_article/5711_poster.medium.jpg" },
    { id: "3", title: "Lựa chọn 3", description: "Hồi hộp, như thể tôi đã bước vào một thế giới mới và kỳ ảo.", image: "https://songhantourist.com/upload/articles-images/images/Kdokawa_from%20Kadokawa%20Culture%20Museum.jpeg" },
    { id: "4", title: "Lựa chọn 4", description: "Bình yên và thanh thản, như thể tôi đang ở một spa.", image: "https://c.wallhere.com/photos/15/95/Batman-95584.jpg!d" },
    { id: "5", title: "Lựa chọn 5", description: "Xúc động và cảm thông, như thể tôi đang sống cùng nhân vật trong sách..", image: "https://cdn.pixabay.com/photo/2016/11/22/19/25/adventure-1850178_960_720.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "Vui vẻ và hài hước, như thể tôi đang xem một bộ phim hài kịch.", image: "https://sieuthinoithatnhatrang.com/upload/images/IMG_9701.jpg" },
];
const initialCards4 = [
    { id: "1", title: "Lựa chọn 1", description: "Trà. Nó làm ấm trái tim tôi, giống như một cuốn sách.", image: "https://static.wixstatic.com/media/8cb37b_1c0229e4f35a4c03a71dfdacad6cd20f~mv2.png/v1/fill/w_1000,h_667,al_c,q_90,usm_0.66_1.00_0.01/8cb37b_1c0229e4f35a4c03a71dfdacad6cd20f~mv2.png" },
    { id: "2", title: "Lựa chọn 2", description: "Nước. Giữ cho cơ thể được cân bằng là quan trọng như việc đọc sách.", image: "https://bizweb.dktcdn.net/100/333/628/files/nuoc-sach-giau-khoang.jpg?v=1601260428010" },
    { id: "3", title: "Lựa chọn 3", description: "Không gì cả. Tôi không uống gì khi đọc sách.", image: "https://camnangchiase.com/wp-content/uploads/2019/03/doc-mot-cuon-sach-hay-cung-nhu-tro-chuyen-voi-mot-nguoi-ban-thong-minh-1.jpg" },
    { id: "4", title: "Lựa chọn 4", description: "Cà phê. Không có gì ngon hơn khi giữ cho tinh thần tỉnh táo.", image: "https://cdnphoto.dantri.com.vn/IHZKLBoQkaARsY6z5krd25u90Kk=/thumb_w/960/2021/03/05/ca-phe-va-sachdocx-1614934277784.jpeg" },
    { id: "5", title: "Lựa chọn 5", description: "Sinh tố hoặc nước ép trái cây. Tôi thích những thức uống tươi mát và bổ dưỡng.", image: "https://cdn.tgdd.vn/Files/2020/04/17/1249876/vua-dep-da-lai-con-giam-can-chi-voi-moi-ngay-1-ly-sinh-to-dua-chuot-va-yen-mach-202004172304225524.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "Rượu hoặc bia. Tôi thích những thức uống có tính chất xã giao và giải tỏa căng thẳng.", image: "https://images2.thanhnien.vn/uploaded/minhnguyet/2016_03_16/docsach_TCQJ.jpg?width=600" },
];
const initialCards5 = [
    { id: "1", title: "Lựa chọn 1", description: "Sách đơn lẻ. Không ràng buộc. Không hồi kết treo. Hoàn hảo.", image: "https://lh5.googleusercontent.com/Gbjy63YqPkNKz7p43v2EFaLAlsSHiAlyLo5zgM64uhV0gI0Lx7TCyZXJmYHU-_sXzVOThR9SsrzolQxFDqwyPaDbgMh9zq8z9eGE7XXaqNpc4jaNYYRdpVL3Hf3B26jxcLJnXy1MeaYrX4-F7w" },
    { id: "2", title: "Lựa chọn 2", description: "Cả hai. Tôi sẽ đọc bất cứ thứ gì nếu tôi thích thể loại hoặc tác giả..", image: "https://thoidai.com.vn/stores/news_dataimages/thuy.dang/052019/29/00/in_article/5711_poster.medium.jpg" },
    { id: "3", title: "Lựa chọn 3", description: "Sách theo loạt cũng được, nhưng tôi sẽ không đọc những cuốn sách có nhiều hơn 3 quyển.", image: "https://songhantourist.com/upload/articles-images/images/Kdokawa_from%20Kadokawa%20Culture%20Museum.jpeg" },
    { id: "4", title: "Lựa chọn 4", description: "Sách theo loạt. Tôi luôn biết nên đọc gì tiếp theo!", image: "https://c.wallhere.com/photos/15/95/Batman-95584.jpg!d" },
    { id: "5", title: "Lựa chọn 5", description: "Sách đơn lẻ kết hợp với nhau. Tôi thích những cuốn sách có cùng thế giới hoặc nhân vật nhưng không phụ thuộc vào nhau.", image: "https://cdn.pixabay.com/photo/2016/11/22/19/25/adventure-1850178_960_720.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "Sách theo loạt dài. Tôi thích những cuốn sách có nhiều chi tiết và phát triển sâu sắc..", image: "https://png.pngtree.com/background/20230319/original/pngtree-sci-fi-world-cityscape-background-picture-image_2151048.jpg" },
];
const initialCards6 = [
    { id: "1", title: "Lựa chọn 1", description: "The Chosen One. Hãy cho tôi tất cả các lời tiên tri và áp lực cứu thế giới.", image: "https://cdn0.fahasa.com/media/catalog/product/9/7/9781529330267.jpg" },
    { id: "2", title: "Lựa chọn 2", description: "Second Chance. Mọi nhân vật đều có tính cách mờ ám.", image: "https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_40424_thanh_ly_1.jpg" },
    { id: "3", title: "Lựa chọn 3", description: "Enemies to Lovers. Không gì bằng việc anh hùng yêu phản diện.", image: "https://salt.tikicdn.com/cache/280x280/ts/product/ee/c5/2f/275a60a6ad7b71b95e5dc8f4ddcc1efb.jpg" },
    { id: "4", title: "Lựa chọn 4", description: "One Bed. Ồ, những trò nghịch ngợm xảy ra khi có 2 người và 1 giường.", image: "https://cdn-amz.woka.io/images/I/71e1bko1zRL.jpg" },
    { id: "5", title: "Lựa chọn 5", description: "Friends To Lovers Tôi thích những câu chuyện về tình yêu từ tình bạn..", image: "https://m.media-amazon.com/images/I/41p+Ht3wVCL.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "Fantasy Becoming Reality Tôi thích những câu chuyện về những điều kỳ lạ xâm .", image: "https://m.media-amazon.com/images/I/31T9eCJUI6L._AC_UF894,1000_QL80_.jpg" },
];
const initialCards7 = [
    { id: "1", title: "Lựa chọn 1", description: "WandaVision hoặc Once Upon a Time", image: "https://lh5.googleusercontent.com/Gbjy63YqPkNKz7p43v2EFaLAlsSHiAlyLo5zgM64uhV0gI0Lx7TCyZXJmYHU-_sXzVOThR9SsrzolQxFDqwyPaDbgMh9zq8z9eGE7XXaqNpc4jaNYYRdpVL3Hf3B26jxcLJnXy1MeaYrX4-F7w" },
    { id: "2", title: "Lựa chọn 2", description: "Lost hoặc Stranger Things", image: "https://thoidai.com.vn/stores/news_dataimages/thuy.dang/052019/29/00/in_article/5711_poster.medium.jpg" },
    { id: "3", title: "Lựa chọn 3", description: "American Horror Story hoặc The Walking Dead", image: "https://songhantourist.com/upload/articles-images/images/Kdokawa_from%20Kadokawa%20Culture%20Museum.jpeg" },
    { id: "4", title: "Lựa chọn 4", description: "Friends hoặc Schitt’s Creek.", image: "https://c.wallhere.com/photos/15/95/Batman-95584.jpg!d" },
    { id: "5", title: "Lựa chọn 5", description: "The Crown hoặc The Queen’s Gambit.", image: "https://cdn.pixabay.com/photo/2016/11/22/19/25/adventure-1850178_960_720.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "The Mandalorian hoặc The Witcher", image: "https://images2.thanhnien.vn/uploaded/minhnguyet/2016_03_16/docsach_TCQJ.jpg?width=600" },
];
const initialCards8 = [
    { id: "1", title: "Lựa chọn 1", description: "Một bí ẩn. Tôi thích làm thám tử.", image: "https://sohanews.sohacdn.com/zoom/700_438/2019/7/23/death-15638468372881087338521-crop-1563846855105843971154.jpg" },
    { id: "2", title: "Lựa chọn 2", description: "Một tốc độ nhanh. Tôi muốn bị cuốn hút từ khi bắt đầu.", image: "https://vcdn-vnexpress.vnecdn.net/2022/10/14/-5293-1665717599.jpg" },
    { id: "3", title: "Lựa chọn 3", description: "Một tam giác tình yêu. Hãy cho tôi những con tàu hoặc cho tôi chết!", image: "https://www.blog.ezcareme.com/wp-content/uploads/2023/05/KHI-DIEN-THOAI-TRO-THANH-OXY-2.png" },
    { id: "4", title: "Lựa chọn 4", description: "Một bước ngoặt. Mọi thứ sẽ thú vị hơn khi không dự đoán được..", image: "https://media.istockphoto.com/id/1156894024/vi/anh/kh%C3%A1i-ni%E1%BB%87m-v%E1%BB%81-m%E1%BB%99t-b%C6%B0%E1%BB%9Bc-ngo%E1%BA%B7t-trong-cu%E1%BB%99c-s%E1%BB%91ng-b%C3%A0n-tay-bi%E1%BA%BFn-m%E1%BB%99t-kh%E1%BB%91i-l%E1%BA%ADp-ph%C6%B0%C6%A1ng-v%C3%A0-thay-%C4%91%E1%BB%95i-t%E1%BB%AB.jpg?s=1024x1024&w=is&k=20&c=crXjeHdv3qWAofeRLJb4S5h4jOn5zK87fL_RN09RfRc=" },
    { id: "5", title: "Lựa chọn 5", description: "Một thông điệp. Tôi muốn học được điều gì đó từ sách..", image: "https://marketingai.mediacdn.vn/zoom/700_438/wp-content/uploads/2017/04/thong-diep-truyen-thong.jpg" },
    { id: "6", title: "Lựa chọn 6", description: "Một kết thúc hài lòng. Tôi muốn cảm thấy hạnh phúc khi kết thúc sách.", image: "https://xabuon.com/uploads1/news/logopng1.png" },
];
const allCardSets = [initialCards, initialCards2, initialCards3, initialCards4, initialCards5,initialCards6,initialCards7,initialCards8];

const ProductRecommen = () => {
  const [currentCardSetIndex, setCurrentCardSetIndex] = useState(0);
  const [activeCardIds, setActiveCardIds] = useState([]);
  const [value, setValue] = useState(0);
  const {auth,setAuth} = useContext(AuthContext);
  const navigate = useNavigate()
  // const [items,setItems] = useContext(AuthItems)

  const toggleActive = (id) => {
    setValue(id);
    // Update the active state for the current set of cards
    const currentCards = allCardSets[currentCardSetIndex];
    const updatedCards = currentCards.map((card) =>
      card.id === id ? { ...card, isActive: true } : { ...card, isActive: false }
    );

    // // Update the current set of cards with the updated state
    allCardSets[currentCardSetIndex] = updatedCards;

    // // Update the active card IDs
    // setActiveCardIds((prevActiveCardIds) => {
    //   if (prevActiveCardIds.includes(id)) {
    //     return prevActiveCardIds.filter((activeId) => activeId !== id);
    //   } else {
    //     return [...prevActiveCardIds, id];
    //   }
    // });
    setActiveCardIds([...activeCardIds, id]);
    // if (activeCardIds.includes(id)) {
    //     // If it's in the array, remove it (toggle off)
    //     // setActiveCardIds(activeCardIds.filter((activeId) => activeId !== id));
    // } else {
    //     // If it's not in the array, add it (toggle on)
    //     setActiveCardIds([...activeCardIds, id]);
    // }
  };

  const handleNextClick = () => {
    // Increment the current card set index
    // setCurrentCardSetIndex((prevIndex) => (prevIndex + 1) % allCardSets.length);

    // // You can access the active card IDs here
    // console.log("Active Card IDs:", activeCardIds);
    if (activeCardIds.length === 0) {
        return; // Do nothing if no card is selected
    }
  
      // Increment the current card set index
    setCurrentCardSetIndex((prevIndex) => (prevIndex + 1) % allCardSets.length);
  };
  const handleBackClick = () => {
    // Decrement the current card set index
    setCurrentCardSetIndex((prevIndex) => (prevIndex - 1 + allCardSets.length) % allCardSets.length);
  };
  console.log([activeCardIds[0],activeCardIds[1],activeCardIds[2],activeCardIds[3],activeCardIds[4],activeCardIds[5],activeCardIds[6],activeCardIds[7]]);

// const checkout = () =>{
//   api.get(`/item/svmrecommendation`,{
//     ans:"123"
//   })
//   .then(function (res) {
//       console.log(res) 
//   })
//   .catch(function (res) {
//       console.log(res)
//   });
// }
const checkout = () => {
  api.post('/item/svmrecommendation',{
    ans:activeCardIds
  })
  .then(function (res) {
    console.log(res);
    const data = res.data.data
    let string = JSON.stringify(data)
    localStorage.setItem("key", string)
    // setItems(data)
    // setAuth(res.data.data)
    // console.log(auth);
    navigate('/suggest')
  })
  .catch(function (err) {
    console.error(err);
  });
};
  return (
    <div className={classes["container"]}>
      <h1>Chọn câu trả lời thích hợp với bạn</h1>
      <div className={classes['card-container']}>
        {allCardSets[currentCardSetIndex].map((card) => (
          <div
            key={card.id}
            className={`${classes.card} ${card.isActive ? classes.active : ''}`}
            onClick={() => toggleActive(card.id)}
          >
            <img src={card.image} alt={card.title} />
            <div className={classes['card-description']}>
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={classes['button-container']}>
        <button className={classes['back-button']} onClick={handleBackClick} disabled={currentCardSetIndex === 0}>Back</button>
        {currentCardSetIndex === allCardSets.length - 1 ? (
          <button className={classes['submit-button']} onClick={checkout}>Kết thúc trả lời</button>
        ) : (
          <button className={classes['next-button']} onClick={handleNextClick} disabled={activeCardIds.length === 0}>Next</button>
        )}
      </div>
    </div>
  );
};

export default ProductRecommen;