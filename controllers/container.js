import fs from "fs";
//import   productsController   from './controllerProducts.js';
export default class Container {
  constructor(fileName) {
    this.fileName = fileName;
    this.objects = this.readData();
  }
  //////// Genera un ID /////////
  generateId() {
    try {
      if (this.objects.length === 0) return 1;
      return this.objects[this.objects.length - 1].id + 1;
    } catch (err) {
      console.log(err);
    }
  }
  ////////// Guarda un objeto //////////
  async save(obj) {
    try {
      obj.id = await this.generateId();
      obj.timestamp = Date.now();

      this.objects.push(obj);
      this.writeData();
      return obj.id;
    } catch (err) {
      console.log(err);
    }
  }
  ////////// Trae el objeto con el id seleccionado //////////
  getById(id) {
    try {
      const obj = this.objects.find((el) => el.id == id);
      return obj ? obj : null;
    } catch (err) {
      console.log(err);
    }
  }
  ////////////  Trae todos los objetos del array ///////////
  getAll() {
    try {
      return this.objects;
    } catch {
      return [];
    }
  }
  ///////////Elimina del archivo el objeto con el ID buscado  ///////// /////////
  deleteById(id) {
    try {
      let indexObj = this.objects.findIndex((obj) => obj.id === id);
      if (indexObj === -1) return indexObj;
      this.objects.splice(indexObj, 1);
      const productsController = require("./controllerProducts");
    } catch (err) {
      console.log(err);
    }
  }
  //////////// Borra todos los objetos en el archivo //////////
  async deleteAll() {
    try {
      this.objects = [];
      this.writeData();
    } catch (err) {
      console.log(err);
    }
  }
  update(id, data) {
    const indexObj = this.objects.findIndex((obj) => obj.id === id);

    if (indexObj !== -1) {
      this.objects[indexObj] = { ...this.objects[indexObj], ...data, id };

      this.writeData();
    }
  }
  readData() {
    try {
      return JSON.parse(fs.readFileSync(this.fileName, "utf-8"));
    } catch (error) {
      console.log(error);
      if (error.message.includes("no such file or directory")) return [];
    }
  }
  async writeData() {
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(this.objects, null, 2)
    );
  }
}
