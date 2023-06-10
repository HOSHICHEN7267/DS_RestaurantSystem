import { useState, useEffect } from "react";
import styles from "./RestaurantEnd.module.css";
import { order_table } from "./data.js";

const RestaurantEnd = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(order_table);
  let message = ""; // the message returned by etcd


  const openOrderDetail = (orderNum) => {
    const order = orders.find((order) => order.order_num === orderNum);
    setSelectedOrder(order);
  };

  // const closeOrderDetail = () => {
  //   setSelectedOrder(null);
  // };

  const acbutton = (order) => {
    order.order_state = "making";
    updateOrderState(order.order_num, "making");
  };

  const fnbutton = (order) => {
    order.order_state = "done";
    updateOrderState(order.order_num, "done"); // Update order_table
    setOrders(orders.filter((ord) => ord.order_num !== order.order_num)); // Remove the completed order from orders state
    setSelectedOrder(null); // Reset selectedOrder state
    const url = `http://127.0.0.1:5000/restaurant/orders/${order.order_num}/done`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order_id: order.order_num }) // Pass the order ID in the request body
    })
    const durl = `http://127.0.0.1:5000/restaurant/d_orders/${order.order_num}`;
    fetch(durl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order_id: order.order_num }) // Pass the order ID in the request body
    })
  };

  const updateOrderState = (orderNum, newState) => {
    const updatedOrders = orders.map((order) => {
      if (order.order_num === orderNum) {
        return { ...order, order_state: newState };
      }
      return order;
    });
    setOrders(updatedOrders);
    const url = `http://127.0.0.1:5000/restaurant/orders/${orderNum}/making`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ order_id: orderNum }) // Pass the order ID in the request body
    })
  };

  useEffect(() => {
    setOrders(order_table);
  }, [order_table]);

  return (
    <div className={styles.restaurantEnd}>
      <div className={styles.topBar}>
        <img className={styles.yuandonli1Icon} alt="" src="/yuandonli-1@2x.png" />
      </div>
      <div className={styles.left}>
        {orders.map((order) => (
          <div
            className={styles.order}
            onClick={() => openOrderDetail(order.order_num)}
            key={order.order_num}
          >
            <div className={styles.no}>訂單編號 {order.order_num}</div>
            <div className={styles.nt}>NT. {order.total}</div>
            {order.order_state === "making" && (
              <img className={styles.checkIcon} alt="" src="/check.svg" />
            )}
          </div>
        ))}
      </div>

      <div className={styles.right}>
        {selectedOrder && (
          <div className={styles.orderDetail}>
            <div className={styles.content}>
              <div className={styles.orderNo}>訂單編號 {selectedOrder.order_num}</div>
              <div className={styles.detail}>
                {selectedOrder.table.map((item, index) => (
                  <div className={styles.item} key={index}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.amount}>{item.amount}</div>
                    <div className={styles.price}>{item.price}</div>
                  </div>
                ))}
              </div>
              <div className={styles.total}>合計： {selectedOrder.total}</div>
            </div>
            {selectedOrder.order_state === "pending" ? (
              <button className={styles.acButton} onClick={() => acbutton(selectedOrder)}>
                <div className={styles.buttonText}>接受訂單</div>
              </button>
            ) : (
              <button className={styles.fnButton} onClick={() => fnbutton(selectedOrder)}>
                <div className={styles.buttonText}>完成訂單</div>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantEnd;
