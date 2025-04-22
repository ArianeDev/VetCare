from typing import Generator # serve para indicar que essa função é um gerador que produz instâncias do tipo AsyncSession
from sqlalchemy.ext.asyncio import AsyncSession # utilizado para criar sessões de banco de dados assíncronas
from core.database import Session 

# gerencia as sessões do banco de dados
async def get_session() -> Generator:
	session: AsyncSession = Session()

	try:
		yield session
	finally:
		await session.close()