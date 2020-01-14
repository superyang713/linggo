from flask import jsonify
from flask_restful import Resource
from webargs import fields
from webargs.flaskparser import use_args, use_kwargs

from app.models import Entry as E
from app import ma
from app.utils import prepopulate_entries


class EntrySchema(ma.Schema):
    class Meta:
        fields = ("word", "example", "user_name")
    word = fields.Str(required=True, location="json")
    example = fields.Str(required=True, location="json")
    user_name = fields.Str(required=True, location="json")


class Entry(Resource):
    user_name = fields.Str(required=True)
    args = {
        "user_name": user_name,
    }

    @use_kwargs(EntrySchema)
    def post(self, word, example, user_name):
        new_entry = E(word, example, user_name)

        from app import db
        db.session.add(new_entry)
        db.session.commit()

        return {"message": "sucessful"}, 201

    # Get all the entries that match a user.
    @use_args(args)
    def get(self, args):
        entry_schema = EntrySchema(many=True)
        all_entries = E.query.filter_by(user_name=args["user_name"])

        result = entry_schema.dump(all_entries)
        return {"entries": result}


class Entries(Resource):
    """
    This api prepopulates the database for a user.
    """
    user_name = fields.Str(required=True)
    args = {
        "user_name": user_name,
    }
    @use_args(args)
    def post(self, args):
        items = prepopulate_entries(args["user_name"])
        for item in items:
            new_entry = E(item["word"], item["example"], item["user_name"])

            from app import db
            db.session.add(new_entry)
            db.session.commit()

        return {"entries": items}, 201
