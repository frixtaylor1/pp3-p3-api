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

        try {
            await this.dbHandler.connect();

            results = await this.dbHandler.executeStoreProcedure('usp_create_major', data);
        
        } catch (error) {
            results = error;
            console.error(error);
        
        } finally {
            await this.dbHandler.close();
        }

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

        try {
            await this.dbHandler.connect();

            results = await this.dbHandler.executeStoreProcedure('usp_remove_major', data);

        } catch (error) {
            results = error;
            console.error(error);
        
        } finally {
            await this.dbHandler.close();
        }

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

        try {
            await this.dbHandler.connect();

            results = await this.dbHandler.executeStoreProcedure('usp_read_major', data);

        } catch (error) {
            results = error;
            console.error(error);
        
        } finally {
            await this.dbHandler.close();
        }

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

        try {
            await this.dbHandler.connect();

            results = await this.dbHandler.executeStoreProcedure('usp_update_major', data);

        } catch (error) {
            results = error;
        
        } finally {
            await this.dbHandler.close();
        }

        return results;
    }
};

module.exports = { MajorHandler };