import data from "./data"

export const run = (_req: any, res: any) => {
    res.status(200).send("A szerver fut")
}

export const getALLData = (_req: any, res: any) => {
    res.status(200).send(data)
}
export const insertData = (req: Request, res: any) => {
    console.log(req.body)
    if (!req.body) {
        res.status(400).send("Nem adott meg adatokat!")
        return
    }
    let dog: any = req.body
    const index = data.length
    dog.id = index + 1
    data.push(dog)
    console.log(data)
    res.status(201).send(data)
}
export const deleteDataFromId = (req: any, res: any) => {

    let id = parseInt(req.params.id)
    if (isNaN(id)) {
        res.status(400).send("Hibás paraméter!")
        return
    }
    const index = data.findIndex((i: any) => i.id === id)
    if (index === -1) {
        res.status(404).send("Nem található a törlendő index!")
        return
    }
    data.splice(index, 1)
    res.status(204).send()
}









