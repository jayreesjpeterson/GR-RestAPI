const { MySQLProvider } = require("./provider/MySQLProvider");

class CacheManager {

    /** @type MySQLProvider */
    #databaseProvider;

    constructor(options) {
        this.#databaseProvider = new MySQLProvider(this);
    }

    getDatabaseProvider() {
        return this.#databaseProvider;
    }

}

module.exports = {
    CacheManager: CacheManager
};