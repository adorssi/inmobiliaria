module.exports = (sequelize, DataTypes) => {
    
    const Comodidad = sequelize.define('Comodidad',
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
            tableName: 'comodidades'
        }
    );
    Comodidad.associate = function(models) {
        Comodidad.belongsToMany(models.Propiedad, {
            as: 'propiedades',
            through: 'propiedad_comodidad',
            foreignKey: 'comodidad_id',
            otherKey: 'propiedad_id'
        })
   }
        return Comodidad;
}