const CacheManager = module.exports.CacheManager = new (require("./CacheManager").CacheManager)();
const { AccountAuthRoutes } = require("./routes/authenication/accounts/AccountAuthRoutes");
const express = require("express");
const rateLimit = require("express-rate-limit");
let app = express();
app.use(express.json());
app.use(rateLimit({
    windowMs: 60000,
    max: 15
}))

app.post("/api/v1/auth/account/create", AccountAuthRoutes.createAccount);
app.get("/api/v1/auth/account/exist", AccountAuthRoutes.accountExist);
app.get("/api/v1/auth/account/auth", AccountAuthRoutes.authAccount);
app.get("/api/v1/auth/account/getData", AccountAuthRoutes.getAccountData);
app.delete("/api/v1/auth/account/delete", AccountAuthRoutes.deleteAccount);

app.listen(3000, async () => {
    console.log("GlossyRays RestAPI active... (API version: 1.0.0) [Developed by Jayrees Peterson]")
});