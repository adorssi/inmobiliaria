module.exports = (sequelize, DataTypes) => {
    
    const Usuario = sequelize.define('Usuario',
        {
            id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
            },
            email: {
                type: DataTypes.STRING
            },
            name: {
                    type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            rol_id: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: 'usuarios'
        }
    );
        return Usuario;
}