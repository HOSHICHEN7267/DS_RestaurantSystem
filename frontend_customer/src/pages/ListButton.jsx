import React, { useState } from 'react';
import styles from "./CustomerEnd.module.css";

function ListButton() {
  const [state, setState] = useState("order");
  const url = "http://127.0.0.1:5000/customer/orders"; // url to fetch
  let orderID = ""; // the ID returned by etcd

  // a fake order
  const order = {
    table_number: 5,
    foods: [
      {
        name: "karaagedon",
        price: 120,
        quantity: 2
      },
      {
        name: "porkdon",
        price: 160,
        quantity: 1
      },
      {
        name: "katsudon",
        price: 130,
        quantity: 3
      },
    ]
  };

  const orderButton = () => {
    // create an order
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    })
      .then(response => response.json())
      .then(data => {
        console.log('POST 請求成功:', data); // should save id to orderID here
      })
      .catch(error => {
        console.error('發生錯誤:', error);
      });

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
