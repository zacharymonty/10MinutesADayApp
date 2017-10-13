module.exports = listingsService

function listingsService(options) {
    let Listing

    if (!options.modelService) {
        throw new Error('Options.modelService is required')
    }

    Listing = options.modelService

    return {
        getAll: getAll,
        getOne: getOne,
        insert: insert,
        updateOne: updateOne,
        removeOne: removeOne
    }

    function getAll() {
        return Listing.find()
    }

    function getOne(queryCondition) {
        return Listing.findOne(queryCondition)
    }

    function insert(document) {
        let listing = new Listing(document)
        return listing.save()
    }

    function updateOne(queryCondition, doc) {
        return Listing.findOneAndUpdate(queryCondition, doc, {
            new: true
        })
    }

    function removeOne(queryCondition) {
        return Listing.findOneAndRemove(queryCondition)
    }
}
