// css theme, 0=dark, 1=light
var darklight = 0;


document.addEventListener('DOMContentLoaded', function () {
    const saved_theme = localStorage.getItem('Le_Resto_theme');
    // const saved_theme = getCookie('Le_Resto_theme');
    darklight = saved_theme == '1' ? 1 : 0;
    applyTheme(darklight);
    
});


window.addEventListener('beforeunload', function (event) {
    localStorage.setItem('Le_Resto_theme', JSON.stringify(darklight));
    // setCookie('Le_Resto_theme', JSON.stringify(darklight), 12);
});


const darklight_but = document.getElementById('darklight_but');
darklight_but.addEventListener('click', () => {
    darklight = darklight == 0 ? 1 : 0;
    applyTheme(darklight);
});


function applyTheme(darklight) {

    const root = document.documentElement;

    if (darklight) {

        root.style.setProperty('--col_nav', 'var(--col_dark)');
        root.style.setProperty('--col_text', 'var(--col_pale_pink_1)');
        root.style.setProperty('--col_but', 'var(--col_purple_2)');
        root.style.setProperty('--col_hover', 'var(--col_bright_pink)');
        root.style.setProperty('--col_list', 'var(--col_dark_purple)');
        root.style.setProperty('--col_card', 'var(--col_purple_3)');

    }
    else {

        root.style.setProperty('--col_nav', 'var(--col_pale_pink_1)');
        root.style.setProperty('--col_text', 'var(--col_dark)');
        root.style.setProperty('--col_but', 'var(--col_pale_pink_2)');
        root.style.setProperty('--col_hover', 'var(--col_bright_pink)');
        root.style.setProperty('--col_list', 'var(--col_white)');
        root.style.setProperty('--col_card', 'var(--col_purple_1)');

    }

}

