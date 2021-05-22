exports.up = function (knex) {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('pending_cases', function (table) {
      table.string('pending_case_id').notNullable().primary();
      table
        .string('user_id')
        .references('user_id')
        .inTable('profiles')
        .onDelete('RESTRICT');
      table.string('case_url');
      table.string('case_number');
      table.date('date');
      table
        .integer('judge_id')
        .references('judge_id')
        .inTable('judges')
        .onDelete('RESTRICT');
      table.string('case_outcome');
      table.string('country_of_origin');
      table.string('protected_grounds');
      table.string('application_type');
      table.string('case_origin_city');
      table.string('case_origin_state');
      table.string('gender');
      table.string('applicant_language');
      table.string('indigenous_group');
      table.string('type_of_violence');
      table.boolean('appellate');
      table.boolean('filed_in_one_year');
      table.boolean('credible');
      table.string('status');
      table.string('uploaded');
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('pending_cases');
};
