from flask import Flask, request, jsonify
from werkzeug.security import check_password_hash
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

users = {
    'user1': {
        'username': 'user1',
        'password_hash': 'hash_of_the_password'
    }
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    user = users.get(username)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if not check_password_hash(user['password_hash'], password):
        return jsonify({'message': 'Incorrect password'}), 401
    return jsonify({'message': "Login successful"}), 200

#Mock Database. More logic to come

inventory_database = {
    "1": {"name": "product", "quantity": 100},
    "2": {"name": "item", "quantity": 50},

}


#Here we need to set the reorder minimum amount

minimum_amount = 20
reorder_amount = 50

class Inventory(Resource):
    def get(self, product_id):

        #Let's now fetch the current inventory level of a particular product

        if product_id in inventory_database:
            return inventory_database[product_id], 200
        else:
            return{"error": "Your product has not been found"}, 404

    def put(self, product_id):
        #Update the inventory level of a particular product

        data = request.get_json()
        quantity = data.getr('quantity, 0')

        if product_id in inventory_database:
            inventory_database[product_id]['quantity'] += quantity

            #Next we need to check if the reorder is necessary

            if inventory_database[product_id['quantity']]< minimum_amount:
                self.place_reorder(product_id)

            return inventory_database[product_id], 200
        else:
            return {"error": "Sorry, your product was not found"}, 404


    @staticmethod
    def create_reorder(product_id):

        #Place a reorder for a product
        if product_id in inventory_database:
            inventory_database[product_id]['quantity'] += minimum_amount
            print(f"Reorder has been placed for {inventory_database[product_id]['name']}. New quantity: {inventory_database[product_id]['quantity']}")
        else:
            print("Error: The system was unable to place the reorder. The product entered was not found.")

api.add_resource(Inventory, '/inventory/<string:product_id>')

if __name__ == '__main__':
    app.run(debug=True)