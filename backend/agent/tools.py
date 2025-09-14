# In agent/tools.py

from langchain.tools import tool
from sqlalchemy.ext.asyncio import AsyncSession
import crud.tenants as tenant_crud
import crud.maintenance as maintenance_crud
import schemas.maintenance as maintenance_schema
from database import AsyncSessionLocal
import httpx


@tool
async def list_all_tenants() -> str:
    """
    Use this tool to get a list of all tenants currently living in the PG.
    Returns a string containing the names and room numbers of all tenants.
    """
    db: AsyncSession = AsyncSessionLocal()
    try:
        tenants = await tenant_crud.get_tenants(db)
        if not tenants:
            return "There are currently no tenants in the system."

        tenant_list_str = "Here is the list of tenants:\n"
        for tenant in tenants:
            tenant_list_str += f"- Name: {tenant.name}, Room: {tenant.roomNumber}\n"
        return tenant_list_str
    finally:
        await db.close()


@tool
async def get_tenant_details_by_name(name: str) -> str:
    """
    Use this tool to get detailed information about a specific tenant by their name.
    Provide the tenant's name as the input.
    """
    db = AsyncSessionLocal()
    try:
        tenants = await tenant_crud.get_tenants(db)
        found_tenant = None
        for t in tenants:
            if t.name.lower() == name.lower():
                found_tenant = t
                break

        if not found_tenant:
            return f"No tenant found with the name {name}."

        return (
            f"Details for {found_tenant.name}:\n"
            f"- Room Number: {found_tenant.roomNumber}\n"
            f"- Contact: {found_tenant.contact}\n"
            f"- Email: {found_tenant.email}\n"
            f"- Rent: {found_tenant.rentAmount}"
        )
    finally:
        await db.close()


@tool
async def create_maintenance_ticket(roomNumber: str, description: str, category: str) -> str:
    """
    Use this tool to create a new maintenance ticket or log a complaint.
    You need to provide the roomNumber, a description of the issue, and the category.
    """
    db = AsyncSessionLocal()
    try:
        request_schema = maintenance_schema.MaintenanceRequestCreate(
            roomNumber=roomNumber,
            description=description,
            category=category
        )
        await maintenance_crud.create_maintenance_request(db, request=request_schema)

        # Notification Logic
        print("\n--- SIMULATING NOTIFICATION TO OWNER ---")
        print(f"New Ticket Created:")
        print(f"Room: {roomNumber}")
        print(f"Category: {category}")
        print(f"Issue: {description}")
        print("--------------------------------------\n")

        return f"Successfully created a '{category}' ticket for Room {roomNumber}."
    finally:
        await db.close()


@tool
async def classify_maintenance_request(description: str) -> str:
    """
    Use this tool to classify a maintenance request description into a category.
    Provide the description of the issue as input.
    Returns the predicted category (e.g., 'Electrical', 'Plumbing').
    """
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://127.0.0.1:8000/api/predict/maintenance_category",
            json={"text": description}
        )
        response.raise_for_status()
        return response.json()['category']


@tool
async def find_upcoming_rent_dues_and_propose_reminders() -> str:
    """
    Use this tool to find tenants whose rent is due in the next 5 days.
    It will return a list of these tenants and propose sending them reminders.
    The user must approve before any reminders are actually sent.
    """
    db = AsyncSessionLocal()
    try:
        tenants = await tenant_crud.get_tenants_with_rent_due(db, days=5)
        if not tenants:
            return "No tenants have rent due in the next 5 days."

        proposal = "I found the following tenants with rent due soon:\n"
        for tenant in tenants:
            proposal += f"- {tenant.name} (Room {tenant.roomNumber})\n"
        proposal += "\nShall I send them a friendly reminder message?"
        return proposal
    finally:
        await db.close()


@tool
def send_reminder_message(tenant_name: str) -> str:
    """
    Use this tool to send a pre-written, friendly rent reminder message to a specific tenant.
    You must provide the tenant's name.
    """
    print(f"\n--- SIMULATING SENDING WHATSAPP ---")
    print(f"To: {tenant_name}")
    print(f"Message: Hi {tenant_name}, this is a friendly reminder that your rent is due soon. Thanks!")
    print(f"-------------------------------------\n")

    return f"A reminder message has been successfully sent to {tenant_name}."