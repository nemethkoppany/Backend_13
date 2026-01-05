import { Request, Response } from "express";
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllAutok: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAutoById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createAuto: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateAuto: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteAuto: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const postKolcsonzes: (req: Request, resp: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getKolcsonzes: (req: Request, resp: Response) => Promise<Response<any, Record<string, any>>>;
