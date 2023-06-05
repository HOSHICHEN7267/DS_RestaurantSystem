from flask import Flask
from customer import customer_blueprint
from restaurant import restaurant_blueprint

app = Flask(__name__)

# root
@app.route("/")
def index():
    return "Restaurant System"

# register blueprint
app.register_blueprint(customer_blueprint, url_prefix='/customer')
app.register_blueprint(restaurant_blueprint, url_prefix='/restaurant')


if __name__ == '__main__':
    app.run(debug=True)

