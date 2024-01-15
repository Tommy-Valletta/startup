function register() {
    var username = document.getElementById("username").value;
    var gatecode = document.getElementById("gatecode").value;
    var password = document.getElementById("password").value;
    var confirm = document.getElementById("confirm_password").value;

    if (password == confirm) {
        var user = {
            username,
            password,
            gatecode
        }
        localStorage.setItem(username, JSON.stringify(user));
        location.href = "login.html";
    } else {    
        alert('Password does not match confirmation');
    }
}
