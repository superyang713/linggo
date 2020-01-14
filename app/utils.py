def prepopulate_entries(user_name):
    """
    Get a list of entries that can be used to prepopulate datebase for a user.
    """
    data = [
        {
            "word": "to",
            "example": "She walked to his desk",
            "user_name": user_name
        },
        {
            "word": "in",
            "example": "Ryan could see her in the room",
            "user_name": user_name
        },
        {
            "word": "on",
            "example": "David walked on top of the building",
            "user_name": user_name
        },
        {
            "word": "up",
            "example": "They walked up the stairs",
            "user_name": user_name
        },
        {
            "word": "inside",
            "example": "Charlotte walked inside the house",
            "user_name": user_name
        },
        {
            "word": "as",
            "example": "As a student, I find that offensive",
            "user_name": user_name
        },
    ]

    return data
