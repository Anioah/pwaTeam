var url = window.location.href; //obtenemos todo el url
var pwaLocation = '/pwaTeam/sw.js'; //path donde se encuentra el sw en GitHub

if (navigator.serviceWorker) {
    if (url.includes('localhost')) {
        pwaLocation = '/sw.js';
    }
    navigator.serviceWorker.register('sw.js');
}