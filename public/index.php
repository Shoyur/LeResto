<?php

header("Cache-Control: max-age=3600");

?>

<!DOCTYPE html>
<html lang="en">

<head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Le Resto</title>

    <link rel="apple-touch-icon" sizes="180x180" href="common/images/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="common/images/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="common/images/favicon-16x16.png">
    <link rel="manifest" href="common/images/site.webmanifest">

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

    <style>

        body {
            margin: 0;
            font-family: 'Roboto';
            text-decoration: none;
            background-color: #150520;
            display: flex;
            justify-content: center;
            height: 100vh;
        }
        
        button {
            cursor: pointer;
            display: inline-block;
            background-color: #8010C0;
            color: white;
            height: 30px;
            padding: 0px 15px;
            border-radius: 15px;
            margin: 0px 10px 10px 10px;
            outline: none;
            border: none;
            font-size: 1rem;
            width: 160px;
            transition: background-color 0.7s ease, color 0.7s ease;
        }

        button:hover {
            background-color: #F040F0;
        }

        .center_menu_div {
            margin-top: 25vh;
            width: 250px;
            height: 180px;
            background-color: #302030;
            border-radius: 20px; 
            display: flex;
            flex-direction: column;
            /* justify-content: center; */
            align-items: center;
        }

        .logo_div {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            margin: 20px 0px 20px 0px;
        }

        .logo_div img {
            height: 40px;
            object-fit: contain;
        }

    </style>

</head>

<body>

    <div class="center_menu_div">
        <div class="logo_div">
            <img src="common/images/logo.png" alt="logo">
        </div>
        <button onclick="window.open('customers', '_blank');">Page clients</button>
        <button onclick="window.open('employees', '_blank');">Page employés</button>
    </div>

</body>

</html>