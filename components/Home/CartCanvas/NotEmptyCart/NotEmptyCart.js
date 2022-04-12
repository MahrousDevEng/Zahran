// Components
import Link from "next/link";
import CartItem from "../../../CartItem/CartItem";
import MainLink from "../../../MainLink/MainLink";
// Styles
import styles from "./NotEmptyCart.module.css";

const taxes = "14%";

const NotEmptyCart = ({ cart }) => {
  const calcPrice = () => {
    const subTotal = cart.reduce((prev, current) => {
      return (
        prev +
        parseFloat(current.defaultPrice) *
          (1 - parseInt(current.discount) / 100) *
          current.quantity
      );
    }, 0);

    const taxesValue = subTotal * (parseInt(taxes) / 100);

    const total = parseFloat(subTotal) + taxesValue;

    return {
      subTotal: subTotal.toFixed(2),
      taxes: taxesValue.toFixed(2),
      total: total.toFixed(2),
    };
  };

  return (
    <div>
      <ul className={`${styles["cart-item-container"]} list-unstyled mb-0 p-2`}>
        {cart?.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="mt-3">
        <div className="d-flex justify-content-between">
          <span className="fw-light">Subtotal</span>
          <span className="fw-light">{calcPrice().subTotal} EGP</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="fw-light">Tax</span>
          <span className="fw-light">{calcPrice().taxes} EGP</span>
        </div>
        <hr className="divider my-2"></hr>
        <div className="d-flex justify-content-between mb-3">
          <span className="fs-5 fw-bold">Total</span>
          <span className="fs-5 fw-bold">{calcPrice().total} EGP</span>
        </div>
        <div className="options row mx-0 g-0">
          <div className="col-12 mb-2">
            <MainLink to="/" text="proceed to checkout" color="main" />
          </div>
          <div className="col-12 text-center">
            <Link href="/">
              <a className={styles.show}>view your cart</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotEmptyCart;
