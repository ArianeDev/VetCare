from fastapi import APIRouter, status, Depends, HTTPException, Response

from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.pessoa_schema import PessoaSchema
from models.pessoa_model import PessoaModel

from core.deps import get_session

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=PessoaSchema)
async def post_pessoa(pessoa: PessoaSchema, db: AsyncSession = Depends(get_session)):
	new_pessoa = PessoaModel(nome=pessoa.nome,
                          	 cpf=pessoa.cpf,
                             endereco=pessoa.endereco,
                             animal=pessoa.animal_id)
	db.add(new_pessoa)
	await db.commit()
	return new_pessoa