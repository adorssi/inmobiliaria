const bcryptjs = require('bcryptjs');

function crypt(password) {
    const hash = bcryptjs.hashSync(password);
    console.log(hash);
}

crypt('admin')