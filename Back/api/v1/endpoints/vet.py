from typing import List
from fastapi import APIRouter, status, Depends, HTTPException, Response

from sqlalchemy.orm import joinedload
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession

from schemas.animal_schema import AnimalSchema, AnimalCreateSchema
from models.animal_model import AnimalModel
from schemas.pessoa_schema import PessoaSchema

from core.deps import get_session
from app.utils import get_current_user


router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=AnimalSchema)
async def post_animal(animal: AnimalCreateSchema, db: AsyncSession = Depends(get_session), user: PessoaSchema = Depends(get_current_user)):
	new_animal = AnimalModel(nome=animal.nome,
						  	 cor=animal.cor,
							 raca=animal.raca,
							 foto=animal.foto,
							 pessoa_id=user.id)
	db.add(new_animal)
	await db.commit()
	return new_animal

@router.get("/", response_model=List[AnimalSchema])
async def get_animais(db:AsyncSession = Depends(get_session), user: PessoaSchema = Depends(get_current_user)):
	async with db as session:
		query = select(AnimalModel).where(AnimalModel.pessoa_id == user.id)
		result = await session.execute(query)

		return result.scalars().all()

@router.get("/{dono_id}", response_model=List[AnimalSchema])
async def get_animal(dono_id: int, db: AsyncSession = Depends(get_session), user: PessoaSchema = Depends(get_current_user)):

	async with db as session:
		
		query = select(AnimalModel).filter(AnimalModel.pessoa_id == dono_id).options(joinedload(AnimalModel.pessoa)) #testar com id do dono
		result = await session.execute(query)
		animal: List[AnimalModel] = result.scalars().all()

		if animal:
			return animal
		else:
			raise HTTPException(detail="Animal não encontrado", status_code=status.HTTP_404_NOT_FOUND)

@router.put("/{animal_id}", response_model=AnimalSchema, status_code=status.HTTP_202_ACCEPTED)
async def put_animal(animal_id: int, animal: AnimalCreateSchema, db:AsyncSession = Depends(get_session), user: PessoaSchema = Depends(get_current_user)):
	async with db as session:
		query = select(AnimalModel).where(AnimalModel.id == animal_id, AnimalModel.pessoa_id == user.id)
		result = await session.execute(query)
		animal_up = result.scalar_one_or_none()

		if animal_up:
			animal_up.nome = animal.nome
			animal_up.cor = animal.cor
			animal_up.raca = animal.raca
			animal_up.foto = animal.foto

			await session.commit()
			return animal_up
		else:
			raise HTTPException(detail="Animal não encontrado", status_code=status.HTTP_404_NOT_FOUND)

@router.delete("/{animal_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_animal(animal_id: int, db: AsyncSession = Depends(get_session), user: PessoaSchema = Depends(get_current_user)):
	async with db as session:
		query = select(AnimalModel).filter(AnimalModel.id == animal_id, AnimalModel.pessoa_id == user.id)
		result = await session.execute(query)
		animal_del = result.scalar_one_or_none()

		if animal_del:
			await session.delete(animal_del)
			await session.commit()
			return Response(status_code=status.HTTP_204_NO_CONTENT)
		else:
			raise HTTPException(detail="Animal não encontrado", status_code=status.HTTP_404_NOT_FOUND)