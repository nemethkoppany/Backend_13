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

// export function postData(req : Request , res : Response){

//     const newdata = req.body

//     const maxId = Math.max(...data.map(d => d.id));
//     newdata.id=maxId+1
//     data.push(newdata)

//     if(!newdata.id || !newdata.name || !newdata.description || !newdata.price || !newdata.stock || !newdata.pictururl){
//         res.status(404).json("Nem található az elem")
//         return
//     }

//     res.status(200).json(data);
// }

export function postData(req: Request, res: Response) {
  const body = req.body;

  if (!body.nev || !body.fajta || !body.eletkor) {
    res.status(400).send("Hiányzó mezők!");
    return;
  }

  let newId = 1;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id >= newId) {
      newId = data[i].id + 1;
    }
  }

  const newProduct = {
    id: newId,
    nev: body.nev,
    fajta: body.fajta,
    nem: body.nem,
    eletkor: body.eletkor || 0,
    kepUrl: body.kepUrl || ""
  };

  data.push(newProduct);
  res.status(201).send(newProduct);
}

export function patchData(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Érvénytelen ID formátum" });
    }

    const index = data.findIndex(i => i.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Nem található az elem" });
    }
    data[index] = { ...data[index], ...req.body };

    res.status(200).json(data[index]);
}


export function putData(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const index = data.findIndex(i => i.id === id);

    if (index === -1) {
        const maxID = Math.max(...data.map(d => d.id), 0);
        const newData = { ...req.body, id: maxID + 1 };
        data.push(newData);
        return res.status(201).json(newData);
    }

    data[index] = { ...data[index], ...req.body, id };

    return res.status(200).json(data[index]);
}
