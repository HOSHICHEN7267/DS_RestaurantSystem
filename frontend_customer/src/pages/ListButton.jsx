import React, { useState } from 'react';
import styles from "./CustomerEnd.module.css";
import io from 'socket.io-client';

function ListButton(props) {
  const [state, setState] = useState("order");
  const [orderID, setOrderID] = useState("");
  //const [text, setText] = useState("");
  const url = "http://127.0.0.1:5000/customer/orders"; // url to fetch
  const socket = io('http://127.0.0.1:5000/customer');

  let message = ""; // the message returned by etcd

  const dishes = props.dishes;

  const order = {
    table_number: 5,
    foods: dishes
  };

  socket.on('order_details', function(data) {
    //console.log("Order details: " + JSON.stringify(data));
    console.log("data: " + JSON.stringify(data));
    if(data.order_id == orderID){
      if(data.status == "making"){
        setState("preparing");
      }
      else if(data.status == "done"){
        setState("order");
        order.foods.forEach(food => {
          food.quantity = 0;
          food.price = 0;
        });
      }
    }
  });

  const orderButton = () => {
    order.foods = order.foods.filter(food => food.quantity !== 0); // if food quantity == 0 then delete
    console.log("order: " + JSON.stringify(order));
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
        console.log('POST 請求成功:', data);
        message = data.message;
        setOrderID(message.substring(23));
      })
      .catch(error => {
        console.error('發生錯誤:', error);
      });

    setState("cancel");
  };

  const cancelButton = () => {
    // cancel an order
    console.log("orderID: " + orderID);
    let idUrl = url + "/" + orderID;
    console.log("idUrl: " + idUrl);
    fetch(idUrl, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('DELETE 請求成功:', data); // should save id to orderID here
      })
      .catch(error => {
        console.error('發生錯誤:', error);
      });

    setState("order");
  };

  const preparingButton = () => {
    // wait for signal from etcd to call this function
    console.log("Preparing");
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
