import { Request, Response } from "express";
import {data} from './data'

export function server_run(req:Request ,res:Response){
    res.status(200).json("A szerver fut");
}

export function allData(req:Request,res:Response){
    res.status(200).json(data);
} 

export function dataById(req:Request,res:Response){
    const id = parseInt(req.params.id);
    for(let i = 0; i < data.length;i++){
        if(data[i].id === id){
            res.json(data[i]);
            return;
        }
    }
    res.status(404).json("Nem található az elem");
}

export function postData(req:Request,res:Response){
    const body = req.body;

    let newId = 1;
    for(let i = 0;i< data.length;i++){
        if(data[i].id >= newId){
            newId = data[i].id+1
        }
    }

    const newProduct = {
        id: newId,
        name:body.name,
        description: body.description,
        price:body.price,
        stock:body.stock,
        pictururl:body.pictururl
    };

    data.push(newProduct);
    res.status(200).json(newProduct);
}

export function deleteData(req:Request,res:Response){
    const id = parseInt(req.params.id)

    for(let i = 0; i<data.length;i++){
        if(data[i].id === id){
            data.splice(i,1);
            res.status(200).json();
            return;
        }
    }
    res.status(404).json("A törlendő adat nem található");
}

export function patchData(req:Request,res:Response){
    const id = parseInt(req.params.id)
    const item = data.findIndex(i => i.id === id)

    if(item === -1){
        res.status(404).json("Az elem nem található")
        return;
    }

    data[item] = req.body
    res.status(200).json(data);
}

export function putData(req:Request,res:Response){
    const id = parseInt(req.params.id)
    const item = data.findIndex(i => i.id === id)

    if(item === -1){
        const maxID = Math.max(...data.map(d=>d.id));
        let newData = req.body
        newData.id = maxID + 1;
        data.push(newData);
        res.status(200).json(data);
        return;
    }

    data[item] = req.body
    res.status(200).json(data);
} 

