# Restaurant Ordering System

## System description
Using **ETCD** as the backend database, and **React** and **Flask** for the front-end and back-end respectively, implement a complete online ordering system.  
Customers can order online on the “Ordering Page”, and the order information will be stored in ETCD. 
The kitchen “Receiving Page” will get the order information from the database and start making the dishes, and the order status will be fed back to the “Ordering Page”.

## System functions
### Ordering Page（customer）
* Create the order
* Cancel the order
* Check the status of order（making、finished）
### Receiving Page（kitchen）
* Accept the order
* Complete the order
* Update the status of each order（accepted、making、finished）
### ETCD（database）
* Store the orders（by key-value form）
* Using Raft to solve Consistency/Partition Tolerable
* Multiple nodes support high availability

## Active Diagram
![image](https://github.com/HOSHICHEN7267/DS_RestaurantSystem/blob/master/image/Active%20Diagram.png)

## Sequence Diagram
![image](https://github.com/HOSHICHEN7267/DS_RestaurantSystem/blob/master/image/Sequence%20Diagram.png)

## Links
[Demo video](https://youtu.be/513C4WNDiVs)  
[Presentation PowerPoint](https://github.com/HOSHICHEN7267/DS_RestaurantSystem/blob/master/Introduction%20of%20Restaurant%20System.pdf)

