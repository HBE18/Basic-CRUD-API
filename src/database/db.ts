import pg from "pg";
import express from "express"
import { Pool } from "pg";

const pool = new Pool({
    user : "postgres",
    password : "12345678",
    database : "postgres",
    host : "localhost",
    port : 5432
});

pool.connect
module.exports = pool;