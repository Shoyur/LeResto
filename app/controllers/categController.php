<?php 


require_once '../models/categModel.php';


class CategController {

    public function requete() {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    
            switch($_POST['action']) {

                case "createCateg":
                    echo $this->createCateg();
                    break;

                case "updateCateg":
                    echo $this->updateCateg(); 
                    break;

                case "deleteCateg":
                    echo $this->deleteCateg();
                    break;
                    
            }
        
        }

    }


    // CRUD

    // CREATE
    public function createCateg() {

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

    public function deleteAllCateg() {

        // TO DO

    }


}

$categController = new CategController();
$categController->requete();