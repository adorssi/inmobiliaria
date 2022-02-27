module.exports = (sequelize, DataTypes) => {
    
    const Localidad = sequelize.define('Localidad',
        {
            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING
                }
        },
        {
            timestamps: false,
            tableName: 'localidades'
        }
    );

    Localidad.associate = function(models) {
        Localidad.hasMany(models.Propiedad, {
            foreignKey: 'localidad_id',
            as: 'propiedades'
        })
   }

        return Localidad;
}