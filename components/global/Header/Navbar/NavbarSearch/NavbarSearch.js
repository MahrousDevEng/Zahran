// Styles
import styles from "./NavbarSearch.module.css";
// Icons
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// redux
import { useSelector } from "react-redux";

const NavbarSearch = () => {
  const { lang } = useSelector((state) => state.shared);

  return (
    <form className={styles.search}>
      <div className="input-group">
        <input
          type="text"
          placeholder={
            lang === "en" ? "What are you looking for?" : "ما الذى تبحث عنه؟"
          }
          aria-label="What are you looking for?"
          aria-describedby="search"
        />
        <span className={styles.icon} id="search">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </form>
  );
};

export default NavbarSearch;
