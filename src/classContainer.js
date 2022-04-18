const fs = require("fs")

module.exports = class Container {

    constructor(path) {
        this.path = path
    }

    async save(obj) {
        try {
            // Obtengo el contenido del archivo.
            let data = await fs.promises.readFile(this.path, "utf-8")
            // Lo parseo para poder manipularlo con JS.
            data = JSON.parse(data)
            // Verfico si ya tiene objetos dentro, o si está vacío.
            if ( data.length > 0 ) {
                // Array no vacío.
                // Obtengo el índice del último elemento.
                const lastIndex = data[data.length - 1].id
                // Al objeto a guardar le sumo la propiedad ID, cuyo valor es una
                // unidad mayor que el ID del elemento de la posición anterior.
                obj = { ...obj, id: (lastIndex + 1) }
            } else {
                // Array vacío
                // Al objeto guardado le sumo la propiedad ID cuyo valor es 1
                // al ser el primer objeto que se agrega al array.
                obj = { ...obj, id: 1 }
            }
            // Agrego el objeto al array.
            data.push(obj)
            // Sobrescribo el archivo con el nuevo array de objetos.
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(data, null, 3),
                "utf-8")
            return { msg: `Object saved with ID: ${obj.id}` }
        } catch (err) {
            return err
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.path, "utf-8")
            data = JSON.parse(data)
            const element = data.find( element => element.id == id )
            return element ? element : { msg: "Element not found!" }
        } catch (err) {
            return err
        }
    }

    async getAll() {
        try {
            // Obtengo el contenido del archivo.
            let data = await fs.promises.readFile(this.path, "utf-8")
            // Lo parseo para poder manipularlo con JS.
            data = JSON.parse(data)
            return data
        } catch (err) {
            return err
        }
    }

    async removeById (id) {
        try {
            // Obtengo el contenido del archivo.
            let data = await fs.promises.readFile(this.path, "utf-8")
            // Lo parseo para poder manipularlo con JS.
            data = JSON.parse(data)
            // Obtengo el índice del objeto a eliminar.
            const index = data.findIndex( element => element.id == id )
            // Elimino el objeto del array.
            data.splice(index, 1)
            // Sobrescribo el archivo con el nuevo array de objetos.
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 3), "utf-8")
            return { msg: "Object removed." }
        } catch (err) {
            return err
        }
    }
   
    async deleteAll() {
        try {
            // Sobrescribo el contenido del archivo dejando un array vacío.
            await fs.promises.writeFile(this.path, "[]", "utf-8")
            return "Empty file!"
        } catch (err) {
            return err
        }
    }

    async updateById(id, payload) {
        try {
            let data = await fs.promises.readFile(this.path, "utf-8")
            data = JSON.parse(data)
            const index = data.findIndex( element => element.id == id )
            data[index] = { ...payload, id: +id }
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 3), "utf-8")
            return (index === -1) ? { msg: "Element not found." } : { msg: "Element updated." }
        } catch (err) {
            return err
        }
    }
}
