from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text
import hashlib
import jwt
import os



from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to access the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Login route 
@app.post("/login")
async def login():
    return {"message": "Login successful"}


# Database Credentials 
DB_USER = "anjali"
DB_PASSWORD = "Telta21@2025"
DB_HOST = "db.leap21stcentury.org"
DB_NAME = "leap21_hkt"
DB_PORT = "3306"

# Create database URL
DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# SQLAlchemy Engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Database Connection
#DATABASE_URL = "mysql+pymysql://anjali:Telta21%402025@db.leap21stcentury.org:3306/leap21_hkt"
#engine = create_engine(DATABASE_URL)

# JWT Secret Key
SECRET_KEY = "anjali"

@app.post("/login")
def login(username: str, password: str, db: Session = Depends(engine.connect)):
    # Hash password using MD5 (to match stored format)
    md5_hashed_password = hashlib.md5(password.encode()).hexdigest()

    # Query database for user
    query = text("SELECT user_type FROM user_login WHERE username = :username AND password = :password")
    result = db.execute(query, {"username": username, "password": md5_hashed_password}).fetchone()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    user_type = result[0]  # Extract user type from query result

    # Generate JWT Token
    token = jwt.encode({"username": username, "user_type": user_type}, SECRET_KEY, algorithm="HS256")

    return {"success": True, "token": token, "message": "Login successful"}
