import {  Response } from "express";
import mysql from "mysql2/promise";
import config from "../config/config";


export async function getMessages(req: any, res: Response) {
  const roomId = Number(req.query.roomId); 

  if (!roomId) {
    return res.status(400).send("Szoba ID szükséges");
  }

  const connection = await mysql.createConnection(config.database);

  try {
    const [results] = await connection.query(
      `SELECT m.messageId, m.content, m.isPrivate, m.createdAt, u.email AS senderEmail
       FROM messages m
       JOIN users u ON m.senderId = u.userId
       WHERE m.isPrivate = false AND m.roomId = ?
       ORDER BY m.createdAt ASC`,
      [roomId]
    ) as Array<any>;

    return res.status(200).send(results); 
  } catch (err) {
    console.log(err);
    return res.status(500).send("Szerver hiba"); 
  }
}