import asyncHandler from 'express-async-handler';
import fiisModel from '../models/fiisModel.js';
import { BadRequestError, NotFoundError } from '../utils/AppErrors.js';

const getAll = asyncHandler(async (_req, res) => {
  const result = await fiisModel.select('*').exec();

  if (result.length === 0) {
    throw new NotFoundError('Não existe nenhum fundo cadastrado.');
  }
  res.status(200).json(result);
});

const getOne = asyncHandler(async (req, res) => {
  let { ticker } = req.params;
  ticker = ticker.toUpperCase();

  if (!/[a-z]{4}11$/i.test(ticker)) {
    throw new BadRequestError(`${ticker} não é um ticker válido.`);
  }

  const result = await fiisModel
    .select('*')
    .where('ticker = $1', [ticker])
    .exec();

  if (result.length === 0) {
    throw new NotFoundError(
      `O fundo de investimento ${ticker} não foi encontrado.`,
    );
  }

  res.status(200).json(result);
});

const create = asyncHandler(async (req, res) => {
  const { id, name, numCnpj } = req.body;

  const values = {
    ticker: id,
    nome: name,
    cnpj: numCnpj
  }

  const result = await fiisModel
    .insert(values)
    .exec();

  res.status(201).json(result);
});

export default {
  getAll,
  getOne,
  create,
};
