
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {

    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('exp')
    try {
        const exps = await collection.find(criteria).toArray();
        // console.log('after find my exps', exps);
        // exps.forEach(exp => delete exp.password);
        return exps
    } catch (err) {
        console.log('ERROR: cannot find exps')
        throw err;
    }
}

async function getById(expId) {
    const collection = await dbService.getCollection('exp')
    try {
        const exp = await collection.findOne({ "_id": ObjectId(expId) })
        return exp
    } catch (err) {
        console.log(`ERROR: while finding exp ${expId}`)
        throw err;
    }
}

async function remove(expId) {
    const collection = await dbService.getCollection('exp')
    try {
        await collection.deleteOne({ "_id": ObjectId(expId) })
    } catch (err) {
        console.log(`ERROR: cannot remove exp ${expId}`)
        throw err;
    }
}

async function update(exp) {
    const collection = await dbService.getCollection('exp')
    exp._id = ObjectId(exp._id);
    exp.updatedAt = Date.now();
    try {
        await collection.replaceOne({ "_id": exp._id }, { $set: exp })
        return exp
    } catch (err) {
        console.log(`ERROR: cannot update exp ${exp._id}`)
        throw err;
    }
}

async function add(exp) {
    const collection = await dbService.getCollection('exp')
    try {
        await collection.insertOne(exp);
        return exp;
    } catch (err) {
        console.log(`ERROR: cannot insert exp`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    console.log('fiter', filterBy);
    if (filterBy['owner._id']) filterBy['owner._id'] = ObjectId(filterBy['owner._id'])
    if (filterBy['participants._id']) filterBy['participants._id'] = ObjectId(filterBy['participants._id'])
    
    console.log(filterBy);
    for (const filterType in filterBy) {
        if (filterBy[filterType]) {
            criteria[filterType] = (filterType === 'name') ?
                new RegExp(`${filterBy.name}`, 'i') : filterBy[filterType]
        }
    }
    // if (filterBy.expName) {
    //     criteria.expName =  new RegExp(`${filterBy.expName}`, 'i') 
    // }
    console.log('criteria myexp', criteria);
    return criteria;
}
