from typing import Optional
from pydantic import BaseModel as SCBaseModel

class PessoaSchema(SCBaseModel):
    id: Optional[int] = None
    username: str
    email: str
    cpf: str
    endereco: str
    
    class Config:
        orm_mode = True
        from_attributes = True # converte um objeto SQLAIchemy em objeto Pydantic

class PessoaCreate(PessoaSchema):
    password: str

    class Config:
        orm_mode = True

class Token(SCBaseModel):
    access: str
    token_type: str

class LoginData(SCBaseModel):
    username: str
    password: str