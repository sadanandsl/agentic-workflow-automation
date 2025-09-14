# In main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models import tenants as tenant_models
from models import maintenance as maintenance_models

# Correctly import the 'router' object from each router file
from routers.tenants import router as tenants_router
from routers.agent import router as agent_router
from routers.maintenance import router as maintenance_router
from routers.ml_models import router as ml_router

async def create_db_and_tables():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

app = FastAPI(
    title="Agentic PG Management API",
    description="API for managing Paying Guest (PG) accommodations, powered by an AI agent."
)

@app.on_event("startup")
async def on_startup():
    await create_db_and_tables()

# CORS Middleware
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Agentic PG Management API!"}

# Include all four routers in the main app
app.include_router(tenants_router, prefix="/api")
app.include_router(agent_router, prefix="/api")
app.include_router(maintenance_router, prefix="/api")
app.include_router(ml_router, prefix="/api")