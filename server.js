const express = require("express")
const app = express()

const db = require("./database")

app.listen( 3001, () => {
    console.log("Server running in port 3001")
})

app.get("/launchschema", (req,res) => {
    //----------------------------------------------------------------------------
    db.run(`
        CREATE TABLE IF NOT EXISTS sessions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            key TEXT,
            email TEXT,
            state INTEGER,
            selections TEXT
        )`, (err) => {
            if (err) {
                console.log("Create table 'sessions' error: " + err.message)
            }
        }
    )
    //----------------------------------------------------------------------------
    db.run(`
        CREATE TABLE IF NOT EXISTS answers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session INTEGER,
            key TEXT,
            name TEXT,
            email TEXT,
            state INTEGER,
            selections TEXT
        )`, (err) => {
            if (err) {
                console.log("Create table 'answers' error: " + err.message)
            }
        }
    )
    //----------------------------------------------------------------------------
    
    res.send("Launching schema")
})

app.get("/inserttestdata", (req,res) => {
    //----------------------------------------------------------------------------
    
    let sql1 =  `INSERT INTO sessions(id,key,email,state,selections) 
                    VALUES(?,?,?,?,?)`

    db.run(sql1, [1,"S01","gonzalohernandez@hotmail.com",1,"[]"])
    db.run(sql1, [2,"S02","gonzalohernandez@hotmail.com",1,"[108,109,110,111,112,208,209,210,211,308,309,310,311]"])

    //----------------------------------------------------------------------------
    
    let sql2 =  `INSERT INTO answers(id,session,key,name,email,state,selections) 
                    VALUES(?,?,?,?,?,?,?)`
    
    db.run(sql2, [1,1,"A11","Maria","@",1,"[514,515,516,517]"])
    db.run(sql2, [2,1,"A12","Pablo","@",1,"[408,409]"])
    db.run(sql2, [3,1,"A13","M1ria","@",1,"[]"])

    db.run(sql2, [4,2,"A21","Juan", "@",1,"[110,111,310,311]"])
    db.run(sql2, [5,2,"A22","Ana",  "@",1,"[210,211,310,311]"])
    db.run(sql2, [6,2,"A23","Pedro","@",1,"[110,111,310,311]"])    

    //----------------------------------------------------------------------------
    
    res.send("Inserting Test Data")
})

app.get("/session/:id", (req,res) => {
    db.get(`
        SELECT * FROM sessions WHERE id= ?
        `, [req.params.id], (err,rows) => {
            if (err) {
                console.log("Retrieve 'session' error: " + err.message)
                return
            }
            res.send(rows)
        })
})