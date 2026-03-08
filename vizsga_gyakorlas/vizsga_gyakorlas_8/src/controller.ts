import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import config from "./config";

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  const connection = await mysql.createConnection(config.database);
  try {
    const [result]: any = await connection.query(
      `
            SELECT login(?,?) as id
            `,
      [email, password],
    );

    const token = jwt.sign({ userID: result[0].id }, config.JwtSecret, {
      expiresIn: "2h",
    });

    if (result[0].id === 0) {
      return res.status(401).json({ message: "Hibás email vagy jelszó" });
    }

    return res.status(200).json({ token: token });
  } catch (err) {
    console.log(err);
  }
};


export const insertPet = async(req:any, res:any ) =>{
    const connection = await mysql.createConnection(config.database);

    try{
        const [result]:any = await connection.query(`
            INSERT INTO pet VALUES(NULL,?,?,?,?,?)
            `,[req.body.nev,req.body.leiras,Number(req.body.ar),Number(req.body.raktaron),req.body.kep])
    
            if(result.affectedRows ===0){
                return res.status(404).json("Valami nem jó")
            }

            return res.status(200).json("Siker");
        }
    catch(err){
        return console.log(err);
    }
}