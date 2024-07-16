import os
import flask_admin 
import admin
from. models import db, User
from flask_admin.contrib.sqla import ModelView

def admin_setup(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample_key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='inventory admin', template_nodes='bootstrap3')
    
    # Here is where we will add our models
    admin.add_view(ModelView(User, db.session))
    
    # This line can be duplicated to add new models
    # admin.add_view(ModelView(YourModelName, db.session))