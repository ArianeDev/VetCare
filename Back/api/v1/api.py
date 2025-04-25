from fastapi import APIRouter
from api.v1.endpoints import vet, pessoa

api_router = APIRouter()

api_router.include_router(vet.router, prefix="/animal", tags=["Animais"])
api_router.include_router(pessoa.router, prefix="/pessoa", tags=["Pessoas"])