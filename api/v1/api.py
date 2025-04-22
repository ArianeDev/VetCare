from fastapi import APIRouter
from api.v1.endpoints import vet

api_router = APIRouter()

api_router.include_router(vet.router, prefix="/animal", tags=["Animais"])
