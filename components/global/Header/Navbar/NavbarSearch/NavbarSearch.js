// Main Imports
import { useState, useEffect, useRef } from "react";
import Select from "react-dropdown-select";
import { useForm } from "react-hook-form";
import Link from "next/link";
import useStopPropagation from "../../../../helpers/useStopPropagation";
// Styles
import styles from "./NavbarSearch.module.css";
// Icons
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// redux
import { useSelector } from "react-redux";
// Data
import selectOptions from "../../../../../data/selectOptios/selectOptios.json";
import selectOptionsAR from "../../../../../data/selectOptios/selectOptiosAR.json";
import { searchFuse } from "../../../../helpers/searchFuse";

const NavbarSearch = () => {
  const { lang } = useSelector((state) => state.shared);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [query, setQuery] = useState(null);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (typeof query === "string" || query instanceof String) {
      const timeOutId = setTimeout(() => {
        const results = searchFuse.search(query);
        setFilteredResults(results);
      }, 1000);
      return () => clearTimeout(timeOutId);
    }
  }, [query]);

  const wrapperRef = useRef(null);

  useStopPropagation(wrapperRef, () => {
    setShowSearchDropdown(false);
  });

  const searchChange = (e) => {
    setQuery(e.target.value);
    setShowSearchDropdown(true);
  };

  const onSubmit = () => {
    console.log("Search Submit");
  };

  const defaultValue =
    lang === "en"
      ? selectOptions.filter((el) => el.value === "all")
      : selectOptionsAR.filter((el) => el.value === "all");

  const customContentRenderer = ({ props, state }) =>
    state.values.length === 0 ? (
      <div className="w-100 mx-1 text-center">
        {lang === "en" ? "Select" : "اختار"}
      </div>
    ) : state.values.length === 1 ? (
      <div className="w-100 mx-1 text-center">{state.values[0].label}</div>
    ) : (
      <div className="w-100 mx-1 text-center">
        {state.values.length} {lang === "en" ? "Items" : "فئات"}
      </div>
    );

  return (
    <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group" ref={wrapperRef}>
        <Select
          options={lang === "en" ? selectOptions : selectOptionsAR}
          className="custom-select"
          separator
          multi
          direction={lang === "en" ? "ltr" : "rtl"}
          values={defaultValue}
          contentRenderer={customContentRenderer}
          onChange={(values) => setCategoryOptions(values)}
        />
        <input
          type="text"
          placeholder={
            lang === "en" ? "What are you looking for?" : "ما الذى تبحث عنه؟"
          }
          aria-label="What are you looking for?"
          aria-describedby="search"
          name="search"
          ref={register}
          onChange={searchChange}
        />
        {showSearchDropdown && filteredResults.length !== 0 && (
          <ul className={styles["search-results"]}>
            {filteredResults?.map((result) => (
              <li key={result.item.id}>
                <Link href="/">
                  <a>
                    {result.item.title} in{" "}
                    <span className="text-muted">{result.item.category}</span>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <span className={styles.icon} id="search">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    </form>
  );
};

export default NavbarSearch;
