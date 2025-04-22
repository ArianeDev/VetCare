from core.configs import settings
from sqlalchemy import Column, Integer, String

class AnimalModel(settings.DBBaseModel):
	__tablename__ = "animais"

	id: int = Column(Integer(), primary_key=True, autoincrement=True)
	nome: str = Column(String(255))
	cor: str = Column(String(255))
	raca: str = Column(String(255))
	foto: str = Column(String(255))
