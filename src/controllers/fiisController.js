import asyncHandler from 'express-async-handler';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';
import { BadRequestError, NotFoundError } from '../utils/AppErrors.js';
import fiisModel from '../models/fiisModel.js';
import utils from '../utils/utils.js';
/**
 * Verifica se o ticker é uma sigla válida
 * @param {string} ticker
 * @returns {boolean}
 */
function tickerIsValid(ticker) {
  return /[a-z]{4}11$/i.test(ticker);
}

const getAll = asyncHandler(async (_req, res) => {
  const result = await fiisModel.getAll();

  if (result === undefined)
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

  const data = decamelizeKeys(req.body);

  if (!tickerIsValid(ticker))
    throw new BadRequestError(`${ticker} não é um ticker válido.`);

  const result = await fiisModel.update(ticker, data);

  if (result.length === 0)
    throw new NotFoundError(
      `O fundo de investimento ${ticker} não foi encontrado.`,
    );

  const updatedResult = result.map( item => {
    item.created_at = utils.toLocalTimeZone(item.created_at);
    item.updated_at = utils.toLocalTimeZone(item.updated_at);
    return item;
  });

  res.status(200).json(camelcaseKeys(updatedResult));
});

export default {
  getAll,
  getOne,
  create,
  update,
};
