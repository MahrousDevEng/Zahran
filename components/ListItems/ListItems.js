// Main Imports
import { useState } from "react";
// Components
import CustomAccordion, {
  AccordionItem,
} from "../CustomAccordion/CustomAccordion";
// Styles
import styles from "./ListItems.module.css";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const ListItems = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const subIcon = isOpen ? (
    <FontAwesomeIcon icon={faMinus} />
  ) : (
    <FontAwesomeIcon icon={faPlus} />
  );

  return (
    <ul className={styles.parent}>
      {categories?.map((mainCat) => {
        if (Object.keys(mainCat).includes("subCategories")) {
          return (
            <CustomAccordion flush key={mainCat.id}>
              <AccordionItem
                eventKey={mainCat.id}
                header={mainCat.title}
                iconPosition="start"
                icon={subIcon}
                onClick={() => setIsOpen((prev) => !prev)}
                className="sub"
              >
                <ul className={styles.parent}>
                  {mainCat?.subCategories?.map((subCat) => (
                    <li key={subCat.id}>
                      <a href="#">{subCat.title}</a>
                    </li>
                  ))}
                </ul>
              </AccordionItem>
            </CustomAccordion>
          );
        }
        return (
          <li key={mainCat.id}>
            <a href="#">{mainCat.title}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default ListItems;
