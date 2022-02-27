module.exports = (sequelize, DataTypes) => {
    
    const Moneda = sequelize.define('Moneda',
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
            tableName: 'monedas'
        }
    );
    Moneda.associate = function(models) {
        Moneda.hasMany(models.Propiedad, {
            foreignKey: 'moneda_id',
            as: 'propiedades'
        })
   }
        return Moneda;
}