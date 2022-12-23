/**
 * Functions that translate the page
 * Languages available:
 * - French
 * - English
 */

/**
 * Set the language on page load
 * Used in onload.js
 */
function set_translate() {
    let icon = document.getElementById("trans");
    if (!document.cookie.includes("eng")) {
        document.cookie = "eng=Off";
    } else if (document.cookie.includes("eng=On")) {
        aux_translate(language.eng);
        icon.src = "/img/fr.png";
    }
}

/**
 * Translate the page to French or English
 */
function translate_page(){
    let icon = document.getElementById("trans");
    if (document.cookie.includes("eng=Off")) {
        aux_translate(language.eng);
        icon.src = "/img/fr.png";
        document.cookie = "eng=On";
    } else {
        aux_translate(language.fr);
        icon.src = "/img/eng.png";
        document.cookie = "eng=Off";
    }
}

function aux_translate(lang){
    const elements = document.querySelectorAll("*");
    for (const element of elements) {
        if(language.eng[element.id] !== undefined){
            try{
                element.innerHTML = lang[element.id];
            }catch (TypeError){ /* empty */ }
            try{
                element.placeholder = lang[element.id];
            }catch (TypeError){ /* empty */ }
        }
    }
}


/** Translated text */
const language = {
    fr : {
        login:"Se connecter",
        pwd:"mot de passe",
        o_history: "Historique des commandes:",
        no_order: "Vous n'avez aucune commande",
        order_label: "Gérer la commande:",
        order_picked_up: "Commande récupérée par le client: ",
        order_brought_back: "Commande ramenée par le client: ",
        paid_deposit: "Caution payée: ",
        archived: "Archiver : ",
        signup: "Créer le compte",
        add_to_stock: "Rajouter au stock",
        mics: "Des Micros de divers types + des filtres",
        audio: "De la connectique audio",
        disk: "Un lecteur de disque externe",
        keyboards: "Des claviers USB pour ordinateurs",
        monitors: "Des écrans d'ordinateurs",
        reseau: "Connectiques réseaux (ethernet) : des switchs, des câbles et un routeur",
        sms: "Un Module SMS",
        laptops: "Des PC portables et des tours",
        pc_connect: "Divers connectiques et adaptateurs de connection pour pc",
        stock: "Contenu de l'inventaire:",
        empty_stock: "Votre stock est vide pensez à le remplir 👀",
        cart_title: "Votre panier contient les éléments ci-dessous:",
        product: "Produit",
        quantity: "Quantité",
        start_date: "Date sortie",
        end_date: "Date retour",
        order_confirm: "Confirmer la commande",
        fill: "Veuillez remplir les champs ci-dessous:",
        submit_btn: "Confirmer",
        empty_cart: "Votre panier est vide pensez à le remplir 👀",
        title_index_stock: "Veuillez selectionner la page que vous souhaitez accéder:",
        add_stock: "Rajouter un élément au stock",
        visualise_stock: "Visualiser les produits en stock",
        out: "Veuillez présenter le code de commande ci-dessous au Kot-à-Projet Louvain-li-Nux afin de récupérer votre commande:",
        products_title: "Produits disponibles dans la categorie:",
        add: "Ajouter",
        shop: "Boutique",
        quantity_disp: "Quantité disponible",
        deposit: "Caution",
        name: "Nom Complet",
        GSM:"GSM sous la forme 0491923459",
        address:"Adresse complete",
        cookie:"🍪 En utilisant ce site, vous acceptez des cookies qui améliorent votre navigation",
        choose_img:"Selectionnez une image:",
    },
    eng : {
        login: "Log in",
        pwd: "password",
        o_history: "Order history",
        no_order: "You have no orders",
        order_label: "Manage order:",
        order_picked_up: "The client picked up the order",
        order_brought_back: "The client brought back the order",
        paid_deposit: "The deposit was payed",
        archived: "Archived",
        signup: "Sign up",
        add_to_stock: "Add to stock",
        stock: "Your stock contains the following elements:",
        empty_stock: "Your stock is empty 👀",
        cart_title: "Your cart contains the following elements:",
        product: "Product",
        quantity: "Quantity",
        start_date: "Start date",
        end_date: "End date",
        order_confirm: "Confirm you order",
        fill: "Please fill out this form",
        submit_btn: "submit",
        empty_cart: "Your cart is empty 👀",
        title_index_stock: "Which page would you like to access",
        add_stock: "Add to stock",
        visualise_stock: "Visualise stock",
        out: "Please present the order code below to Kot-à-Projet Louvain-li-Nux in order to collect your order:",
        products_title: "Products avaible in the section",
        add: "Add",
        shop: "Shop",
        quantity_disp: "Quantity available",
        deposit: "Deposit",
        name: "Full Name",
        GSM: "Phone number in the form 0491923459",
        address: "Your full adress",
        cookie: "🍪 By using this website, you accept cookies that improve your navigation",
        choose_img:"Choose  an image:"
    }
};