var order_state = ["pending", "making", "done"];
export var order_table = [];
var max_ordernum = 0;
const transformOrderData = (fetchedData) => {
  order_table[max_ordernum] = fetchedData.map((order) => ({
    order_num: order.order_id,
    total: order.total_price_all_foods,
    order_state: order_state[order.status],
    table: Object.values(order.order_items).map((item) => ({
      name: item.name,
      amount: `x${item.quantity}`,
      price: `NT ${item.price}`,
    })),
  }));
  max_ordernum = max_ordernum + 1;
};

const url = `http://127.0.0.1:5000/restaurant/l_orders/${max_ordernum}/GET`;
const fetchOrderData = () => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      transformOrderData(data);
      // Use the transformed data as needed
    })
    .catch((error) => {
      console.error(error);
    });
};

// Fetch data initially
fetchOrderData();

// Fetch data every 5 seconds
setInterval(fetchOrderData, 5000);

// import axios from 'axios';
// var max_ordernum = 0;

// // 查找订单
// export const lookupOrder = async (max_ordernum) => {
//   try {
//     const response = await axios.get(`/l_orders/${max_ordernum + 1}`); // 替换为实际的后端 GET 请求地址
//     const order = response.data;

//     // 处理后端数据
// const order_table = orders.map(order => ({
//   order_num: order.order_id,
//   total: order.total_price_all_foods,
//   order_state: order_state[order.status],
//   table: Object.values(order.order_items).map(item => ({
//     name: item.name,
//     amount: `x${item.amount}`,
//     price: item.price
//   }))
// }));

//     max_ordernum = max_ordernum + 1;
//     return order;
//   } catch (error) {
//     throw error;
//   }
// };

// // 示例调用
// fetchBackendData();
// updateOrderState(1, 'check');

// export var order_table = [
//   {order_num: 1, total: "800", order_state: order_state[1], table: [
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//     {name: "原動力炸激動激動", amount: "x3", price: "NT 300"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//   ]},
//   {order_num: 2, total: "850", order_state: order_state[1], table: [
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//     {name: "原動力炸激動激動", amount: "x3", price: "NT 300"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//   ]},
//   {order_num: 3, total: "500", order_state: order_state[1], table: [
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//   ]},
//   {order_num: 4, total: "650", order_state: order_state[0], table: [
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//     {name: "原動力炸激動激動", amount: "x3", price: "NT 300"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//   ]},
//   {order_num: 5, total: "950", order_state: order_state[0], table: [
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//     {name: "原動力炸激動激動", amount: "x3", price: "NT 300"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//     {name: "原動力炸激動激動", amount: "x3", price: "NT 300"},
//   ]},
//   {order_num: 6, total: "850", order_state: order_state[0], table: [
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//     {name: "原動力炸激動激動", amount: "x3", price: "NT 300"},
//     {name: "哈哈原動力炸激動", amount: "x1", price: "NT 150"},
//     {name: "原動力炸激動激動", amount: "x2", price: "NT 200"},
//   ]},
// ]
