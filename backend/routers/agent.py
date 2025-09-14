# In routers/agent.py

from fastapi import APIRouter
from pydantic import BaseModel

# Import the agent executor we created
from agent.core import agent_executor

router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"]
)

# Pydantic model for the request body
class AgentQuery(BaseModel):
    query: str

@router.post("/chat")
async def chat_with_agent(query: AgentQuery):
    """
    Receives a query from the user and returns the agent's response.
    """
    response = await agent_executor.ainvoke({"input": query.query})
    return {"response": response['output']}