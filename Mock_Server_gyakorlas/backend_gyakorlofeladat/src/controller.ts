import { Request, Response } from "express";
import config from "./config"
import Cat, {ICat} from "./cat"
import mysql from "mysql2/promise"

export const run = (req: Request, resp: Response) => {
    resp.status(200).send("A szerver fut!")
}

export const getAllData = async (req: Request, resp: Response) => {
    const connection = await mysql.createConnection(config.database)
try{
        const [results] = await connection.query(
            'Select * from cat'
        )
        resp.status(201).send(results)
}
catch(err){
    console.log(err)
    resp.status(500).send("Szerverhiba, nem sikerült elérni az adatokat!")
}


}

export const getDataFromId = async (req: Request, resp: Response) => {
    let id: number = parseInt(req.params.id);

    if(isNaN(id)){
        resp.status(400).send("Hibás paramétert adtál meg!")
    }
    const connection = await mysql.createConnection(config.database)
try{
        const [results] = await connection.query(
            'Select * from cat where id = ?', [id]
        ) as Array<any>
        if(results.length > 0){
            resp.status(201).send(results[0])
            return
        }
}
catch(err){
    console.log(err)
    resp.status(500).send("Szerverhiba, nem sikerült elérni az adatokat!")
}
}

export const InsertData = async (req: Request, resp: Response) => {
    let cat : Cat = new Cat(req.body as ICat);
    if(!cat){
        resp.status(400).send("Nem adtál meg adatokat a törzsben");
        return
    }

  

    if(cat.name === " "|| cat.breed ===" "){
        resp.status(400).send("Nem adtál meg elég adatot");
        return
    }
    const connection = await mysql.createConnection(config.database)
try{
        const [results] = await connection.query(
            'insert into cat values(null,?,?,?,?,?)', [cat.name, cat.breed, cat.gender ? 1:0, parseInt(cat.age as unknown as string), cat.picurl]
        ) as Array<any>

            resp.status(201).send(results.insertId)
    }
catch(err){
    console.log(err)
    resp.status(500).send("Szerverhiba, nem sikerült elérni az adatokat!")
}

}


export const DeleteData = async (req: Request, resp: Response) => {
    let id: number = parseInt(req.params.id);

    if(isNaN(id)){
        resp.status(400).send("Hibás paramétert adtál meg!")
    }
    const connection = await mysql.createConnection(config.database)
try{
        const [results] = await connection.query(
            'delete from cat where id = ?', [id]
        ) as Array<any>
        if(results.affectedRows > 0){
            resp.status(201).send(`Sikeresen törölt ${results.affectedRows} elemet`);
            return
        }
           
 }
 catch(err){
    console.log(err)
    
}
resp.status(404).send("Szerverhiba, nem sikerült törölni az adatot!")
}


export const PutData = async (req: Request, resp: Response) => {
    let id: number = parseInt(req.params.id);

    const cat: any = new Cat(req.body as ICat)

    if(isNaN(id)){
        resp.status(400).send("Hibás paramétert adtál meg!")
        return
    }
    if(!cat){
        resp.status(400).send("Nem adtál meg adatokat a törzsben");
        return
    }
    const allowedFields = ['name', 'breed', 'gender', 'age', 'picurl']
    const keys = Object.keys(cat).filter(key => allowedFields.includes(key))
    if(keys.length === 0){
        resp.status(400).send({error: 103, message: "Nincs frissítendő mező!"});
        return
    }
    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map(key => cat[key])
    values.push(id)
    const sql = `update cat set ${updateString} where id = ?`
    const connection = await mysql.createConnection(config.database)
try{
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        if(results.affectedRows > 0){
            resp.status(201).send(`Sikeresen törölt ${results.affectedRows} elemet`);
            return
        }
        InsertData(req, resp)
           
 }
 catch(err){
    console.log(err)
    
}

}


export const PatchData = async (req: Request, resp: Response) => {
    let id: number = parseInt(req.params.id);
    let cat : any = new Cat(req.body as ICat)
    if(isNaN(id)){
        resp.status(400).send("Hibás paramétert adtál meg!")
        return
    }
    if(!cat){
        resp.status(400).send("Nem adtál meg adatokat a törzsben");
        return
    }
    const allowedFields = ['name', 'breed', 'gender', 'age', 'picurl']
    const keys = Object.keys(cat).filter(key => allowedFields.includes(key))
    if(keys.length === 0){
        resp.status(400).send({error: 103, message: "Nincs frissítendő mező!"});
        return
    }
    const updateString = keys.map(key => `${key} = ?`).join(', ')
    const values = keys.map(key => cat[key])
    values.push(id)
    const sql = `update cat set ${updateString} where id = ?`
    const connection = await mysql.createConnection(config.database)
try{
        const [results] = await connection.query(
            sql, values
        ) as Array<any>
        if(results.affectedRows > 0){
            resp.status(201).send(`Sikeresen törölt ${results.affectedRows} elemet`);
            return
        }
        InsertData(req, resp)
           
 }
 catch(err){
    console.log(err)
    
}

}