from flask import Flask, Blueprint
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin

from app.config import Config, ConfigDb


app = Flask(__name__)

app.config.from_object(Config)
app.config.from_object(ConfigDb)

CORS(app, support_credentials=True)

db = SQLAlchemy(app)
ma = Marshmallow(app)
migrate = Migrate(app, db)

api_bp = Blueprint("api", __name__)
api = Api(api_bp)

from app.resources.ping import Ping
from app.resources.entry import Entry
from app.resources.user import User

api.add_resource(Ping, "/ping")
api.add_resource(Entry, "/entry")
api.add_resource(User, "/user")

app.register_blueprint(api_bp, url_prefix="/api")
