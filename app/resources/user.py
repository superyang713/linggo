from flask_restful import Resource
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs

from app.models import User as U
from app import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ("name", "password")
    name = fields.Str(required=True, location="json")
    password = fields.Str(required=True, location="json")


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

    def get(self):
        user_schema = UserSchema(many=True)
        all_entries = U.query.all()

        result = user_schema.dump(all_entries)
        return {"users": result}
