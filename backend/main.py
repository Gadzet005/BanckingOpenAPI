from src.app import app

@app.get("/")
async def root():
    return {"message": "home page"}

@app.get("/hello")
async def root():
    return {"message": "Hello World!"}
