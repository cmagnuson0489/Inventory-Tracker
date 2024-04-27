# This module will take care of starting our API server, Loading our Postgres Database

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Create our Flask app
api = Blueprint('api', __name__)

app.config["JWT_SECRET_KEY"] = "ruwqilpdnhyqbcapnqzhton"
jwt = JWTManager(app)

@api.route('/token', methods=['POST'])
def create_token():
    
    return jsonify(response_body), 200

