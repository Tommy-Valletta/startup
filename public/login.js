function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var stringified = localStorage.getItem(username)
    if (!stringified) {
        alert('Invalid username or password');
    } else {
        var user = JSON.parse(stringified);
        if (password == user.password) {
            location.href = `index.html?user=${username}`;
        } else {    
            alert('Invalid username or password');
        }
    }
}
