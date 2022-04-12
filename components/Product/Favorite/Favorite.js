// Styles
import styles from "./Favorite.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faStrokeHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Favorite = (props) => {
  const { addToFav, handleAddToFav, position = "end" } = props;

  return (
    <button
      className={`${styles.fav} ${styles[position]}`}
      onClick={handleAddToFav}
    >
      {addToFav ? (
        <FontAwesomeIcon icon={faHeart} className={styles.main} />
      ) : (
        <FontAwesomeIcon icon={faStrokeHeart} className={styles.alt} />
      )}
    </button>
  );
};

export default Favorite;
