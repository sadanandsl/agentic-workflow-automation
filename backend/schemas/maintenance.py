# In schemas/maintenance.py

from pydantic import BaseModel
from datetime import date
from models.maintenance import TicketStatus

# This is the base schema. It defines the fields needed to CREATE a ticket.
# Notice 'status' is NOT here.
class MaintenanceRequestBase(BaseModel):
    roomNumber: str
    description: str
    category: str

# This schema is used for creating new requests. It's the same as the base.
class MaintenanceRequestCreate(MaintenanceRequestBase):
    pass

# This schema is for READING a ticket from the API.
# It includes all fields, including the ones set automatically by the database.
class MaintenanceRequest(MaintenanceRequestBase):
    id: int
    reportedDate: date
    status: TicketStatus

    class Config:
        from_attributes = True