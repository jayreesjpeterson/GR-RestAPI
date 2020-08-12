const { CacheManager } = require("../../../index");
const bcrypt = require("bcrypt");

class AccountAPI {

    /**
     * @param {string} email
     * @param {string} password
     */
    static async createAccount(email, password) {
        if((await this.accountExist(email)).doesExist === false) {
            if(this.__validateEmail(email).message === true) {
                if(this.__validatePassword(password).message === true) {
                    await CacheManager.getDatabaseProvider().getDatabase().prepareStatement("REPLACE INTO gr_0456_accounts(token, email, password) VALUES (?, ?, ?)").query(this.__generateToken(), email, await bcrypt.hash(password, 10));

                    return {
                        code: 200,
                        message: "Account successfully created."
                    }
                }else return this.__validatePassword(password)
            }else return this.__validateEmail(email);
        }else return {
            code: 500,
            message: "An account under the email \""+email+"\" already exist."
        }
    }

    static __generateToken() {
        let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUWXYZ123456789.$";
        let token = "";

        for(let i = 0; i < 32; i++) {
            token+=chars[Math.floor(Math.random() * chars.length)];
        }

        token = token.split("")
        token[16] = ".";
        token = token.join("")

        return token;
    }

    /**
     * @param {string} email
     * @returns {{code: number, message: string}|{code: number, message: boolean}}
     * @private
     */
    static __validateEmail(email) {
        if(email !== undefined) {
            if (typeof email === "string") {
                if (email.includes("@")) {
                    if (email.includes(".")) {
                        return {
                            code: 200,
                            message: true
                        }
                    } else return {
                        code: 500,
                        message: "Provided email must include a domain."
                    }
                } else return {
                    code: 500,
                    message: "Provided email must include an @."
                }
            } else return {
                code: 500,
                message: "Invalid object type given expected \"string\" got \"" + email.constructor.name + "\"."
            }
        }else return {
            code: 500,
            message: "Invalid object type given. Expected \"string\" got \"undefined\"."
        }
    }

    static __validatePassword(password) {
        let hasNumbers = false;
        let hasCaptialLetter = false;
        let hasLowercaseLetter = false;

        if(password !== undefined) {
            if(typeof password === "string") {
                if(password.length >= 6) {
                    if(!password.includes(" ")) {
                        let numberArray = [1,2,3,4,5,6,7,8,9,0];
                        let splitPassword = password.split("");

                        splitPassword.forEach((char) => {
                            let isNumber = false;

                            numberArray.forEach((number) => {
                                if(char === number.toString()) {
                                    hasNumbers = true;
                                    isNumber = true;
                                }
                            });

                            if(char === char.toUpperCase() && !isNumber) {
                                hasCaptialLetter = true;
                            }

                            if(char === char.toLowerCase() && !isNumber) {
                                hasLowercaseLetter = true;
                            }
                        });

                        if(hasNumbers) {
                            if(hasCaptialLetter) {
                                if(hasLowercaseLetter) {
                                    return {
                                        code: 200,
                                        message: true
                                    }
                                }else return {
                                    code: 500,
                                    message: "Provided password does not contain any lower case characters."
                                }
                            }else return {
                                code: 500,
                                message: "Provided password does not contain any upper case characters."
                            }
                        }else return {
                            code: 500,
                            message: "Provided password does not contain any numbers."
                        }
                    }else return {
                        code: 500,
                        message: "Provided password contains illegal character \" \". (Space)"
                    }
                }else return {
                    code: 500,
                    message: "Provided password does not contain enough characters. (Minimum: 6)"
                }
            }else return {
                code: 500,
                message: "Illegal object type given. Expected \"string\" got \""+password.constructor.name+"\"."
            }
        }else return {
            code: 500,
            message: "Illegal object type given. Expected \"string\" got \"undefined\"."
        }
    }

