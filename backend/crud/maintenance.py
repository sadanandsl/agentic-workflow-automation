# In crud/maintenance.py

from sqlalchemy.ext.asyncio import AsyncSession
from models.maintenance import MaintenanceRequest
from schemas.maintenance import MaintenanceRequestCreate
from datetime import date

async def create_maintenance_request(db: AsyncSession, request: MaintenanceRequestCreate) -> MaintenanceRequest:
    """
    Creates a new maintenance request record in the database.
    """
    db_request = MaintenanceRequest(
        **request.model_dump(),
        reportedDate=date.today()
    )
    db.add(db_request)
    await db.commit()
    await db.refresh(db_request)
    return db_request