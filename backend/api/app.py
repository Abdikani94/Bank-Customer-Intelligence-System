"""FastAPI application entry point."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.config import settings

from backend.api.cluster import router as cluster_router
from backend.api.predict import router as prediction_router

app = FastAPI(
    title=settings.app_name,
    version="0.1.0",
    description="API for bank customer subscription prediction and segmentation.",
)

app.include_router(prediction_router)
app.include_router(cluster_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["System"])
def root() -> dict[str, str]:
    """Return basic API information."""
    return {"message": settings.app_name, "docs": "/docs"}


@app.get("/health", tags=["System"])
def health_check() -> dict[str, str]:
    """Confirm that the API is running."""
    return {"status": "healthy"}
