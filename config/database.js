const {Sequelize , DataTypes , Model} = require('sequelize');

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "louevainlinux.sqlite"
})

class Admins extends Model{}
Admins.init({
    email:{
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true,
        validate:{
            isEmail: true
        }
    },
    nom: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mot_de_passe: {
        type: DataTypes.TEXT,
        allowNull: false

    }
},({sequelize}));

class Produits extends Model{}
Produits.init({
    produitID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    prix:{
        type: DataTypes.REAL,
        allowNull: false,
    },
    quantite:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    specification: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    }
},({sequelize}));

class Commandes extends Model{}
Commandes.init({
    commandeID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    produitID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Produits,
            key: 'produitID'
        }
    },
    quantite:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_debut:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    date_fin:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    date_recu:{
        type: DataTypes.TEXT,
        validate: {
            isDate: true
        }
    },
    date_reception:{
        type: DataTypes.TEXT,
        validate: {
            isDate: true
        }
    },
    gsm:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    email:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    adresse:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    nom_du_client:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    paye:{
        type: DataTypes.TEXT,
        defaultValue: "Non"
    },
    assure:{
        type: DataTypes.TEXT,
        defaultValue: "Non"
    },
    admin:{
        type: DataTypes.TEXT,
        allowNull: false,
        references:{
            model: Admins,
            key: 'email'
        }
    }
},({sequelize}));

class Historique extends Model{}
Historique.init({
    historiqueID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    produit:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Produits,
            key: 'produitID'
        }
    },
    quantite:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date_debut:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    date_fin:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    gsm:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    email:{
        type: DataTypes.TEXT,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    assure:{
        type: DataTypes.TEXT,
        defaultValue: "Non"
    },
    commentaire:{
        type: DataTypes.TEXT
    },
    admin:{
        type: DataTypes.TEXT,
        allowNull: false,
        references:{
            model: Admins,
            key: 'email'
        }
    }
},({sequelize}));

sequelize.sync()
module.exports = {sequelize};