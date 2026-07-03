import psycopg2

connection = psycopg2.connect(
    host="localhost",
    database="messmenu",
    user="postgres",
    password="12345678",
    port="5432"
)

print("Database Connected Successfully")

connection.close()