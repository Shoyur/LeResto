# LeResto

A restaurant online ordering platform

html, css, js, ajax, php, sql

absolutely no framework was used
everything is vanilla/custom

2 folders:

- /server/
    - payment gateway api for Stripe
    - controllers and models for REST to MySQL
- /public/
    /common/
    - common files for customers or employees SPA
    /customers/
    - SPA for food ordering
    - html, css, js, ajax
    /employees/
    - SPA to retrieve orders and manage settings
    - html, css, js, ajax


DEMO: https://www.youtube.com/watch?v=...TBA





TODO list & ideas :

- clean scripts, jquery vs vanilla (DONE)
- possibility to cancel an order by the restaurant
- user login on customer side
- user registration on customer side
- user login on employees side
- user registration on employees side
    - session management
    - php access control
    - password storing encoding
    - email confirmation
    - password reset
    - CSRF tokens protection
    - logging
    - concurent connections
    - connections limiting
- dynamic language switch
- global.js ?
- adjust css responsive values even more
- multiple images GET queries, caching ? (DONE)
- host images elsewhere, redit ?
- security checkup
- storage / cookies not working on ios
- complete errors handling (DONE)
- consider a lag on every transactions (DONE)
- more comments
- reset payment fields every time
- use statistics
- employees page not responsive
- 
