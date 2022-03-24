const fs = require("fs");

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async save(title, price, thumbnail) {
    try {
      const newEntry = { title, price, thumbnail };
      const entries = await this._getEntriesFromFile();
      let newEntryId = 1;
      if (entries.length > 0) {
        const entryIds = entries.map((e) => e.id);
        const maxId = Math.max(...entryIds);
        newEntryId = maxId + 1;
      }
      newEntry.id = newEntryId;
      entries.push(newEntry);
      await this._saveEntriesToFile(entries);
      return newEntryId;
    } catch (error) {
      console.error(
        `Ha ocurrido un error agregando el contenido: ${error.description}`
      );
      return -1;
    }
  }

  async getById(id) {
    try {
      const entries = await this._getEntriesFromFile();
      const searchedEntry = entries.find((e) => e.id === id);
      if (typeof searchedEntry === "undefined") {
        return null;
      }
      return searchedEntry;
    } catch (error) {
      console.error(
        `Ha ocurrido un error obteniendo la entrada de id ${id}: ${error.description}`
      );
    }
  }

  async getAll() {
    try {
      const entries = await this._getEntriesFromFile();
      return entries;
    } catch (error) {
      console.error(
        `Ha ocurrido un error obteniendo todos los contenidos del archivo: ${error.description}`
      );
    }
  }

  async deleteByid(id) {
    try {
      const entries = await this._getEntriesFromFile();
      const filteredEntries = entries.filter((e) => e.id !== id);
      await this._saveEntriesToFile(filteredEntries);
    } catch (error) {
      console.error(
        `No se ha podido eliminar la entrada con el Id ${id}: ${error.description}.`
      );
    }
  }

  async deleteAll() {
    try {
      await this._saveEntriesToFile([]);
    } catch (error) {
      console.error(
        `No se han podido eliminar todos los contenidos: ${error.description}`
      );
    }
  }

  /**
   * PRIVATE METHODS.
   */
  async _getEntriesFromFile() {
    try {
      const fileExists = fs.existsSync(this.filePath);
      if (!fileExists) {
        return [];
      }
      const fileContent = await fs.promises.readFile(this.filePath, "utf8");
      const entries = JSON.parse(fileContent);
      return entries;
    } catch (error) {
      console.log(error);
      console.error(
        `Error obteniendo el contenido del archivo: ${error.description}.`
      );
      throw error;
    }
  }

  async _saveEntriesToFile(entries) {
    try {
      const JSONEntries = JSON.stringify(entries);
      const fileExists = fs.existsSync(this.filePath);
      if (fileExists) {
        await fs.promises.unlink(this.filePath);
      }
      await fs.promises.writeFile(this.filePath, JSONEntries, "utf-8");
    } catch (error) {
      console.error(
        `Error guardando el contenido del archivo: ${error.description}.`
      );
      throw error;
    }
  }
}

module.exports = Contenedor;
