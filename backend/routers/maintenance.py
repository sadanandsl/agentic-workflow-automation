# In routers/maintenance.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.maintenance import MaintenanceRequest, MaintenanceRequestCreate
import crud.maintenance as crud
from database import get_db

router = APIRouter(
    prefix="/maintenance",
    tags=["Maintenance"]
)

@router.post("/", response_model=MaintenanceRequest)
async def create_new_maintenance_request(
    request: MaintenanceRequestCreate,
    db: AsyncSession = Depends(get_db)
):
    return await crud.create_maintenance_request(db=db, request=request)