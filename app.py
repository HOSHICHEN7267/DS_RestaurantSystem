from flask import Flask
from customer import customer_blueprint

app = Flask(__name__)

# root
@app.route("/")
def index():
    return "Restaurant System"

# register blueprint
app.register_blueprint(customer_blueprint, url_prefix='/customer')


if __name__ == '__main__':
    app.run(debug=True)

