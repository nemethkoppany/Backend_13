import { Request, Response } from "express";
import {data} from "./data";


export const run = (req: Request, res: Response) => {
    res.status(200).send("Hello, World!");
}

export const getAllData = (req: Request, res: Response) => {
    res.status(200).json(data);
}

export const getAllDatafromId = (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send("Nem számot adtál meg!");
        return;
    }

    let resz = data.find((i:any) => i.id === id);
    if(!resz){
        res.status(404).send("Nincs ilyen id-jú termék!");
        return;
    }

    res.status(201).json(resz);
}

export const InsertDatafromId = (req: Request, res: Response) => {
    if(!req.body){
        res.status(400).send("Nincs megadott adat!");
        return;
    }

    if(req.body.name === "" || req.body.price <=0 ){
        res.status(400).send("Nem adott eleg parametert!");
        return;
    }
    let max = data[0].id;

    for(let i=0; i < data.length; i++){
        if(data[i].id > max){
            max = data[i].id;
        }
    }
    let alkatresz = data.length;

    req.body.id = alkatresz + 1;

    data.push(req.body);
    res.status(201).send(data);
}

export const DeleteDatafromId = (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send("hibas parameter");
        return;
    }

    let reszIndex = data.findIndex((i:any) => i.id === id);
    if(reszIndex === -1){
        res.status(404).send("Nincs ilyen torlendo adat!");
        return;
    }
    data.splice(reszIndex, 1);
    res.status(201).send(data);
}

export const putDatafromId = (req: Request, res: Response) => {
    let id = parseInt(req.params.id);
    if(isNaN(id)){
        res.status(400).send("Nem számot adtál meg!");
        return;
    }
    const alkat_index = data.findIndex((i:any) => i.id === id);
    if(alkat_index === -1){
        InsertDatafromId(req, res);
        return;
    }
    if(!req.body){
        res.status(400).send("Nincs eroforras!");
        return;
    }
    if(req.body.name === "" || req.body.price <=0 ){
        res.status(400).send("Nem adott eleg parametert!");
        return;
    }
    req.body.id = id;
    data[alkat_index] = req.body;
    res.status(201).send(data);
}

export const patchData = (req:any, res: any) => {
    let id = parseInt(req.params.id)
    if(isNaN(id)){
        res.status(400).send("Hibás paraméter")
        return
    }
    const alkat_index1 = data.findIndex((i:any) => i.id === id);
    if(alkat_index1 === -1){
        res.status(404).send("A beírt id nem létezik!!!!")
        return
    }
 
    if(!req.body){
        res.status(400).send("Nincs elég paraméter")
        return
    }
    Object.assign(data[alkat_index1], {
        name : req.body.name || data[alkat_index1].name,
        description :  req.body.description || data[alkat_index1].description,
        price :   req.body.price || data[alkat_index1].price,
        stock:   req.body.stock || data[alkat_index1].stock,
        pictururl: req.body.pictururl || data[alkat_index1].pictururl,
    })
}
