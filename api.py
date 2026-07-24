import csv
from flask import Response
from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from db import connection

app = Flask(__name__)
CORS(app)

# ======================================
# Today's Menu
# ======================================

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


# ======================================
# Weekly Menu
# ======================================

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


# ======================================
# Rate Dish
# ======================================

@app.route("/rate", methods=["POST"])
def rate_dish():

    data = request.get_json()

    student_name = data["student_name"]
    registration_number = data["registration_number"]
    dish_name = data["dish_name"]
    rating = data["rating"]

    cur = connection.cursor()

    # Duplicate Check
    cur.execute("""
        SELECT *
        FROM ratings
        WHERE registration_number=%s
        AND dish_name=%s
    """, (registration_number, dish_name))

    already = cur.fetchone()

    if already:
        cur.close()

        return jsonify({
            "message": "You have already rated this meal."
        })

    cur.execute("""
        INSERT INTO ratings
        (student_name, registration_number, dish_name, rating)
        VALUES(%s,%s,%s,%s)
    """, (
        student_name,
        registration_number,
        dish_name,
        rating
    ))

    connection.commit()
    cur.close()

    return jsonify({
        "message": "Rating Submitted Successfully"
    })


# ======================================
# Top Rated Dishes
# ======================================

@app.route("/top-dishes")
def top_dishes():

    cur = connection.cursor()

    cur.execute("""
        SELECT
            dish_name,
            ROUND(AVG(rating),2)
        FROM ratings
        GROUP BY dish_name
        ORDER BY AVG(rating) DESC
        LIMIT 5;
    """)

    rows = cur.fetchall()
    cur.close()

    dishes = []

    for row in rows:
        dishes.append({
            "dish_name": row[0],
            "average_rating": float(row[1])
        })

    return jsonify(dishes)


# ======================================
# Bottom Rated Dishes
# ======================================

@app.route("/bottom-dishes")
def bottom_dishes():

    cur = connection.cursor()

    cur.execute("""
    SELECT
        dish_name,
        ROUND(AVG(rating),2) AS average_rating
    FROM ratings
    GROUP BY dish_name
    HAVING AVG(rating) <= 3
    ORDER BY AVG(rating) ASC;
""")

    rows = cur.fetchall()
    cur.close()

    dishes = []

    for row in rows:
        dishes.append({
            "dish_name": row[0],
            "average_rating": float(row[1])
        })

    return jsonify(dishes)


# ======================================
# Dashboard Statistics
# ======================================

@app.route("/stats")
def stats():

    cur = connection.cursor()

    # Total Ratings
    cur.execute("SELECT COUNT(*) FROM ratings;")
    total_ratings = cur.fetchone()[0]

    # Total Students
    cur.execute("SELECT COUNT(DISTINCT registration_number) FROM ratings;")
    total_students = cur.fetchone()[0]

    # Total Rated Dishes
    cur.execute("SELECT COUNT(DISTINCT dish_name) FROM ratings;")
    total_dishes = cur.fetchone()[0]

    # Highest Rated Dish
    cur.execute("""
        SELECT dish_name
        FROM ratings
        GROUP BY dish_name
        ORDER BY AVG(rating) DESC
        LIMIT 1;
    """)

    top = cur.fetchone()
    top_dish = top[0] if top else "N/A"

    # Lowest Rated Dish
    cur.execute("""
        SELECT dish_name
        FROM ratings
        GROUP BY dish_name
        ORDER BY AVG(rating) ASC
        LIMIT 1;
    """)

    bottom = cur.fetchone()
    bottom_dish = bottom[0] if bottom else "N/A"

    cur.close()

    return jsonify({
        "total_ratings": total_ratings,
        "total_students": total_students,
        "total_dishes": total_dishes,
        "top_dish": top_dish,
        "bottom_dish": bottom_dish
    })

# ======================================
# Search Student Ratings
# ======================================

@app.route("/student/<regno>")
def student_rating(regno):

    cur = connection.cursor()

    cur.execute("""
        SELECT
            student_name,
            dish_name,
            rating
        FROM ratings
        WHERE registration_number=%s;
    """, (regno,))

    rows = cur.fetchall()
    cur.close()

    ratings = []

    for row in rows:
        ratings.append({
            "student_name": row[0],
            "dish_name": row[1],
            "rating": row[2]
        })

    return jsonify(ratings)



@app.route("/download-report")
def download_report():

    cur = connection.cursor()

    cur.execute("""
        SELECT student_name,
               registration_number,
               dish_name,
               rating
        FROM ratings
        ORDER BY student_name;
    """)

    rows = cur.fetchall()
    cur.close()

    class Echo:
        def write(self, value):
            return value

    def generate():
        writer = csv.writer(Echo())

        yield writer.writerow([
            "Student Name",
            "Registration Number",
            "Dish Name",
            "Rating"
        ])

        for row in rows:
            yield writer.writerow(row)

    return Response(
        generate(),
        mimetype="text/csv",
        headers={
            "Content-Disposition":
            "attachment; filename=ratings_report.csv"
        }
    )
# ======================================
# Run Server
# ======================================

if __name__ == "__main__":
    app.run(debug=True)

    