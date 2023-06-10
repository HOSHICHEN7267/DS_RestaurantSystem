import { useState, useEffect } from "react";
import styles from "./RestaurantEnd.module.css";

var order_table = [];
var max_ordernum = 1;

const RestaurantEnd = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(order_table);

  const openOrderDetail = (orderNum) => {
    const order = orders.find((order) => order.order_num === orderNum);
    setSelectedOrder(order);
  };

  const closeOrderDetail = () => {
    setSelectedOrder(null);
  };

  const acbutton = (order) => {
    order.status = "making";
    updateOrderState(order.order_num, "making");
  };

  const fnbutton = (order) => {
    order.status = "done";
    setOrders(orders.filter((ord) => ord.order_num !== order.order_num)); // Remove the completed order from orders state
    setSelectedOrder(null); // Reset selectedOrder state
  
    const url = `http://127.0.0.1:5000/restaurant/orders/${order.order_num}/done`;
    const durl = `http://127.0.0.1:5000/restaurant/orders/${order.order_num}`;
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(() => {
        return fetch(durl, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        });
      })
      .then(() => {
        console.log(order_table);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  const updateOrderState = (orderNum, newState) => {
    const updatedOrders = orders.map((order) => {
      if (order.order_num === orderNum) {
        return { ...order, status: newState };
      }
      return order;
    });
    setOrders(updatedOrders);
    const url = `http://127.0.0.1:5000/restaurant/orders/${orderNum}/${newState}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  };

  useEffect(() => {
    var fetchOrderData = () => {
      var url = `http://127.0.0.1:5000/restaurant/orders/${max_ordernum}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          transformOrderData(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    const transformOrderData = (fetchedData) => {
      var table = [];
      for (var itemName in fetchedData.order_items) {
        var item = fetchedData.order_items[itemName];
        var newItem = {
          name: itemName,
          quantity: "x" + item.quantity,
          price: "NT " + item.total_price,
        };
        table.push(newItem);
      }
  
      const newOrder = {
        order_num: fetchedData.order_id,
        total_price_all_foods: fetchedData.total_price_all_foods,
        status: fetchedData.status,
        table: table,
      };
  
      setOrders((prevOrders) => [...prevOrders, newOrder]);
  
      
      max_ordernum = max_ordernum + 1;
    };

    const intervalId = setInterval(fetchOrderData, 5000);
    fetchOrderData();
  
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
            <div className={styles.nt}>NT. {order.total_price_all_foods}</div>
            {order.status === "making" && (
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
                    <div className={styles.amount}>{item.quantity}</div>
                    <div className={styles.price}>{item.price}</div>
                  </div>
                ))}
              </div>
              <div className={styles.total}>合計： {selectedOrder.total_price_all_foods}</div>
            </div>
            {selectedOrder.status === "pending" ? (
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


