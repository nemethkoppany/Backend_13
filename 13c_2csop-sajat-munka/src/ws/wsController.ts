import {  Response } from "express";
import mysql from "mysql2/promise";
import config from "../config/config";


export async function getMessages(req: any, res: Response) {
  const roomId = Number(req.query.roomId);
  if (!roomId) {
    return res.status(400).json({ error: "Szoba ID szükséges" });
  }

  const userId = req.user.userId;
  const connection = await mysql.createConnection(config.database);

  try {
    const [results] = await connection.query(
      `SELECT 
          m.messageId,
          m.content,
          m.isPrivate,
          m.createdAt,
          u.email AS senderEmail,
          u.avatar AS avatar
       FROM messages m
       JOIN users u ON m.senderId = u.userId
       WHERE m.roomId = ? AND (m.isPrivate = 0 OR m.senderId = ? OR m.receiverId = ?)
       ORDER BY m.createdAt ASC`,
      [roomId, userId, userId]
    ) as any;

    await connection.end();
    return res.status(200).json(results); // mindig JSON
  } catch (err) {
    console.log(err);
    await connection.end();
    return res.status(500).json({ error: "Szerver hiba" }); // JSON formátum
  }
}