# In models/tenants.py

from sqlalchemy import Column, Integer, String, Float, Date
from database import Base # Import the Base from our database.py file

class Tenant(Base):
    __tablename__ = "tenants" # The name of the table in the database

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True) # Specify length for strings
    roomNumber = Column(String(10))
    bedNumber = Column(String(10), nullable=True)
    contact = Column(String(15), unique=True)
    email = Column(String(100), unique=True, index=True, nullable=True)
    joiningDate = Column(Date)
    rentAmount = Column(Float)
    securityDeposit = Column(Float, nullable=True)
    emergencyContact = Column(String(100), nullable=True)