    static async accountExist(email) {
        if(email !== undefined) {
            if(typeof email === "string") {
                let data = await CacheManager.getDatabaseProvider().getDatabase().prepareStatement("SELECT * FROM gr_0456_accounts WHERE email = ?").query(email);

                if (data.length === 0) {
                    return {
                        code: 200,
                        doesExist: false
                    }
                } else return {
                    code: 200,
                    doesExist: true
                }
            }else return {
                code: 500,
                message: "Invalid object type given. Expected \"string\" got \""+email.constructor.name+"\"."
            }
        }else return {
            code: 500,
            message: "Invalid object type given. Expected \"string\" got \"undefined\"."
        }
    }

    static async __accountExist(token) {
        if(token !== undefined) {
            if(typeof token === "string") {
                let data = await CacheManager.getDatabaseProvider().getDatabase().prepareStatement("SELECT * FROM gr_0456_accounts WHERE token = ?").query(token);

                if (data.length === 0) {
                    return {
                        code: 200,
                        doesExist: false
                    }
                } else return {
                    code: 200,
                    doesExist: true
                }
            }else return {
                code: 500,
                message: "Invalid object type given. Expected \"string\" got \""+token.constructor.name+"\"."
            }
        }else return {
            code: 500,
            message: "Invalid object type given. Expected \"string\" got \"undefined\"."
        }
    }

    /**
     * @param {string} email
     * @param {string} password
     *
     * NOTE: This returns the user's token given the credentials are correct.
     */
    static async authAccount(email, password) {
        if(email !== undefined && password !== undefined) {
            if (typeof email === "string" && typeof password === "string") {
                if ((await this.accountExist(email)).doesExist === true) {
                    let accountData = await CacheManager.getDatabaseProvider().getDatabase().prepareStatement("SELECT * FROM gr_0456_accounts WHERE email = ?").query(email);

                    if (await bcrypt.compare(password, accountData[0].password)) {
                        return {
                            code: 200,
                            token: accountData[0].token
                        }
                    } else return {
                        code: 500,
                        message: "Authentication request denied. Reason: Password is incorrect."
                    }
                } else return {
                    code: 500,
                    message: "Authentication request denied. Reason: Account with this email does not match our records."
                }
            } else return {
                code: 500,
                message: "Invalid object types given. Expected \"string\" and \"string\" got \"" + email.constructor.name + "\" and \'" + password.constructor.name + "\""
            }
        } else return {
            code: 500,
            message: "Invalid object types given. Expected \"string\" and \"string\" got \"undefined\" and \'undefined\""
        }
    }

    /**
     * @param {string} token
     * @returns {Promise<{email: *}>}
     *
     * NOTE: This returns all the Account's data if authenticated.
     */
    static async getAccountData(token) {
        if(token !== undefined) {
            if(typeof token === "string") {
                if((await this.__accountExist(token)).doesExist === true) {
                    let accountData = await CacheManager.getDatabaseProvider().getDatabase().prepareStatement("SELECT * FROM gr_0456_accounts WHERE token = ?").query(token);
                    accountData = accountData[0];

                    return {
                        code: 200,
                        email: accountData.email
                    }
                }else return {
                    code: 500,
                    message: "Account with provided token does exist."
                }
            }else return {
                code: 500,
                message: "Invalid object type given. Expected \"string\" got \""+token.constructor.name+"\"."
            }
        }else return {
            code: 500,
            message: "Invalid object type given. Expected \"string\" got \"undefined\""
        }
    }

     /**
     * @param {string} token
     * @returns {Promise<{code: number, message: string}>}
     *
     * NOTE: Only allows the deletion of account if no current orders are placed.
     */
    static async deleteAccount(token) {
        if(token !== undefined) {
            if(typeof token === "string") {
                if((await this.__accountExist(token)).doesExist === true) {
                    await CacheManager.getDatabaseProvider().getDatabase().prepareStatement("DELETE FROM gr_0456_accounts WHERE token = ?").query(token);

                    return {
                        code: 200,
                        message: "Account has been completely removed from the database."
                    }
                }else return {
                    code: 500,
                    message: "Account termination canceled. Reason: Account under provided token does not exist."
                }
            }else return {
                code: 500,
                message: "Invalid object type given. Expected \"string\" got \""+token.constructor.name+"\"."
            }
        }else return {
            code: 500,
            message: "Invalid object type given. Expected \"string\" got \"undefined\""
        }
    }

}

module.exports = {
    AccountAPI: AccountAPI
};