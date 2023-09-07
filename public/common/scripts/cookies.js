function setCookie(name, value, hours) {
    const exp = new Date();
    exp.setTime(exp.getTime() + (hours * 60 * 60 * 1000));
    document.cookie = name + "=" + JSON.stringify(value) + ";expires=" + exp.toUTCString() + ";path=/";
}


function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            return JSON.parse(cookie.substring(name.length + 1));
        }
    }
    return null;
}