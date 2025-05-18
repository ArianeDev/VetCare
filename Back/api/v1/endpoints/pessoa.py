from fastapi import APIRouter, status, Depends, HTTPException, Response, FastAPI
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from schemas.pessoa_schema import PessoaSchema, Token
from models.pessoa_model import PessoaModel
from core.deps import get_session
from app.utils import (
    get_user_by_email,
    create_pessoa,
    authenticate_user,
    create_access_token,
    get_current_user
)

router = APIRouter()

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=Token)
async def post_pessoa(pessoa: PessoaSchema, db: AsyncSession = Depends(get_session)):
    db_user = await get_user_by_email(pessoa.email, db)
    
    if db_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email já cadastrado")

    user = await create_pessoa(pessoa, db)
    token = create_access_token(user)

    return {"user": user, "access_token": token["access_token"], "token_type": token["token_type"]}

@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_session)):
    user = await authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Credencial inválida")

    return create_access_token(user)

@router.get("/user", response_model=PessoaSchema)
async def get_user(user: PessoaSchema = Depends(get_current_user)):
    return user