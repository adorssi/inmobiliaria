module.exports = (sequelize, DataTypes) => {
    
    const PropiedadComodidad = sequelize.define('PropiedadComodidad',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            propiedad_id: {
                    type: DataTypes.INTEGER,
                },
            comodidad_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'propiedad_comodidad'
        }
    );

    PropiedadComodidad.associate = function(models) {
        PropiedadComodidad.belongsTo(models.Propiedad, {
            foreignKey: 'propiedad_id',
            as: 'propiedades'
        })

        PropiedadComodidad.belongsTo(models.Comodidad, {
            foreignKey: 'comodidad_id',
            as: 'comodidades'
        })
   }
        return PropiedadComodidad;
}