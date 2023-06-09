import React, { useState } from 'react';
import styles from "./CustomerEnd.module.css";

function ListButton() {
  const [state, setState] = useState("order");

  const orderButton = () => {
    // create an order
    setState("cancel");
  };

  const cancelButton = () => {
    // cancel an order
    setState("preparing");
  };

  const preparingButton = () => {
    // wait for signal from etcd to call this function
    setState("order");
  };

  switch (state) {
    case "order":
      return (
        <button className={styles.orderButton} onClick={orderButton}>
            <div className={styles.description}>確認送出</div>
        </button>
      );
    case "cancel":
      return (
        <button className={styles.cancelButton} onClick={cancelButton}>
            <div className={styles.description}>取消訂單</div>
        </button>
      );
    case "preparing":
      return (
        <button className={styles.preparingButton} onClick={preparingButton}>
            <div className={styles.description}>製作中</div>
        </button>
      );
  }
  
}

export default ListButton;
