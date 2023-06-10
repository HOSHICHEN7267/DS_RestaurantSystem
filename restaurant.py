from flask import Flask, request, Blueprint, request, jsonify, abort
import etcd3
import json
import time
from socket_handlers import socketio

etcd_client = etcd3.client(host='localhost', port=2379)

restaurant_blueprint = Blueprint('restaurant', __name__, template_folder='templates')

@restaurant_blueprint.route('/', methods=['GET'])
def route():
    return "Restaurant" 

@restaurant_blueprint.route('/orders/getall', methods=['GET'])
def lookup_order():
    order_datas = etcd_client.get_all()
    orders = []
    for order_data in order_datas:
        if order_data is not None and order_data[0] is not None:
            value_json = order_data[0]
            value = json.loads(value_json)
            print(value)
            order_items = value.get('order_items')
            status = value.get('status')

            # Calculate the total price of the order 
            total_price_all_foods = sum(item['total_price'] for item in order_items.values())

            order = {
                'order_id': value.get('order_id'),
                'table_number': value.get('table_number'),
                'status': status,
                'order_items': order_items,
                'total_price_all_foods': total_price_all_foods
            }

            orders.append(order);
            # Emit a socket event to send the initial order details to the frontend
            socketio.emit('order_details', {'order_id': value.get('order_id'), 'order': order}, namespace='/restaurant')

        return jsonify(orders), 200
        # return render_template("getOrder.html", ...)
    else:
        abort(404, f'Order not found')

@restaurant_blueprint.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    key = f"/orders/{order_id}"
    order_data = etcd_client.get(key)
    
    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        status = value.get('status')
        
        if status == "done":
            # Delete the order if it's in a deletable state
            etcd_client.delete(key)
            return jsonify({'message': f"Order with ID {order_id} deleted"}), 400
            # return render_template("deleteOrder.html", ...)
        else:
            abort(400, f"Order with ID {order_id} cannot be deleted. Status: {status}")
    else:
        abort(404, f"Order with ID {order_id} not found")

@restaurant_blueprint.route('/orders/<int:order_id>/done', methods=['POST'])
def mark_order_done(order_id):
    key = f"/orders/{order_id}"
    order_data = etcd_client.get(key)

    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        status = value.get('status')

        
        # Update the status to "done"
        value['status'] = "done"
        value_json = json.dumps(value)

        # Store the updated order data in etcd
        etcd_client.put(key, value_json)
        
        # Emit a socket event to inform the frontend about the status change
        socketio.emit('order_done', {'order_id': order_id, 'status': 'done'}, namespace='/restaurant')

        return jsonify({'message': f"Order with ID {order_id} marked as done"}), 200

    else:
        abort(404, f"Order with ID {order_id} not found")

@restaurant_blueprint.route('/orders/<int:order_id>/making', methods=['POST'])
def mark_order_making(order_id):
    key = f"/orders/{order_id}"
    order_data = etcd_client.get(key)

    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        status = value.get('status')

        if status == "pending":
            # Update the status to "making"
            value['status'] = "making"
            value_json = json.dumps(value)

            # Store the updated order data in etcd
            etcd_client.put(key, value_json)

            # Emit a socket event to inform the frontend about the status change
            socketio.emit('order_making', {'order_id': order_id, 'status': 'making'}, namespace='/restaurant')

            return jsonify({'message': f"Order with ID {order_id} marked as making"}), 200
        else:
            abort(400, f"Order with ID {order_id} cannot be marked as making. Status: {status}")
    else:
        abort(404, f"Order with ID {order_id} not found")

