import mysql.connector
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
from fastapi import Request

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
    database=os.getenv("MYSQL_DATABASE"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_ROOT_PASSWORD"),
    port=3306,
    host=os.getenv("MYSQL_HOST") 
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


@app.post("/users")
async def create_user(request: Request):
    body = await request.json()  
    cursor = conn.cursor()
    nom = body["firstName"]
    prenom = body["lastName"] 
    email = body["email"]
    age = 40
    ville = body["city"]
    codePostal = body["postalCode"]

    sql_insert_query = """
        INSERT INTO utilisateur (nom, prenom, email, age, ville, codePostal) 
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    
    values = (nom, prenom, email, age, ville, codePostal)
    cursor.execute(sql_insert_query, values)
    conn.commit()
    
    return {"message": "Utilisateur créé avec succès"}

