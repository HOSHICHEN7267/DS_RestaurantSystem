from flask_socketio import SocketIO

socketio = SocketIO(cors_allowed_origins="*")

@socketio.on('connect', namespace='/customer')
def handle_connect():
    print('SocketIO connected')

@socketio.on('order_created', namespace='/customer')
def handle_order_created(data):
    print('Order created:', data)

@socketio.on('order_details', namespace='/customer')
def handle_order_details(data):
    print('Order details:', data) 
