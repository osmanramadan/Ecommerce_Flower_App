from flask import Flask, render_template, redirect, url_for, request, flash
from flask_login import LoginManager, login_manager,login_user, login_required, logout_user, current_user, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User, Product, Basket
from . import db

app = Flask(__name__)


app.config['SECRET_KEY'] = 'your_secret_key'


# Initialize the login manager
# login_manager = LoginManager()
# login_manager.init_app(app)
# login_manager.login_view = 'login'

# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))

def register_routes(app):

    @app.route('/')
    def home():
        return render_template('home.html')
    
    @app.route('/<path:path>')
    def notfound(path):
        return render_template('home.html')

    @app.route('/contact')
    def contact():
        return render_template('contact.html')

    @app.route('/about')
    def about():
        return render_template('about.html')

    @app.route('/sections')
    def sections():
        return render_template('sections.html')

    @app.route('/section2')
    def section2():
        return render_template('section2.html')

    @app.route('/section3')
    def section3():
        return render_template('section3.html')

    @app.route('/search')
    def search():
        return render_template('search.html')

    @app.route('/favourite')
    def favourite():
        return render_template('favourite.html')
    
    @app.route('/makeit')
    def makeit():
        return render_template('makeit.html')
    
    @app.route('/col1')
    def col1():
        return render_template('col1.html')


    @app.route('/col2')
    def col2():
        return render_template('col2.html')

    @app.route('/col3')
    def col3():
        return render_template('col3.html')

    @app.route('/login', methods=['GET', 'POST'])
    def login():
        if request.method == 'POST':
            email = request.form.get('email')
            password = request.form.get('password')
            user = User.query.filter_by(email=email).first()
            
            if user and check_password_hash(user.password, password):
                # login_user(user)
                return redirect(url_for('home'))
            else:
                flash('Login failed. Check your credentials.')
        return render_template('login.html')
 
    @app.route('/register', methods=['GET', 'POST'])
    def register():
        if request.method == 'POST':
            username = request.form.get('fullname')
            email = request.form.get('email')
            password = request.form.get('password')
        
            # Check if user already exists
            user = User.query.filter_by(email=email).first()
            fullname = User.query.filter_by(username=username).first()
            if user:
                flash('Email address already exists')
                return redirect(url_for('register'))
            if fullname:
                flash('Username already exists')
                return redirect(url_for('register'))
        
            # Hash the password before storing it
            hashed_password = generate_password_hash(password)
            new_user = User(username=username, email=email, password=hashed_password)
        
            db.session.add(new_user)
            db.session.commit()
        
            return redirect(url_for('home'))
        
        return render_template('register.html')
    
    @app.route('/logout')
    
    def logout():
        logout_user()
        return redirect(url_for('home'))

    @app.route('/basket', methods=['GET','POST'])
    def basket():
        return render_template('basket.html')
        # if request.method == 'POST':
        #     product_id = request.form.get('product_id')
        #     quantity = request.form.get('quantity')
        #     new_item = Basket(user_id=current_user.id, product_id=product_id, quantity=quantity, payment_method='')
        #     db.session.add(new_item)
        #     db.session.commit()
        # basket_items = Basket.query.filter_by(user_id=current_user.id).all()
        # return render_template('basket.html', items=basket_items)

    @app.route('/payment', methods=['GET', 'POST'])
  
    def payment():
        if request.method == 'POST':
            payment_method = request.form.get('payment_method')
            items = Basket.query.filter_by(user_id=current_user.id).all()
            for item in items:
                item.payment_method = payment_method
            db.session.commit()
            flash('Payment successful!')
            return redirect(url_for('home'))
        return render_template('payment.html')

    @app.route('/admin')
    
    def admin():
        if current_user.username != 'admin':
            return redirect(url_for('home'))
        users = User.query.all()
        baskets = Basket.query.all()
        return render_template('admin.html', users=users, baskets=baskets)

# Register the routes with the app

register_routes(app)

if __name__ == '__main__':
    app.run(debug=True)
