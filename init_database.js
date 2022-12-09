const Product_mgmt = require("./scripts/product_management");
const User_mgmt = require("./scripts/account_management");
const {initDB} = require("./models/global");
const {sequelize} = require("./config/database");

const cat_list = {
    "Des Micros de divers types + des filtres": "Blipblop",
    "De la connectique audio": "Blipblop",
    "Un lecteur de disque externe": "Blipblop",
    "Des claviers USB pour ordinateurs": "Blipblop",
    "Des écrans d'ordinateurs": "Blipblop",
    "Connectiques réseaux (ethernet) : des switchs, des câbles et un routeur": "Blipblop",
    "Un Module SMS": "Blipblop",
    "Des PC portables et des tours": "Blipblop",
    "Divers connectiques et adaptateurs de connection pour pc": "Blipblop",
}

initDB(sequelize).then(() => {
    console.log("databse startup process complete");
    for(const [name, desc] of Object.entries(cat_list)) {
        Product_mgmt.add_category(name, desc);
    }

    User_mgmt.create_account("admin@louvainlinux.org", "supersecurepwd", true);
});
