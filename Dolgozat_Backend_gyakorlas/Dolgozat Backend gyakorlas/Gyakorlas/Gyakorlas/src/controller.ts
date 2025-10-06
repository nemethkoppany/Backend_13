import { Request, Response } from "express";
import data from "./data";

export function run(_req: Request, res: Response) {
  res.send("A szerver fut");
}

export function getAllProducts(_req: Request, res: Response) {
  res.send(data);
}

export function getProductById(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      res.send(data[i]);
      return;
    }
  }

  res.status(404).send("Nincs ilyen termék!");
}

export function insertProduct(req: Request, res: Response) {
  const body = req.body;

  if (!body.name || !body.description || !body.price) {
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
    name: body.name,
    description: body.description,
    price: body.price,
    stock: body.stock || 0,
    pictururl: body.pictururl || ""
  };

  data.push(newProduct);
  res.status(201).send(newProduct);
}

export function updateProduct(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const body = req.body;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      const updatedProduct = {
        id: id,
        name: body.name,
        description: body.description,
        price: body.price,
        stock: body.stock || 0,
        pictururl: body.pictururl || ""
      };

      data[i] = updatedProduct;
      res.send(updatedProduct);
      return;
    }
  }

  res.status(404).send("Nem található a termék!");
}

export function patchProduct(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const body = req.body;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      if (body.name !== undefined) {
        data[i].name = body.name;
      }
      if (body.description !== undefined) {
        data[i].description = body.description;
      }
      if (body.price !== undefined) {
        data[i].price = body.price;
      }
      if (body.stock !== undefined) {
        data[i].stock = body.stock;
      }
      if (body.pictururl !== undefined) {
        data[i].pictururl = body.pictururl;
      }

      res.send(data[i]);
      return;
    }
  }

  res.status(404).send("Nem található a termék!");
}

export function deleteProduct(req: Request, res: Response) {
  const id = parseInt(req.params.id);

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      data.splice(i, 1);
      res.status(204).send();
      return;
    }
  }

  res.status(404).send("Nem található a termék!");
}
