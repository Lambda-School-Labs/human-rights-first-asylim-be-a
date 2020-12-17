const db = require('../../data/db-config');
const { Parser } = require('json2csv');

const add = async (data) => {
  return await db('cases').insert(data);
};

const findAll = async () => {
  return await db('cases');
};

const findById = async (id) => {
  const cases = await db('cases').where({ id }).first().select('*');
  const protected_ground = await db('protected_join')
    .where({ case_id: id })
    .select('ground_tag');

  if (protected_ground.length > 0) {
    let tags = [];
    for (let i = 0; i < protected_ground.length; i++) {
      const tag = Object.values(protected_ground[i]);
      tags.push(tag);
    }
    protected_ground = tags;
  }
  cases['protected_ground'] = protected_ground;

  return cases;
};

const findBy = async (filter) => {
  return db('cases').where(filter);
};

const writeCSV = async (id) => {
  // *  get only case data
  const case_data = await findById(id);

  // * create fields
  const case_fields = [];
  for (let field in case_data[0]) {
    case_fields.push(field);
  }
  const case_opts = { fields: case_fields };
  // * fill fields with case_data
  try {
    const case_parser = new Parser(case_opts);
    const case_csv = case_parser.parse(case_data);
    // * return variable with csv data
    return case_csv;
  } catch (err) {
    return err.message;
  }
};

module.exports = {
  add,
  findAll,
  findById,
  findBy,
  writeCSV,
};
