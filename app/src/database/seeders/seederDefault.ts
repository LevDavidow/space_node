import * as _ from 'lodash';
import * as Promise from 'bluebird';
import path from '../../helpers/pathHelper';
import * as moment from 'moment';
import config from '../../config';

export default {
    seedData
};

async function seedData(db) {
    let seedPath = path.getDataRelative('seed/seedData.json');
    let seedData = require(seedPath);

    await seedUsers(db, seedData.users);

    await postImportRoutine(db);
    
    console.log('DB was seeded!');
}

function seedUsers(db, usersData) {
    return Promise.resolve(usersData)
        .map((user) => {
            return db.models.User.create(user);
        });
}

function parseDate(dateStr) {
    return moment(dateStr, config.format.date).toDate();
}

function postImportRoutine(db) {
    if (db.sequelize.dialect.name === 'postgres') {
        return Promise.resolve(_.toArray(db.models))
            .map(model => {
                return updatePostgresSequence(model, db);
            });
    }

    return Promise.resolve(null);
}

function updatePostgresSequence(model, db) {
    let tableName = model.tableName;
    let idField = model.autoIncrementField;
    let sql = `SELECT setval('${tableName}_id_seq', (SELECT MAX(${idField}) FROM ${tableName}));`;
    return db.sequelize.query(sql);
}
