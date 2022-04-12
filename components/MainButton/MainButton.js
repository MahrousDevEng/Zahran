// Styles
import styles from "./MainButton.module.css";

const MainButton = (props) => {
  const { text = "", classes = "", bg = "main", onClick } = props;
  return (
    <button
      className={`${styles.btn} ${styles[bg]} ${classes}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default MainButton;
