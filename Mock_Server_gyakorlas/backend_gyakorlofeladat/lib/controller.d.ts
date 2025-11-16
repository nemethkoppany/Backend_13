import { Request, Response } from "express";
export declare const run: (req: Request, resp: Response) => void;
export declare const getAllData: (req: Request, resp: Response) => Promise<void>;
export declare const getDataFromId: (req: Request, resp: Response) => Promise<void>;
export declare const InsertData: (req: Request, resp: Response) => Promise<void>;
export declare const DeleteData: (req: Request, resp: Response) => Promise<void>;
export declare const PutData: (req: Request, resp: Response) => Promise<void>;
export declare const PatchData: (req: Request, resp: Response) => Promise<void>;
