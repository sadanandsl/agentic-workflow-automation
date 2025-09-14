# In crud/tenants.py

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from datetime import date, timedelta

from models.tenants import Tenant as TenantModel
from schemas.tenants import TenantCreate


async def create_tenant(db: AsyncSession, tenant: TenantCreate) -> TenantModel:
    """
    Creates a new tenant record in the database.
    """
    db_tenant = TenantModel(**tenant.model_dump())
    db.add(db_tenant)
    await db.commit()
    await db.refresh(db_tenant)
    return db_tenant


async def get_tenant(db: AsyncSession, tenant_id: int) -> TenantModel | None:
    """
    Retrieves a single tenant by their ID.
    """
    result = await db.execute(select(TenantModel).filter(TenantModel.id == tenant_id))
    return result.scalars().first()


async def get_tenants(db: AsyncSession, skip: int = 0, limit: int = 100) -> list[TenantModel]:
    """
    Retrieves a list of tenants with pagination.
    """
    result = await db.execute(select(TenantModel).offset(skip).limit(limit))
    return result.scalars().all()


async def update_tenant(db: AsyncSession, tenant_id: int, tenant_update: TenantCreate) -> TenantModel | None:
    """
    Updates an existing tenant's information.
    """
    db_tenant = await get_tenant(db, tenant_id)
    if db_tenant:
        update_data = tenant_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_tenant, key, value)
        await db.commit()
        await db.refresh(db_tenant)
    return db_tenant


async def delete_tenant(db: AsyncSession, tenant_id: int) -> TenantModel | None:
    """
    Deletes a tenant from the database.
    """
    db_tenant = await get_tenant(db, tenant_id)
    if db_tenant:
        await db.delete(db_tenant)
        await db.commit()
    return db_tenant


async def get_tenants_with_rent_due(db: AsyncSession, days: int = 5) -> list[TenantModel]:
    """
    Finds tenants whose rent joining date anniversary is within the next 'days'.
    """
    today = date.today()
    due_date_limit = today + timedelta(days=days)

    result = await db.execute(
        select(TenantModel).filter(
            func.day(TenantModel.joiningDate) >= today.day,
            func.day(TenantModel.joiningDate) <= due_date_limit.day,
        )
    )
    return result.scalars().all()