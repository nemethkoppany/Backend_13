import { Request, Response } from "express";
import { products } from "./adatok";

// CREATE
export const createProduct = (req: Request, res: Response) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
};

// READ all
export const getAllProducts = (req: Request, res: Response) => {
  res.json(products);
};

// READ one
export const getProductById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

// UPDATE (PUT)
export const updateProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

// DELETE
export const deleteProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  const deleted = products.splice(index, 1)[0];
  res.json(deleted);
};

// PATCH (partial update)
export const patchProduct = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  Object.assign(product, req.body);
  res.json(product);
};
