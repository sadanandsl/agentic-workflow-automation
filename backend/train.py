# In train.py

import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
import joblib

# 1. Load the dataset
print("Loading dataset...")
df = pd.read_csv("maintenance_data.csv")

# Ensure there are no missing values
df.dropna(inplace=True)

# Define features (X) and target (y)
X = df['description']
y = df['category']

# 2. Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)

# 3. Create a machine learning pipeline
# A pipeline chains together multiple steps.
# TfidfVectorizer: Converts text into numerical vectors.
# LogisticRegression: A simple and effective classification model.
pipeline = Pipeline([
    ('vectorizer', TfidfVectorizer()),
    ('classifier', LogisticRegression())
])

# 4. Train the model
print("Training model...")
pipeline.fit(X_train, y_train)

# 5. Evaluate the model
accuracy = pipeline.score(X_test, y_test)
print(f"Model trained successfully! Accuracy: {accuracy:.2f}")

# 6. Save the trained model
# The trained pipeline is saved to a file for later use in our API.
joblib.dump(pipeline, 'maintenance_classifier.pkl')
print("Model saved to maintenance_classifier.pkl")