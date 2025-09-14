# In schemas/tenants.py

from pydantic import BaseModel
from typing import Optional
from datetime import date

# Base schema with common attributes
class TenantBase(BaseModel):
    name: str
    roomNumber: str
    bedNumber: Optional[str] = None
    contact: str
    email: Optional[str] = None
    joiningDate: date
    rentAmount: float
    securityDeposit: Optional[float] = None
    emergencyContact: Optional[str] = None

# Schema for creating a new tenant (inherits all fields from TenantBase)
class TenantCreate(TenantBase):
    pass

# Schema for reading tenant data from the API (includes the ID)
class Tenant(TenantBase):
    id: int

    class Config:
        # This allows Pydantic to read data from ORM models (like SQLAlchemy)
        from_attributes = True