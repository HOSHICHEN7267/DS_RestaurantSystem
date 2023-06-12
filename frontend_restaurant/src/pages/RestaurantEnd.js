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
        // // delay for 10 sec, or to get the order.status === "done"
        // setTimeout(() => {
        //   console.log("delete after 10 seconds")
        // }, 10000);
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
    var isFetching = false; // 追蹤請求是否正在進行中

    var fetchOrderData = () => {
      if (isFetching) {
        return; // 如果已經有請求正在進行中，則不執行新的請求
      }

      isFetching = true; // 設置請求狀態為進行中

      var url = `http://127.0.0.1:5000/restaurant/orders/${max_ordernum}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.status);
          }
          return response.json();
        })
        .then((data) => {
          max_ordernum = max_ordernum + 1;
          transformOrderData(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          isFetching = false; // 請求完成後重置請求狀態
        });
    }
    
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

    };

    const intervalId = setInterval(fetchOrderData, 5000);
    

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

// // for order_table to delete an order
// var deleteOrder = (order) => {
//     var index = order_table.indexOf(order); // Find the index of the element
//     if (index > -1) {
//         order_table.splice(index, 1); // Remove the element using splice
//     }
// };
