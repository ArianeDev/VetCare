from typing import Optional
from pydantic import BaseModel as SCBaseModel

class PessoaSchema(SCBaseModel):
    id: Optional[int] = None
    nome: str
    cpf: str
    endereco: str
    animal_id: int
    
    class Config:
        orm_mode = True
