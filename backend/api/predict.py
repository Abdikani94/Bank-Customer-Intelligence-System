from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import APIRouter
from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    age: int = Field(
        ge=18,
        le=100
    )

    job: Literal[
        "admin.",
        "blue-collar",
        "entrepreneur",
        "housemaid",
        "management",
        "retired",
        "self-employed",
        "services",
        "student",
        "technician",
        "unemployed",
        "unknown"
    ]

    marital: Literal[
        "divorced",
        "married",
        "single"
    ]

    education: Literal[
        "primary",
        "secondary",
        "tertiary",
        "unknown"
    ]

    balance: float

    housing: Literal[
        "no",
        "yes"
    ]

    loan: Literal[
        "no",
        "yes"
    ]

    campaign: int = Field(
        ge=1
    )

# ...........................

class PredictionResponse(BaseModel):
    prediction: Literal[
        "No",
        "Yes"
    ]

    probability: float = Field(
        ge=0,
        le=1
    )
# ..............  

MODEL_PATH = (
    Path(__file__).resolve().parents[1]
    / "models"
    / "classification_model.pkl"
)

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Classification model not found: {MODEL_PATH}"
    )

classification_model = joblib.load(
    MODEL_PATH
)

router = APIRouter(
    tags=["Prediction"]
)

# ..................................

@router.post(
    "/predict",
    response_model=PredictionResponse,
    summary="Predict term-deposit subscription"
)
def predict_subscription(
    customer: PredictionRequest
) -> PredictionResponse:
    """
    Predict whether a customer will subscribe
    to a term deposit.
    """

    customer_data = pd.DataFrame([
        customer.model_dump()
    ])

    prediction = int(
        classification_model.predict(
            customer_data
        )[0]
    )

    class_probabilities = (
        classification_model.predict_proba(
            customer_data
        )[0]
    )

    positive_class_index = list(
        classification_model.classes_
    ).index(1)

    subscription_probability = float(
        class_probabilities[
            positive_class_index
        ]
    )

    return PredictionResponse(
        prediction=(
            "Yes"
            if prediction == 1
            else "No"
        ),
        probability=round(
            subscription_probability,
            4
        )
    )