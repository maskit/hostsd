function DataStore () {
    this.data = {};
};

DataStore.prototype.set = function (key, value) {
    this.data[key] = value;
};

DataStore.prototype.get = function (key) {
    return this.data[key];
};

module.exports = DataStore;
