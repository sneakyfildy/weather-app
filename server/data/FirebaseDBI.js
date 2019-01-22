const AbstractFirebaseDBI = require('./AbstractFirebaseDBI');

class FirebaseDBI extends AbstractFirebaseDBI{

    addItem(item) {
        this.getRoot().push(item);
    }

    clear(item) {
        this.getRoot().set({});
    }

    getRoot() {
        return this.firebase.database().ref(this.rootNodeName);
    }
};

module.exports = FirebaseDBI;