import asyncHandler from 'express-async-handler';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
import { BadRequestError, NotFoundError } from '../utils/AppErrors.js';
import fiisModel from '../models/fiisModel.js';
import { tickerIsValid } from '../utils/utils.js';

const getAll = asyncHandler(async (_req, res) => {
  const result = await fiisModel.getAll({});

  if (result.length === 0)
    throw new NotFoundError('Não existe nenhum fundo cadastrado.');

  res.status(200).json(camelcaseKeys(result));
});

const getOne = asyncHandler(async (req, res) => {
  let { ticker } = req.params;
  ticker = ticker.toUpperCase();

  if (!tickerIsValid(ticker))
    throw new BadRequestError(`${ticker} não é um ticker válido.`);

  const result = await fiisModel.getOne(ticker);

  if (result === undefined)
    throw new NotFoundError(
      `O fundo de investimento ${ticker} não foi encontrado.`,
    );

  res.status(200).json(camelcaseKeys(result));
});

const create = asyncHandler(async (req, res) => {
  const data = decamelizeKeys(req.body);

  // todo: check mandatory fields

  const result = await fiisModel.create(data);
  res.status(201).json(camelcaseKeys(result));
});

const update = asyncHandler(async (req, res) => {
  let { ticker } = req.params;
  ticker = ticker.toUpperCase();

  if (!tickerIsValid(ticker))
    throw new BadRequestError(`${ticker} não é um ticker válido.`);

  const data = decamelizeKeys(req.body);
  const result = await fiisModel.update(ticker, data);

  if (result.length === 0)
    throw new NotFoundError(
      `O fundo de investimento ${ticker} não foi encontrado.`,
    );

  res.status(200).json(camelcaseKeys(result));
});

export default {
  getAll,
  getOne,
  create,
  update,
};
