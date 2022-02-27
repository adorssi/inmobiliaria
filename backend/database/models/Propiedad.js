module.exports = (sequelize, DataTypes) => {
    
    const Propiedad = sequelize.define('Propiedad',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
        },
        ref: {
            type: DataTypes.STRING,
        },
        moneda_id: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
        },
        financiacion: {
            type: DataTypes.BOOLEAN,
        },
        address: {
            type: DataTypes.STRING,
        },
        operationType: {
            type: DataTypes.STRING,
        },
        superficieTer: {
            type: DataTypes.INTEGER,
        },
        superficieCons: {
            type: DataTypes.INTEGER,
        },
        bedrooms: {
            type: DataTypes.INTEGER,
        },
        toilets: {
            type: DataTypes.INTEGER,
        },
        garage: {
            type: DataTypes.INTEGER,
        },
        description: {
            type: DataTypes.STRING(450),
        },
        images: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        published: {
            type: DataTypes.BOOLEAN,
        },
        featured: {
            type: DataTypes.BOOLEAN,
        },
        showPrice: {
            type: DataTypes.BOOLEAN,
        },
        galeria: {
            type: DataTypes.STRING,
        },
        localidad_id: {
            type: DataTypes.INTEGER,
        },
        tipo_id: {
            type: DataTypes.INTEGER,
        }
    },
    {
    tableName: 'propiedades'
    });

    Propiedad.associate = function(models) {

        Propiedad.belongsTo(models.Moneda, {
            foreignKey: 'moneda_id',
            as: 'moneda'
        });

        Propiedad.belongsTo(models.TipoPropiedad, {
            foreignKey: 'tipo_id',
            as: 'tipoPropiedad'
        });

        Propiedad.belongsTo(models.Localidad, {
            foreignKey: 'localidad_id',
            as: 'localidad'
        });
    
        Propiedad.belongsToMany(models.Comodidad, {
            as: 'comodidades',
            through: 'propiedad_comodidad',
            foreignKey: 'propiedad_id',
            otherKey: 'comodidad_id'
        })
       
   }
    return Propiedad;
}