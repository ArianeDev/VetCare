# Esse código configura a estrutura básica da aplicação e do banco de dados

from pydantic.v1 import BaseSettings # define configurações de ambiente e validações
from sqlalchemy.orm import declarative_base # mapeamento de modelos de tabelas no banco de dados

# Essa classe vai definir os parâmetros básicos de configuração da API e do banco de dados
class Settings(BaseSettings):
	API_V1_STR: str = "/api/v1" # URL inicial para acessar o endpoints
	DB_URL: str = "mysql+asyncmy://root@127.0.0.1:3306/vet" # Conexão com o banco de dados
	DBBaseModel = declarative_base() # Cria a classe base para os modelos do banco

class Config:
	case_sensitive = False
	env_file = "env"

settings = Settings()