import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link } from "react-router-dom";

import classes from "./WishButton.module.css";

const WishButton = (props) => {
  const { itemId } = props;
  
  return (
    <Link className={classes.btn}>
      <FavoriteIcon />
    </Link>
  );
};

export default WishButton;
