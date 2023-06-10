from flask import Flask
from flask_cors import CORS
from customer import customer_blueprint
from restaurant import restaurant_blueprint
from socket_handlers import socketio

app = Flask(__name__)
CORS(app)

# Import and register the blueprints
app.register_blueprint(customer_blueprint, url_prefix='/customer')
app.register_blueprint(restaurant_blueprint, url_prefix='/restaurant')

# Initialize SocketIO
socketio.init_app(app) 

if __name__ == '__main__':
    app.run(debug=True)
