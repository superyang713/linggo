from flask_restful import Resource
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs

from app.models import User as U


class User(Resource):
    name = fields.Str(required=True, location="json")
    password = fields.Str(location="json")
    args = {
        "name": name,
        "password": password
    }

    @use_args(args)
    def post(self, args):
        new_user = U(args["name"], args["password"])

        from app import db
        db.session.add(new_user)
        db.session.commit()

        return {"message": "successful"}, 201
