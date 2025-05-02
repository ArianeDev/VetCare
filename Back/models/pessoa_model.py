from core.configs import settings
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class PessoaModel(settings.DBBaseModel):
    __tablename__ = "pessoas"
    
    id: int = Column(Integer(), primary_key=True, autoincrement=True, index=True)
    nome: str = Column(String(255))
    cpf: str = Column(String(255))
    endereco: str = Column(String(255))

    animais = relationship("AnimalModel", back_populates="pessoa")