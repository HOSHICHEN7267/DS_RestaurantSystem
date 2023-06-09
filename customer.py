from flask import Flask, request, Blueprint, request, jsonify, abort
import etcd3
import json
import time
from socket_handlers import socketio

etcd_client = etcd3.client(host='localhost', port=2379)

customer_blueprint = Blueprint('customer', __name__, template_folder='templates')

@customer_blueprint.route('/', methods=['GET'])
def route():
    return "Customer"
    
@customer_blueprint.route('/orders', methods=['POST'])
def create_order():
    data = request.get_json()  # Get the JSON data from the request

    # Extract the required fields from the JSON data
    table_number = data.get('table_number')
    foods = data.get('foods')

    if not table_number or not foods:
        abort(400, "Invalid request data. Missing table_number or foods.")

    status = "pending"  # Set initial status as "pending"
    order_id = generate_order_id()  # Generate a unique order_id

    key = f"/orders/{order_id}"
    order_items = {}

    for food in foods:
        food_name = food.get('name')
        food_price = food.get('price')
        food_quantity = food.get('quantity')

        if food_name not in order_items:
            order_items[food_name] = {
                'price': food_price,
                'quantity': food_quantity,
                'total_price': food_price * food_quantity
            }
        else:
            order_items[food_name]['quantity'] += food_quantity
            order_items[food_name]['total_price'] += food_price * food_quantity

    value = {
        'table_number': table_number,
        'status': status,
        'order_items': order_items
    }

    # Convert the value dictionary to a JSON string
    value_json = json.dumps(value)

    # Store the order data in etcd
    etcd_client.put(key, value_json)
    
    # After storing the order, emit a socket event to inform the frontend
    socketio.emit('order_created', {'order_id': order_id, 'status': status}, namespace='/customer')

    return jsonify({'message': f'Order created with ID: {order_id}'}), 200


@customer_blueprint.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    key = f"/orders/{order_id}"
    order_data = etcd_client.get(key)

    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        order_items = value.get('order_items')
        status = value.get('status')

        # Calculate the total price of the order
        total_price_all_foods = sum(item['total_price'] for item in order_items.values())

        order = {
            'order_id': order_id,
            'table_number': value.get('table_number'),
            'status': status,
            'order_items': order_items,
            'total_price_all_foods': total_price_all_foods
        }

        # Emit a socket event to send the initial order details to the frontend
        socketio.emit('order_details', {'order_id': order_id, 'order': order}, namespace='/customer')

        if status != 'done':
            while True:
                # Sleep for a specified interval (e.g., 5 seconds) before checking the order status again
                time.sleep(5)

                # Retrieve the latest order data
                order_data = etcd_client.get(key)

                if order_data is not None and order_data[0] is not None:
                    value_json = order_data[0]
                    value = json.loads(value_json)
                    new_status = value.get('status')

                    if new_status != status:
                        # Update the order status and emit a socket event
                        status = new_status
                        order['status'] = status
                        socketio.emit('order_details', {'order_id': order_id, 'order': order}, namespace='/customer')

                    if status == 'done':
                        break

        return jsonify(order), 200
    else:
        abort(404, f'Order with ID {order_id} not found')


@customer_blueprint.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    key = f"/orders/{order_id}"
    order_data = etcd_client.get(key)
    
    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        status = value.get('status')
        
        if status == "pending":
            # Delete the order if it's in a deletable state
            etcd_client.delete(key)
            return jsonify({'message': f"Order with ID {order_id} deleted"}), 400
        else:
            abort(400, f"Order with ID {order_id} cannot be deleted. Status: {status}")
    else:
        abort(404, f"Order with ID {order_id} not found")

def generate_order_id():
    timestamp = int(time.time() * 1000)  # Multiply by 1000 to get milliseconds
    order_id = str(timestamp)
    return order_id

'''............ Test ...........'''
@customer_blueprint.route('/orders/<int:order_id>/done', methods=['POST'])
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
        socketio.emit('order_done', {'order_id': order_id, 'status': 'done'}, namespace='/customer')

        return jsonify({'message': f"Order with ID {order_id} marked as done"}), 200

    else:
        abort(404, f"Order with ID {order_id} not found")

@customer_blueprint.route('/orders/<int:order_id>/making', methods=['POST'])
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
            socketio.emit('order_making', {'order_id': order_id, 'status': 'making'}, namespace='/customer')

            return jsonify({'message': f"Order with ID {order_id} marked as making"}), 200
        else:
            abort(400, f"Order with ID {order_id} cannot be marked as making. Status: {status}")
    else:
        abort(404, f"Order with ID {order_id} not found")

