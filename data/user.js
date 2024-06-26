var db = require('../db');

module.exports = {
    getUser: async (username) => {
        try {
            const [results] = await db.query('SELECT * FROM `User` WHERE `username` = ?', [username]);

            if(results.length === 1) {
                return results[0];
            }
        } catch(error) {
            console.error(error);
        }

        return undefined;
    },
    createUser: async (username, name) => {
        try {
            const [results] = await db.query('INSERT INTO `User` (`username`, `name`) VALUES (?, ?)', [username, name]);
            
            if(results.affectedRows === 1) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    },
    updateUser: async (newData, username) => {
        try {
            const [results] = await db.query('UPDATE `User` SET ? WHERE `username` = ?', [newData, username]);
            
            if(results.affectedRows === 1) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    },
    deleteUser: async (username) => {
        try {
            const [results] = await db.query('DELETE FROM `User` WHERE `username` = ?', [username]);

            if(results.affectedRows === 1) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    }
};