module.exports = journalsService

function journalsService(options) {
    let Journal

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Journal = options.modelService

    return {
        getAll: getAll,
        getOne: getOne,
        insert: insert,
        updateOne: updateOne,
        removeOne: removeOne
    }

    function getAll() {
        return Journal.find()
    }

    function getOne(queryCondition) {
        return Journal.findOne(queryCondition)
    }

    function insert(document) {
        let journal = new Journal(document)
        return journal.save()
    }

    function updateOne(queryCondition, doc) {
        return Journal.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Journal.findOneAndRemove(queryCondition)
    }
}
