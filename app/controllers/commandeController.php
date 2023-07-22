<?php 


require_once '../models/commandeModel.php';

date_default_timezone_set('US/Eastern');


class CommandeController {

    public function requete() {

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    
            switch($_POST['action']) {

                case "createCommande":
                    $id_client = $_POST['id_client'];
                    $livr = $_POST['livr'];
                    $stotal = $_POST['stotal'];
                    $txtotal = $_POST['txtotal'];
                    $details = $_POST['details'];
                    echo $this->createCommande($id_client, $livr, $stotal, $txtotal, $details);
                    break;

                case "getOpenOrders":
                    echo $this->getOpenOrders();
                    break;

                case "getFinishedOrders":
                    echo $this->getFinishedOrders(); 
                    break;

                case "updateOrderFinish":
                    $id_commande = $_POST['id'];
                    $terminee_commande = $_POST['finished'];
                    echo $this->updateOrderFinish($id_commande, $terminee_commande); 
                    break;

                case "deleteCommande":
                    echo $this->deleteCommande();
                    break;

                case "deleteAllCommande":
                    echo $this->deleteAllCommande();
                    break;

            }
        
        }

    }


    // CRUD

    // CREATE
    public function createCommande($id_client, $livr, $stotal, $txtotal, $details) {

        $maintenant = new DateTime();
        $maintenant = $maintenant->format('Y-m-d H:i:s');

        $commandeModel = new CommandeModel();
        $success = $commandeModel->createCommande($maintenant, $id_client, $livr, $stotal, $txtotal, $details);
        header('Content-Type: application/json');
        return json_encode($success);

    }

    // READ
    public function getOpenOrders() {

        $commandeModel = new CommandeModel();
        $commandes = $commandeModel->getOpenOrders();
        foreach ($commandes as &$commande) {
            $quand_commande = strtotime($commande['quand_commande']);
            $diff_sec = time() - $quand_commande;
            $commande['attente'] = $diff_sec;
        }
        header('Content-Type: application/json');
        return json_encode($commandes);

    }

    public function getFinishedOrders() {

        $commandeModel = new CommandeModel();
        $commandes = $commandeModel->getFinishedOrders();
        header('Content-Type: application/json');
        return json_encode($commandes);
        
    }

    // UPDATE
    public function updateOrderFinish($id_commande, $terminee_commande) {

        $commandeModel = new CommandeModel();
        $result = $commandeModel->updateOrderFinish($id_commande, $terminee_commande);
        header('Content-Type: application/json');
        return json_encode($result);

    }

    // DELETE
    public function deleteCommande() {

        // À FAIRE...

    }

    public function deleteAllCommande() {

        // À FAIRE...

    }


}

$commandeController = new CommandeController();
$commandeController->requete();