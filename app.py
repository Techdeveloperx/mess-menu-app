from datetime import datetime
import psycopg2

connection = psycopg2.connect(
    host="localhost",
    database="messmenu",
    user="postgres",
    password="12345678",
    port="5432"
)

cursor = connection.cursor()

print("===== LPU MESS MENU APP =====")
print("1. Today's Menu")
print("2. Full Week Menu")
print("3. Rate a Dish")
print("4. Top 5 Dishes")
print("5. Bottom 5 Dishes")
print("6. I Won't Eat This")

choice = int(input("Enter Choice: "))

if choice == 1:

    day = datetime.now().strftime("%A")

    cursor.execute(
        "SELECT meal_type, dish FROM menu WHERE day=%s",
        (day,)
    )

    rows = cursor.fetchall()

    print(f"\n{day} Menu\n")

    for row in rows:
        print(row[0], ":", row[1])

elif choice == 2:

    cursor.execute(
        "SELECT day, meal_type, dish FROM menu"
    )

    rows = cursor.fetchall()

    for row in rows:
        print("\n", row[0], "-", row[1])
        print(row[2])
    
elif choice == 3:

    student = input("Enter Student Name: ")
    dish = input("Enter Dish Name: ")
    rating = int(input("Enter Rating (1-5): "))

    cursor.execute(
        """
        INSERT INTO ratings
        (student_name,dish_name,rating)
        VALUES(%s,%s,%s)
        """,
        (student,dish,rating)
    )

    connection.commit()

    print("Rating Saved Successfully")

elif choice == 4:

    cursor.execute("""
    SELECT dish_name,
    AVG(rating) as avg_rating
    FROM ratings
    GROUP BY dish_name
    ORDER BY avg_rating DESC
    LIMIT 5
    """)

    rows = cursor.fetchall()

    print("\nTOP 5 DISHES\n")

    for row in rows:
        print(row[0], "-", round(row[1],2))

elif choice == 5:

    cursor.execute("""
    SELECT dish_name,
    AVG(rating) as avg_rating
    FROM ratings
    GROUP BY dish_name
    ORDER BY avg_rating ASC
    LIMIT 5
    """)

    rows = cursor.fetchall()

    print("\nBOTTOM 5 DISHES\n")
    if len(rows) < 5:
        print("Not enough ratings available")
    else:
        for row in rows:
            print(row[0], "-", round(row[1], 2))

elif choice == 6:

    student = input("Enter Student Name: ")
    dish = input("Enter Dish Name You Don't Like: ")

    cursor.execute(
        """
        INSERT INTO dislikes(student_name, dish_name)
        VALUES(%s, %s)
        """,
        (student, dish)
    )

    connection.commit()

    print("Dish Added To Dislike List Successfully!")

cursor.close()
connection.close()