import mysql.connector
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Valeurs par défaut pour debug
conn = mysql.connector.connect(
    database=os.getenv("MYSQL_DATABASE", "ynovDatabase"),
    user=os.getenv("MYSQL_USER", "root"),
    password=os.getenv("MYSQL_ROOT_PASSWORD", "ynov-CICD"),
    port=3306,
    host=os.getenv("MYSQL_HOST", "localhost")  # ✅ DÉFAUT
)

@app.get("/users")
async def get_users():
    cursor = conn.cursor()
    sql_select_query = "SELECT * FROM utilisateur"
    cursor.execute(sql_select_query)
    # get all records
    records = cursor.fetchall()
    print("Total number of rows in table : ", cursor.rowcount)
    # Renvoie nos données et code 200 OK
    return {'utilisateurs': records}

if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=8000)
