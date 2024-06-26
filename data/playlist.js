var db = require('../db');

module.exports = {
    getPlaylists: async (parameters) => {
        try {
            let filter = '';
            let terms = [];

            for (const [parameter, term] of Object.entries(parameters)) {
                filter = filter + (filter.length ? ' AND' : '') + ' `' + parameter + '` = ?';
                terms.push(term);
            }

            const [results] = await db.query('SELECT * FROM `Playlist` ' + (terms.length ? 'WHERE' + filter : ''), terms);

            if(results.length) {
                return results;
            }
        } catch(error) {
            console.error(error);
        }

        return [];
    },
    createPlaylist: async (name, is_public, username) => {
        try {
            const [results] = await db.query('INSERT INTO `Playlist` (`name`, `public`, `username`) VALUES (?, ?, ?)', [name, is_public, username]);
            
            if(results.affectedRows === 1) {
                return results.insertId;
            }
        } catch (error) {
            console.error(error);
        }

        return 0;
    },
    updatePlaylist: async (newData, playlist_id) => {
        try {
            const [results] = await db.query('UPDATE `Playlist` SET ? WHERE `playlist_id` = ?', [newData, playlist_id]);
            
            if(results.affectedRows === 1) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    },
    deletePlaylist: async (playlist_id) => {
        try {
            const [results] = await db.query('DELETE FROM `Playlist` WHERE `playlist_id` = ?', [playlist_id]);

            if(results.affectedRows === 1) {
                return true;
            }
        } catch (error) {
            console.error(error);
        }

        return false;
    }
};