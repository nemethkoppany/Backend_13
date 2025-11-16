import { Request, Response } from "express";
export declare const run: (req: Request, res: Response) => void;
export declare const getAllData: (req: Request, res: Response) => Promise<void>;
export declare const getDataById: (req: Request, res: Response) => Promise<void>;
export declare const posttData: (req: Request, res: Response) => Promise<void>;
export declare const deleteData: (req: Request, res: Response) => Promise<void>;
export declare const patchData: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const PutData: (req: Request, resp: Response) => Promise<void>;
