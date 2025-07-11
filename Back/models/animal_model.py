from core.configs import settings
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from models.pessoa_model import PessoaModel

class AnimalModel(settings.DBBaseModel):
	__tablename__ = "animais"

	id: int = Column(Integer(), primary_key=True, autoincrement=True, index=True)
	nome: str = Column(String(255))
	cor: str = Column(String(255))
	raca: str = Column(String(255))
	foto: str = Column(String(255))

	pessoa_id: int = Column(Integer(), ForeignKey("pessoas.id"))
	pessoa = relationship("PessoaModel", back_populates="animais", remote_side="PessoaModel.id")
