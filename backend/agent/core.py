# In agent/core.py
from agent.tools import list_all_tenants, get_tenant_details_by_name

# ... rest of the file
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from agent.tools import list_all_tenants
from config import settings
from agent.tools import (
    list_all_tenants,
    get_tenant_details_by_name,
    create_maintenance_ticket,
    find_upcoming_rent_dues_and_propose_reminders,
    send_reminder_message,
    classify_maintenance_request

)
# 1. Initialize the LLM
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=settings.GEMINI_API_KEY
)

# 2. Define the list of tools
tools = [
    list_all_tenants,
    get_tenant_details_by_name,
    create_maintenance_ticket,
    find_upcoming_rent_dues_and_propose_reminders,
    send_reminder_message,
    classify_maintenance_request
]
# 3. Create the Prompt Template
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful and efficient PG Management assistant for a property in Manipal. It is currently August 4, 2025. Answer the user's questions based on the tools you have."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

# 4. Create the Agent
agent = create_tool_calling_agent(llm, tools, prompt)

# 5. Create the Agent Executor
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    verbose=True
)