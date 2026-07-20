from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime
from db import connection

app = Flask(__name__)
CORS(app)

# Today's Menu
@app.route("/")
def today_menu():
    cur = connection.cursor()

    today = datetime.now().strftime("%A")

    cur.execute("""
        SELECT meal_type, dish
        FROM menu
        WHERE day=%s
        ORDER BY id;
    """, (today,))

    rows = cur.fetchall()
    cur.close()

    menu = []

    for row in rows:
        menu.append({
            "meal_type": row[0],
            "dish": row[1]
        })

    return jsonify(menu)


# Weekly Menu
@app.route("/menu/<day>")
def weekly_menu(day):
    cur = connection.cursor()

    cur.execute("""
        SELECT meal_type, dish
        FROM menu
        WHERE day=%s
        ORDER BY id;
    """, (day,))

    rows = cur.fetchall()
    cur.close()

    menu = []

    for row in rows:
        menu.append({
            "meal_type": row[0],
            "dish": row[1]
        })

    return jsonify(menu)


if __name__ == "__main__":
    app.run(debug=True)