const fs = require('fs');
const path = require('path');

const folderData = path.join(__dirname, '../data');

const usersJSON = fs.readFileSync(folderData + '/user.json', 'utf-8');
let allUsers = JSON.parse(usersJSON);

const User = {
    getAllUsers: function() {
        return allUsers;
    },
    findByField: function(field, text) {
        let users = this.getAllUsers();
        let user = users.filter(user => user[field] === text);
        return user;
    },
    create: function(userInfo) {
        let users = this.getAllUsers();
        users.push(userInfo);
        const usersString = JSON.stringify(users);
        fs.writeFileSync(folderData + '/user.json', usersString);

        return true;
    }
}

module.exports = User;
