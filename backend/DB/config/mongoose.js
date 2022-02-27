const mongoose = require('mongoose');

const dbConnect = async () => {

    const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    });

    const url = `${db.connection.host}:${db.connection.port}`;
    //console.log(`mongoDB conectado en: ${url}`);

    try {
        
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }

}

module.exports = dbConnect;