// This function allows us to switch from light to dark mode
function dark_mode() {
    var icon = document.getElementById("icon");
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        icon.src = "/img/sun.png";
    } else {
        icon.src = "/img/moon.png";
    }
}


//Modify
function translate(hash) {
    // Define the language reload anchors
    var language = {
      Eng: {
          login: "Login",
          e_mail: "Email adress",
          log: "Order history",
          order_num: "Order number",
          client_name: "Client's full name",
          client_email: "Client's mail adress",
          S_date: "Borrowing date",
          R_date: "Return date",
          V_S_date: "Real borrowing date",
          V_R_date: "Real return date",
          admin_com: "Admin's comment",
          enter_o_num: "Please enter the order number you wish to view below:",
        
      },
    };
  
    // Check if a hash value exists in the URL
    if (hash) {
      // Set the content of the webpage
      // depending on the hash values
      if (hash == "#Eng") {
        login.placeholder = language.Eng.login;
        e_mail.placeholder = language.Eng.e_mail;
        enter_o_num.textContent = language.Eng.enter_o_num;
      } else {
        location.reload();
      }
    }
  }