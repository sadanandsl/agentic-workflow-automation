# In routers/tenants.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

import crud.tenants as crud
from schemas.tenants import Tenant, TenantCreate
from database import get_db

router = APIRouter(
    prefix="/tenants",  # All paths in this router will start with /tenants
    tags=["Tenants"]      # Group these endpoints in the API docs
)

@router.post("/", response_model=Tenant, status_code=status.HTTP_201_CREATED)
async def create_new_tenant(tenant: TenantCreate, db: AsyncSession = Depends(get_db)):
    # You could add logic here to check if a tenant with the same email/contact exists
    return await crud.create_tenant(db=db, tenant=tenant)

@router.get("/", response_model=List[Tenant])
async def read_all_tenants(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_db)):
    tenants = await crud.get_tenants(db, skip=skip, limit=limit)
    return tenants

@router.get("/{tenant_id}", response_model=Tenant)
async def read_tenant_by_id(tenant_id: int, db: AsyncSession = Depends(get_db)):
    db_tenant = await crud.get_tenant(db, tenant_id=tenant_id)
    if db_tenant is None:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return db_tenant

@router.put("/{tenant_id}", response_model=Tenant)
async def update_existing_tenant(tenant_id: int, tenant: TenantCreate, db: AsyncSession = Depends(get_db)):
    db_tenant = await crud.update_tenant(db, tenant_id=tenant_id, tenant_update=tenant)
    if db_tenant is None:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return db_tenant

@router.delete("/{tenant_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_tenant(tenant_id: int, db: AsyncSession = Depends(get_db)):
    db_tenant = await crud.delete_tenant(db, tenant_id=tenant_id)
    if db_tenant is None:
        raise HTTPException(status_code=404, detail="Tenant not found")
    return {"ok": True} # This response body won't actually be sent due to 204 status