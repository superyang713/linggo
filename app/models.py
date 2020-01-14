from app import db


class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(64), unique=True, index=True)
    example = db.Column(db.String(120), index=True)
    user_name = db.Column(
        db.String(50),
        db.ForeignKey("user.name"),
        nullable=False
    )

    def __init__(self, word, example, user_name):
        self.word = word
        self.example = example
        self.user_name = user_name


class User(db.Model):
    name = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(50), nullable=True)
    entries = db.relationship(
        "Entry",
        backref="user",
        lazy=True,
    )

    def __init__(self, name, password):
        self.name = name
        self.password = password
