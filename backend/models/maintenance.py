# In models/maintenance.py
from sqlalchemy import Column, Integer, String, Date, Enum
from database import Base
import enum

class TicketStatus(str, enum.Enum):
    PENDING = "Pending"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"

class MaintenanceRequest(Base):
    __tablename__ = "maintenance_requests"

    id = Column(Integer, primary_key=True, index=True)
    roomNumber = Column(String(10))
    description = Column(String(255))
    reportedDate = Column(Date)
    status = Column(Enum(TicketStatus), default=TicketStatus.PENDING)
    category = Column(String(50), nullable=True)