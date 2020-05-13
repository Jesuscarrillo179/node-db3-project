const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
};

function find(){
    return db('schemes')
}

function findById(id){
    return db('schemes')
    .where({ id })
    .first()
}

function findSteps(id){
    return db('schemes')
    .select(
        'steps.id',
        'scheme_name',
        'step_number',
        'instructions'
    )
    .join('steps', 'steps.scheme_id', 'schemes.id')
    .where({ 'schemes.id': id })
    .orderBy('step_number')
}

function add(scheme){
    return db('schemes')
    .insert(scheme)
    .then(([id]) => {
        return findById(id);
      });
}

function update(changes, id){
    return db('schemes')
    .where('id', id)
    .update(changes);
}

function remove(id){
    return db('schemes')
    .where('id', id)
    .del();
}