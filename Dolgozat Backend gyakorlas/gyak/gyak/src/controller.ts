import { Request,Response } from "express";
import {data} from "./data"

export function server_running (req: Request, res: Response){
    res.status(200).json("A szerver fut");
}

export function getAllData(req : Request , res : Response){
 res.status(200).json(data);
}


export function getDataById(req : Request , res : Response){
    const id= parseInt(req.params.id)
    const item = data.find(i => i.id ===id)

    if(!item){
        res.status(404).json("fogyi vagy")
        return
    }

    res.status(200).json(item);
}


export function deletDataById(req : Request , res : Response){

    const id= parseInt(req.params.id)
    const index = data.findIndex(i => i.id ===id)
    data.splice(index,1)

    if(!index){
        res.status(404).json("fogyi vagy")
        return
    }

    res.status(200).json(data);
}

export function postData(req : Request , res : Response){

    const newdata = req.body

    const maxId = Math.max(...data.map(d => d.id));
    newdata.id=maxId+1
    data.push(newdata)

    if(!newdata.id || !newdata.name || !newdata.description || !newdata.price || !newdata.stock || !newdata.pictururl){
        res.status(404).json("fogyi vagy")
        return
    }

    res.status(200).json(data);
}


export function patchDataById (req : Request , res : Response){

    const id= parseInt(req.params.id)
    const item = data.findIndex(i => i.id ===id)

    if(item===-1){
        res.status(404).json("fogyi vagy")
        return
    }
    
    data[item] = req.body

    res.status(200).json(data);
}



export function putDataById (req : Request , res : Response){

    const id= parseInt(req.params.id)
    const item = data.findIndex(i => i.id ===id)

    if(item===-1){
        
        const maxId = Math.max(...data.map(d => d.id));
        let newdata=req.body
        newdata.id=maxId+1
        data.push(newdata)
        res.status(200).json(data);
        return
    }
    
    data[item] = req.body

    res.status(200).json(data);
}