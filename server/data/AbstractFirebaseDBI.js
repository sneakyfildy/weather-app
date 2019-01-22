class AbstractFirebaseDBI {
    constructor (firebaseInstance, rootNodeName) {
        this.rootNodeName = rootNodeName;
        this.firebase = firebaseInstance;
    }
}

module.exports = AbstractFirebaseDBI;