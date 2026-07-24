from pathlib import Path
from typing import Literal

import joblib
import pandas as pd
from fastapi import APIRouter
from pydantic import BaseModel, Field

class ClusterRequest(BaseModel):
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

# .........................

class ClusterResponse(BaseModel):
    cluster: int
    description: str


# Model Loading 

MODEL_PATH = (
    Path(__file__).resolve().parents[1]
    / "models"
    / "clustering_model.pkl"
)

if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"Clustering model not found: {MODEL_PATH}"
    )

clustering_model = joblib.load(
    MODEL_PATH
)

router = APIRouter(
    tags=["Customer Segmentation"]
)

# Description of clusters 
CLUSTER_DESCRIPTIONS = {
    0: (
        "Typical-balance customers, often blue-collar or "
        "secondary-educated, with many holding housing loans."
    ),
    1: (
        "High-balance professional customers, often management "
        "or tertiary-educated, usually without housing or personal loans."
    )
}


# Endpoints 
@router.post(
    "/cluster",
    response_model=ClusterResponse,
    summary="Assign a customer segment"
)
def assign_customer_cluster(
    customer: ClusterRequest
) -> ClusterResponse:
    """
    Assign a customer to a segment using
    the trained clustering model.
    """

    customer_data = pd.DataFrame([
        customer.model_dump()
    ])

    cluster = int(
        clustering_model.predict(
            customer_data
        )[0]
    )

    description = CLUSTER_DESCRIPTIONS.get(
        cluster,
        "Customer segment"
    )

    return ClusterResponse(
        cluster=cluster,
        description=description
    )