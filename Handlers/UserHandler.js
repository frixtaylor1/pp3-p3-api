class UserHandler
{
    constructor(dbHandler)
    {
        this.dbHandler = dbHandler;
    }

    /**
     *  Crea un usuario...
     * 
     * @param object userData // username, password
     * @return object
     **/
    async create(userData)
    {
        let results = {};
        results = await this.dbHandler.executeStoreProcedure('usp_create_user',userData);

        return results;
    }

    /**
     *  elimina un usuario...
     * 
     * @param object userData // userid
     * @return object
     **/
    async remove(userData)
    {
        let results = {};
        results = await this.dbHandler.executeStoreProcedure('usp_remove_user',userData);

        return results;
    }

    /**
     *  obtiene información de un usuario...
     * 
     * @param object userData // userid
     * @return object
     **/
    async read(userData)
    {
        let results = {};
        results = await this.dbHandler.executeStoreProcedure('usp_read_user', userData);

        return results;
    }
    /**
     *  actualiza información de un usuario...
     * 
     * @param object userData // name, surname, DNI, mail, birthdate, age
     * @return object
     **/
    async update(userData)
    {
        let results = {};
        results = await this.dbHandler.executeStoreProcedure('usp_update_user', userData);

        return results;
    }
}

module.exports = { UserHandler };