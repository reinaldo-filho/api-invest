import asyncHandler from 'express-async-handler';
import { NotFoundError, ServiceUnavailableError } from '../utils/AppErrors.js';
import fiisModel from '../models/fiisModel.js';

const getAll = asyncHandler(async (_req, res) => {
  const result = await fiisModel.select('*').exec();

  if (result.length === 0) {
    throw new NotFoundError('Não existe nenhum fundo cadastrado.');
  }
  res.status(200).json(result);
});

const getOne = asyncHandler(async (req, res) => {
  const { ticker } = req.params;

  throw new ServiceUnavailableError('Método e rota ainda não implementados.');
});

export default {
  getAll,
  getOne,
};
