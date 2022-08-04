const sqlite3 = require("sqlite3")

const db = new sqlite3.Database("scheduler.sqlite3", (err) => {
    if (err) {
        console.log("DB connection error: " + err.message)
        return
    }
    console.log("DB connection success")
})

module.exports = db