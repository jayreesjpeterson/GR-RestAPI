const { Connection } = require("database-js");
const databasejs = require("database-js");

class MySQLProvider {

  /** @type CacheManager */
  #cacheManager;

  /** @type databasejs.Connection */
  #database;
  /** @type string */
  #databaseString;

  constructor(cacheManager) {
    this.#cacheManager = cacheManager;
    this.#databaseString = "mysql://pandaz:MySQL123.com@127.0.0.1:3306/GlossyRays";
    this.#database = new Connection(this.#databaseString);
    this.init().then();

    setInterval(async () => {
      await this.refreshDatabase();
    }, 1.8e+6);
  }

  async init() {
    await this.#database.prepareStatement("CREATE TABLE IF NOT EXISTS gr_0456_accounts(token TEXT, email TEXT, password TEXT)").query();
  }

  async refreshDatabase() {
    if(typeof this.#database === "object" && this.#database instanceof Connection) {
      await this.#database.close();
      this.#database = new Connection(this.#databaseString);
    }else throw new TypeError("Invalid object type detected for private property \"database\" expected \"Connection\" got \""+this.#database.constructor.name+"\".")
  }

  /**
   * @returns {databasejs.Connection}
   */
  getDatabase() {
    return this.#database;
  }

  async setDatabase(databaseString) {
    if(typeof databaseString === "string") {
      this.#databaseString = databaseString;
      await this.refreshDatabase();
    }else throw new TypeError("Invalid object type given expected \"String\" got \""+databaseString.constructor.name+"\".")
  }

}

module.exports = {
    MySQLProvider: MySQLProvider
};