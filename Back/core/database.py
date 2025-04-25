# Esse código configura o motor e as sessões para trabalhar com o banco de dados

from sqlalchemy.orm import sessionmaker  # cria sessões no banco de dados para interagir com a base de dados
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine, AsyncSession # criar e administrar funções assíncrona
from core.configs import settings # contém as configurações da aplicação e a URL do banco de dados

engine: AsyncEngine = create_async_engine(settings.DB_URL) # estabelece a conexão com o banco de dados
Session: AsyncEngine = sessionmaker( # cria sessões 
    autocommit=False, # não serão commitadas automaticamente
    autoflush=False, # Evita que as mudanças sejam enviadas automaticamente para o banco
    expire_on_commit=False, # mantém os dados disponíveis mesmo após o commit
    class_=AsyncSession, # especifica que as sessões serão assíncronas
    bind=engine # associa as sessões ao motos criado
)