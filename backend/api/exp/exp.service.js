
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

async function query(filterBy = {},numOfExps = 0) {
    let exps;
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('exp')
    try {
        if (criteria.length) exps = await collection.find({ $and: criteria }).limit(numOfExps).toArray();
        else exps = await collection.find().toArray();
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
    console.log('update');
    const collection = await dbService.getCollection('exp')
    exp._id = ObjectId(exp._id);
    exp.owner._id = ObjectId(exp.owner._id)
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
    exp._id = ObjectId(exp._id);
    exp.owner._id = ObjectId(exp.owner._id)
    console.log('add-service', exp.name);
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
    // const criteria = {};
    const criteriaArr = [];
    let criteriaToReturn = [];

    // for free text search - find in 'name' OR 'city' OR 'tags'
    if (filterBy['freeTxt']) {
        const value = filterBy['freeTxt'];
        freeTxtFilter = {};
        freeTxtFilter.name = value;
        freeTxtFilter['location.city'] = new RegExp(`${value}`, 'i')
        freeTxtFilter.tags = value

        for (const filterType in freeTxtFilter) {
            if (freeTxtFilter[filterType]) {
                criteriaArr.push({ [filterType]: freeTxtFilter[filterType] })
            }
        }
        criteriaToReturn.push({ '$or': criteriaArr })
        filterBy['freeTxt'] = ''
    }

    if (filterBy['capacity']) {
        filterBy['capacity.max'] = { $gt: +filterBy['capacity'] }
        filterBy['capacity.min'] = { $lt: +filterBy['capacity'] }
        filterBy['capacity'] = '';
    }

    if (filterBy['schedule.at']) {
        const scheduleInMs = +filterBy['schedule.at'];
        filterBy['schedule.at'] = { $gte: scheduleInMs }
        criteriaToReturn.push({ 'schedule.at': { $gte: (scheduleInMs - 1000*60*60*3) } }, { 'schedule.at': { $lt: (scheduleInMs + 1000 * 60 * 60 * 21) } })
        filterBy['schedule.at'] = '';
    }

    for (const filterType in filterBy) {
        switch (filterType) {
            case 'owner._id':
                filterBy['owner._id'] = ObjectId(filterBy['owner._id'])
                break;
            case 'participants._id':
                filterBy['participants._id'] = ObjectId(filterBy['participants._id'])
                break;
            case 'name':
                filterBy['name'] = new RegExp(`${filterBy.name}`, 'i')
                break;
            case 'location.city':
                filterBy['location.city'] = new RegExp(`${filterBy['location.city']}`, 'i')
                break;

            default:
                break;
        }

        if (filterBy[filterType]) {
            criteriaToReturn.push({ [filterType]: filterBy[filterType] })
        }
    }
    return criteriaToReturn;
}
