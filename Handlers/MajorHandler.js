/**
 * @file MajorHandler.js
 * @license GPL-3.0
 * 
 * Copyright (c) 2023 Omar Lopez, 
 *                    Evelyn Oliva, 
 *                    Karen Manchado, 
 *                    Facundo Caminos, 
 *                    Ignacio Moreno,
 *                    Kevin Taylor,
 *                    Matias Cardenas
 *                    Daniel Beinat
 *                    ISFT N° 151
 *
 *  Project Supervisor: Prof. Matias Santiago Gastón
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Year: 2023
 */

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
        let results = await this.dbHandler.executeStoreProcedure('usp_read_major', data);
        console.log('MAJORDATA>>', results[0]);

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