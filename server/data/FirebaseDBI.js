const AbstractFirebaseDBI = require('./AbstractFirebaseDBI');

class FirebaseDBI extends AbstractFirebaseDBI{

    addItem(item) {
        return this.getRoot().push(item);
    }

    clear() {
        return this.getRoot().set({});
    }

    getRoot() {
        return this.firebase.database().ref(this.rootNodeName);
    }
};

module.exports = FirebaseDBI;