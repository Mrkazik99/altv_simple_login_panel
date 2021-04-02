var lastPositionCoords;
function isEmpty(element) {
    if (element.value != '') {
        element.setAttribute('name', 'notEmpty');
    } else {
        element.setAttribute('name', '');
    }
}
function getRegisterData() {
    document.getElementById('registerButton').setAttribute('style', 'display:none;');
    setTimeout(function() {
        document.getElementById('registerButton').setAttribute('style', 'display:inline;');
    }, 5000);
    var login = document.getElementById('login').value;
    var email = document.getElementById('email').value;
    var pass1 = document.getElementById('pass').value;
    var pass2 = document.getElementById('repPass').value;
    if (pass1 !== pass2) {
        document.getElementById('alert').innerHTML = 'Hasła nie zgadzają się';
        setTimeout(function() {
            document.getElementById('alert').innerHTML = '';
        }, 5000);
        return;
    }
    if ('alt' in window) {
        alt.emit('register:acc', login, email, pass1);
        alt.on('user:loginexists', () => {
            document.getElementById('alert').innerHTML = 'Użytkownik o takiej nazwie już istnieje.';
            setTimeout(function() {
                document.getElementById('alert').innerHTML = '';
            }, 5000);
        });
        alt.on('user:emailexists', () => {
            document.getElementById('alert').innerHTML = 'Użytkownik o takim mailu już istnieje.';
            setTimeout(function() {
                document.getElementById('alert').innerHTML = '';
            }, 5000);
        });
        alt.on('user:accCreated', () => {
            document.getElementById('alert').innerHTML =
                'Udało się założyć konto, przejdź do logowania.';
            document.getElementById('alert').setAttribute('style', 'color:green;');
            setTimeout(function() {
                document.getElementById('alert').innerHTML = '';
                document.getElementById('alert').setAttribute('style', 'color:red;');
            }, 5000);
        });
    }
}
function getLoginData() {
    document.getElementById('loginButton').setAttribute('style', 'display:none;');
    setTimeout(function() {
        document.getElementById('loginButton').setAttribute('style', 'display:inline;');
    }, 5000);
    var login = document.getElementById('login').value;
    var pass = document.getElementById('password').value;
    var remember = document.getElementById('_remember');
    if (remember.checked) remember = 1;
    else remember = -1;
    if ('alt' in window) {
        alt.emit('login:acc', login, pass, remember);
        alt.on('accInUse', () => {
            document.getElementById('loginAlert').innerHTML = 'Ktoś już korzysta z tego konta.';
            setTimeout(function() {
                document.getElementById('loginAlert').innerHTML = '';
            }, 5000);
        });
        alt.on('login:noAccount', () => {
            document.getElementById('loginAlert').innerHTML =
                'Login lub hasło zostały źle wpisane.';
            setTimeout(function() {
                document.getElementById('loginAlert').innerHTML = '';
            }, 5000);
        });
        alt.on('login:success', () => {
            document.getElementById('loginAlert').innerHTML =
                'Zalogowano, zaraz nastąpi przekierowanie.';
            document.getElementById('loginAlert').setAttribute('style', 'color:green;');
        });
    }
}
function spawnme(place) {
    if ('alt' in window) {
        if (place == 1) {
            alt.emit('spawn', 1);
            console.log(`click ${place}`);
        } else if (place == 2) {
            alt.emit('spawn', 2);
            console.log(`click ${place}`);
        } else if (place == 3) {
            alt.emit('spawn', 3);
            console.log(`click ${place}`);
        } else if (place == 4) {
            alt.emit('spawn', 4);
            console.log(`click ${place}`);
        } else if (place == -1) {
            alt.emit('spawn', -1);
            console.log(`click ${place}`);
        }
    }
}
if ('alt' in window) {
    alt.on('loadCredits', (nick, pass) => {
        document.getElementById('login').value = nick;
        document.getElementById('password').value = pass;
        document.getElementById('_remember').checked = true;
    });
    alt.on('lastPosition', () => {
        var lastPosition = document.createElement('div');
        console.log('created an element.');
        lastPosition.innerHTML =
            "<div class='spawnerSmall' id='spawnlastPosition' onclick='spawnme(-1)'></label><br><img src='lastspawn.png' alt='Tu będzie zdjęcie'><br><label for='lastPosition'>Ostatnia<br>lokalizacja</div>";
        document.getElementById('additionalSpawns').appendChild(lastPosition);
    });
}
