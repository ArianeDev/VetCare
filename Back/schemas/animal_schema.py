from typing import Optional
from pydantic import BaseModel as SCBaseModel

class AnimalCreateSchema(SCBaseModel):
	nome: str
	cor: str
	raca: str
	foto: str

	class Config:
		orm_mode = True

class AnimalSchema(AnimalCreateSchema):
	id: Optional[int] = None
	pessoa_id: int

	class Config:
		orm_mode = True
