import psycopg2
from datetime import datetime

connection = psycopg2.connect(
    host="localhost",
    database="messmenu",
    user="postgres",
    password="12345678",
    port="5432"
)

cursor = connection.cursor()

today = datetime.today().strftime("%A")

cursor.execute(
    "SELECT meal_type, dish FROM menu WHERE day=%s",
    (today,)
)

rows = cursor.fetchall()

print("Today's Menu:", today)

for row in rows:
    print(row[0], ":", row[1])

cursor.close()
connection.close()