<?php 


require_once '../models/categModel.php';


class CategController {

    // CRUD

    // CREATE
    public function createCateg() {

        // TO DO

    }

    // READ
    public function getCategs() {

        // TO DO

    }

    // UPDATE
    public function updateCateg() {

        // TO DO

    }

    // DELETE
    public function deleteCateg() {

        // TO DO

    }


}

$categController = new CategController();

switch ($_SERVER['REQUEST_METHOD']) {

    case 'POST':
        echo $categController->createCateg();
        break;

    case 'GET':
        echo $categController->getCategs();
        break;

    case 'PATCH':
        echo $categController->updateCateg(); 
        break;
        
    case 'DELETE':
        echo $categController->deleteCateg();
        break;

}