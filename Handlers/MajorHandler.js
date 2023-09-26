class MajorHandler {
    constructor(dbHandler) {
        this.dbHandler = dbHandler;
    }

    /**
     *  Crea una carrera...
     * 
     * @param object data // name, capacity, description
     * @return object
     **/
    async create(data) {
        let results = {};
        
        results = await this.dbHandler.executeStoreProcedure('usp_create_major', data);
        
        return results;
    }

    /**
     *  Elimina una carrera...
     * 
     * @param object data // idmajor
     * @return object
     **/
    async remove(data) {
        let results = {};

        results = await this.dbHandler.executeStoreProcedure('usp_remove_major', data);

        return results;
    }

    /**
     *  Lee los datos de la carrera...
     * 
     * @param object data // idmajor
     * @return object
     **/
    async read(data) {
        let results = {};

        results = await this.dbHandler.executeStoreProcedure('usp_read_major', data);

        return results;
    }

    /**
     *  Actualiza los datos de la carrera...
     * 
     * @param object data // idmajor, name, capacity, description
     * @return object
     **/
    async update(data) {
        let results = {};

        results = await this.dbHandler.executeStoreProcedure('usp_update_major', data);

        return results;
    }
};

module.exports = { MajorHandler };