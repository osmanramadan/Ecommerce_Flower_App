from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_manager,login_user, login_required, logout_user, current_user, UserMixin


db = SQLAlchemy()


def create_app():
    app = Flask(__name__, template_folder='templates') 

    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../instance/app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


    # Initialize extensions
    db.init_app(app)
    # login_manager = LoginManager(app)
    # login_manager.init_app(app)
    # login_manager.login_view = 'login'
   

    with app.app_context():
        from .models import User, Product, Basket
        db.create_all()

    from .routes import register_routes
    register_routes(app)

    return app