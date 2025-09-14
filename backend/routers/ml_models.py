# In routers/ml_models.py

from fastapi import APIRouter
from pydantic import BaseModel
import joblib

router = APIRouter(
    prefix="/predict",
    tags=["ML Models"]
)

# Load the trained model when the application starts
# This ensures the model is loaded only once
pipeline = joblib.load('maintenance_classifier.pkl')

# Pydantic model for the request body
class Query(BaseModel):
    text: str

@router.post("/maintenance_category")
def predict_maintenance_category(query: Query):
    """
    Predicts the category of a maintenance request.
    """
    prediction = pipeline.predict([query.text])[0]
    return {"category": prediction}