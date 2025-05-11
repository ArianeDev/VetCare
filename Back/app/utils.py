import os
import secrets

from core.deps import get_session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from models.pessoa_model import PessoaModel
from schemas.pessoa_schema import PessoaCreate, PessoaSchema
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Session
from sqlalchemy.future import select

# Configurações do token
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60*24*7
ALGORITHM = "HS256"
JWT_SECRET_KEY = secrets.token_hex(10)
JWT_REFRESH_SECRET_KEY = secrets.token_hex(10)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/pessoa/token")

# verificar email
async def get_user_by_email(email: str, db: AsyncSession):
    user = select(PessoaModel).where(PessoaModel.email == email)
    result = await db.execute(user)
    return result.scalars().first()

# Verificando a senha
async def verify_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)

async def create_pessoa(pessoa: PessoaCreate, db: Session):
    user_obj = PessoaModel(email=pessoa.email, 
                           username=pessoa.username,
                           cpf=pessoa.cpf,
                           endereco=pessoa.endereco,
                           password=pwd_context.hash(pessoa.password)) # Criptografando a senha
    db.add(user_obj)
    await db.commit()
    db.refresh(user_obj)
    return user_obj

async def authenticate_user(email: str, password: str, db: AsyncSession):
    user = await get_user_by_email(email, db)

    if not user:
        return False
    
    if not verify_password(password, user.password):
        return False

    return user

# Criando o token
def create_access_token(pessoa: PessoaModel) -> str:
    user_obj = PessoaSchema.model_validate(pessoa)

    token = jwt.encode(user_obj.model_dump(), JWT_SECRET_KEY)

    return {"access_token": token, "token_type": "bearer"}

async def get_current_user(db: Session = Depends(get_session), token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=ALGORITHM)
        search = select(PessoaModel).where(PessoaModel.id == payload["id"])
        result = await db.execute(search)
        user = result.scalars().first()

        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuário não encontrado")

    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou senha inválidos")

    return PessoaSchema.model_validate(user)