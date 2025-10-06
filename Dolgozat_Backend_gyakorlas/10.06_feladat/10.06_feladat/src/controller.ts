import { Request, Response } from "express";
import { data } from "./data";

export function server_run(req:Request, res: Response){
    res.status(200).json("A szerver fut");
}

export function getAllData(req:Request, res: Response){
    res.status(200).json(data);
}

export function getDataById(req:Request,res:Response){
    const id = parseInt(req.params.id)

    for(let i= 0; i < data.length; i++){
        if(data[i].id === id){
            res.json(data[i])
            return
        }
    }

    res.status(404).json("Az elem nem található");
}


export function deleteData(req:Request,res:Response){
    const id = parseInt(req.params.id)

    for(let i = 0; i<data.length; i++){
        if(data[i].id === id){
            data.splice(i,1)
            res.status(200).json()
            return;
        }
    }
    res.status(404).json("Az elem nem található");
}

export function postData(req : Request , res : Response){

    const newdata = req.body

    const maxId = Math.max(...data.map(d => d.id));
    newdata.id=maxId+1
    data.push(newdata)

    if(!newdata.id || !newdata.name || !newdata.description || !newdata.price || !newdata.stock || !newdata.pictururl){
        res.status(404).json("Nem található az elem")
        return
    }

    res.status(200).json(data);
}

export function patchData(req:Request, res: Response){
    const id = parseInt(req.params.id);

    const Data = data.findIndex(i => i.id === id);
    if(Data === -1){
        res.status(404).json("Nem talákható az elem");
        return
    }

    data[Data] = req.body
    res.status(200).json(data);
}

export function putData(req:Request, res:Response){
    const id= parseInt(req.params.id)
    const Data = data.findIndex(i =>i.id === id)

    if(Data === -1){
        const maxID = Math.max(...data.map(d=>d.id))
        let newData = req.body
        newData = maxID + 1
        data.push(newData)
        res.status(200).json(data)
        return;
    }

    data[Data] = req.body
    res.status(200).json(data);

}