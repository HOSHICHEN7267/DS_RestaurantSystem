from flask import Flask, request, Blueprint, render_template
import etcd3
import json
import time

etcd_client = etcd3.client(host='localhost', port=2379)

customer_blueprint = Blueprint('customer', __name__, template_folder='templates')

@customer_blueprint.route('/', methods=['GET'])
def route():
    return "Customer"

@customer_blueprint.route('/test', methods=['GET'])
def test():
    etcd_client.put('bar', 'doot')
    result = etcd_client.get('bar')
    
    if result is not None:
        value = result[0]
        return value.decode()  # Convert the value to a string
        
    return "Value not found"

@customer_blueprint.route('/orders', methods=['POST'])
def create_order():
    table_number = request.form.get('table_number')
    status = "pending"  # Set initial status as "pending"

    # Generate a unique order_id (you can use any preferred method for this)
    order_id = generate_order_id()

    # Get the list of foods from the request form
    foods = request.form.getlist('foods')

    key = f"/orders/{order_id}"
    value = {
        'table_number': table_number,
        'status': status,
        'foods': foods
    }

    # Convert the value dictionary to a JSON string
    value_json = json.dumps(value)

    # Store the order data in etcd
    etcd_client.put(key, value_json)

    return f"Order created with ID: {order_id}"

@customer_blueprint.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    key = f"/orders/{order_id}"
    order_data = etcd_client.get(key)
    
    if order_data is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        order = {
            'order_id': order_id,
            'table_number': value.get('table_number'),
            'status': value.get('status'),
            'foods': value.get('foods')
        }
        return json.dumps(order)
    else:
        return f"Order with ID {order_id} not found"

@customer_blueprint.route('/orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    key = f"/orders/{order_id}"
    order_data = etcd_client.get(key)
    
    if order_data is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        status = value.get('status')
        
        if status == "pending":
            # Delete the order if it's in a deletable state
            etcd_client.delete(key)
            return f"Order with ID {order_id} deleted"
        else:
            return f"Order with ID {order_id} cannot be deleted. Status: {status}"
    else:
        return f"Order with ID {order_id} not found"

def generate_order_id():
    timestamp = int(time.time() * 1000)  # Multiply by 1000 to get milliseconds
    order_id = str(timestamp)
    return order_id
