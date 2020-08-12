const { AccountAPI } = require("./AccountAPI");

class AccountAuthRoutes {

    /**
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<void>}
     */
    static async createAccount(request, response) {
        response.setHeader("X-Powered-By", "Jayrees Peterson");
        response.setHeader("Connection", "close");

        let APIResponse = await AccountAPI.createAccount(request.body.email, request.body.password);

        response.status(APIResponse.code);
        response.json(APIResponse);
    }

    /**
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<void>}
     */
    static async accountExist(request, response) {
        response.setHeader("X-Powered-By", "Jayrees Peterson");
        response.setHeader("Connection", "close");

        let APIResponse = await AccountAPI.accountExist(request.body.email);

        response.status(APIResponse.code);
        response.json(APIResponse);
    }

    /**
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<void>}
     */
    static async authAccount(request, response) {
        response.setHeader("X-Powered-By", "Jayrees Peterson");
        response.setHeader("Connection", "close");

        let APIResponse = await AccountAPI.authAccount(request.body.email, request.body.password);

        response.status(APIResponse.code);
        response.json(APIResponse);
    }

    /**
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<void>}
     */
    static async getAccountData(request, response) {
        response.setHeader("X-Powered-By", "Jayrees Peterson");
        response.setHeader("Connection", "close");

        let APIResponse = await AccountAPI.getAccountData(request.header("Authorization"));

        response.status(APIResponse.code);
        response.json(APIResponse);
    }

    /**
     * @param {Request} request
     * @param {Response} response
     * @returns {Promise<void>}
     */
    static async deleteAccount(request, response) {
        response.setHeader("X-Powered-By", "Jayrees Peterson");
        response.setHeader("Connection", "close");

        let APIResponse = await AccountAPI.deleteAccount(request.header("Authorization"));

        response.status(APIResponse.code);
        response.json(APIResponse);
    }

}

module.exports = {
    AccountAuthRoutes: AccountAuthRoutes
};