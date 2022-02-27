module.exports = (sequelize, DataTypes) => {
    
    const tipoPropiedad = sequelize.define('TipoPropiedad',
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
            tableName: 'tipos'
        }
    );

    tipoPropiedad.associate = function(models) {
        tipoPropiedad.hasMany(models.Propiedad, {
            foreignKey: 'tipo_id',
            as: 'propiedades'
        })
   }
        return tipoPropiedad;
}