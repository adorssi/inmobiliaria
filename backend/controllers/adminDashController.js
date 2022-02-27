const db = require('../database/models');

const adminDashboard={
    adminDashboard: async (req, res) => {
        try {
            const properties = await db.Propiedad.findAll({
                include: [
                    {association: 'moneda'},
                    {association: 'tipoPropiedad'},
                    {association: 'localidad'}
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            res.render('./admin/adminDashboard', {
                listadoPropiedades: properties,
            });

        } catch (error) {
            console.log(error);
        }
        
    },
    settings: (req, res) => {
        res.send('hola')
    }
}

module.exports = adminDashboard;