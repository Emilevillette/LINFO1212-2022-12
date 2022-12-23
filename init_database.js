const Product_mgmt = require("./scripts/product_management");
const User_mgmt = require("./scripts/account_management");
const {initDB} = require("./models/global");
const {sequelize} = require("./config/database");

const cat_list = [
    "Des Micros de divers types + des filtres",
    "De la connectique audio",
    "Un lecteur de disque externe",
    "Des claviers USB pour ordinateurs",
    "Des écrans d'ordinateurs",
    "Connectiques réseaux (ethernet) : des switchs, des câbles et un routeur",
    "Un Module SMS",
    "Des PC portables et des tours",
    "Divers connectiques et adaptateurs de connection pour pc"
]

initDB(sequelize).then(() => {
    for(let name of cat_list) {
        Product_mgmt.add_category(name);
    }
    User_mgmt.create_account("admin@louvainlinux.org", "supersecurepwd", true);
    console.log("database startup process complete");
});
