const Product_mgmt = require("./scripts/product_management");
const User_mgmt = require("./scripts/account_management");
const {initDB} = require("./models/global");
const {sequelize} = require("./config/database");

const cat_list = {
    "Des Micros de divers types + des filtres": "blabla category description blabla",
    "De la connectique audio": "blabla category description blabla",
    "Un lecteur de disque externe": "blabla category description blabla",
    "Des claviers USB pour ordinateurs": "blabla category description blabla",
    "Des écrans d'ordinateurs": "blabla category description blabla",
    "Connectiques réseaux (ethernet) : des switchs, des câbles et un routeur": "blabla category description blabla",
    "Un Module SMS": "blabla category description blabla",
    "Des PC portables et des tours": "blabla category description blabla",
    "Divers connectiques et adaptateurs de connection pour pc": "blabla category description blabla",
}

initDB(sequelize).then(() => {
    console.log("databse startup process complete");
    for(const [name, desc] of Object.entries(cat_list)) {
        Product_mgmt.add_category(name, desc);
    }

    User_mgmt.create_account("admin@louvainlinux.org", "supersecurepwd", true);
});
