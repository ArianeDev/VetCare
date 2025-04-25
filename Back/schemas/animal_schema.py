from typing import Optional
from pydantic import BaseModel as SCBaseModel

class AnimalSchema(SCBaseModel):
	id: Optional[int] = None
	nome: str
	cor: str
	raca: str
	foto: str
	pessoa: int

	class Config:
		orm_mode = True