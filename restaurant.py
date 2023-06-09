from flask import request, Blueprint, render_template, request, jsonify, abort
from flask_socketio import SocketIO 
import etcd3
import json
import time

app = Flask(__name__)
socketio = SocketIO(app)

etcd_client = etcd3.client(host='localhost', port=2379)

restaurant_blueprint = Blueprint('restaurant', __name__, template_folder='templates')

@restaurant_blueprint.route('/', methods=['GET'])
def route():
    return "Restaurant"
    # return render_template("customer.html", emp=emp)
    
@restaurant_blueprint.route('/u_orders/<int:order_id>', methods=['POST'])
def update_order(order_id):
    key = f"/l_orders/{order_id}"
    order_data = etcd_client.get(key)

    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        order_items = value.get('order_items')
        status = 'done'


        # Calculate the total price of the order
        total_price_all_foods = sum(item['total_price'] for item in order_items.values())

        order = {
            'order_id': order_id,
            'table_number': value.get('table_number'),
            'status': status,
            'order_items': order_items,
            'total_price_all_foods': total_price_all_foods
        }
        etcd_client.put(key, order)

        socketio.emit('order_update', {'order_id': order_id, 'order': order}, namespace='/restuarant')

        return jsonify(order), 200
        # return render_template("getOrder.html", ...)
    else:
        abort(404, f'Order with ID {order_id} not found')



@restaurant_blueprint.route('/l_orders/<int:order_id>', methods=['GET'])
def lookup_order(order_id):
    key = f"/l_orders/{order_id}"
    order_data = etcd_client.get(key)

    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        order_items = value.get('order_items')

        # Calculate the total price of the order
        total_price_all_foods = sum(item['total_price'] for item in order_items.values())

        order = {
            'order_id': order_id,
            'table_number': value.get('table_number'),
            'status': value.get('status'),
            'order_items': order_items,
            'total_price_all_foods': total_price_all_foods
        }
        socketio.emit('order_details', {'order_id': order_id, 'order': order}, namespace='/restuarant')

        return jsonify(order), 200
        # return render_template("getOrder.html", ...)
    else:
        abort(404, f'Order with ID {order_id} not found')

@restaurant_blueprint.route('/d_orders/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    key = f"/d_orders/{order_id}"
    order_data = etcd_client.get(key)
    
    if order_data is not None and order_data[0] is not None:
        value_json = order_data[0]
        value = json.loads(value_json)
        status = value.get('status')
        
        if status == "pending":
            # Delete the order if it's in a deletable state
            etcd_client.delete(key)
            return jsonify({'message': f"Order with ID {order_id} deleted"}), 400
            # return render_template("deleteOrder.html", ...)
        else:
            abort(400, f"Order with ID {order_id} cannot be deleted. Status: {status}")
    else:
        abort(404, f"Order with ID {order_id} not found")

