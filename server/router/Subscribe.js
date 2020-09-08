const express = require("express");
const subscribeRouter = express.Router();
const webPush = require("web-push");

subscribeRouter.post("/", async (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "WEBOX" });
    webPush
        .sendNotification(subscription, payload)
        .catch(err => console.error(err));
});

module.exports = subscribeRouter;