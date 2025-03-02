<?php
header('Content-Type: application/json'); // Indiquer qu'on envoie du JSON

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $file = 'emails.json';

        // Vérifie si le fichier existe, sinon on le crée avec un tableau vide
        if (!file_exists($file)) {
            file_put_contents($file, json_encode([]));
        }

        // Lire le fichier JSON existant
        $emails = json_decode(file_get_contents($file), true);
        if ($emails === null) {
            $emails = []; // Sécurité en cas de fichier corrompu
        }

        // Vérifier si l'email est déjà enregistré
        foreach ($emails as $entry) {
            if ($entry["email"] === $email) {
                echo json_encode(["success" => false, "message" => "⚠️ Email déjà enregistré !"]);
                exit;
            }
        }

        // Ajouter le nouvel email
        $emails[] = ["email" => $email, "date" => date("Y-m-d H:i:s")];

        // Sauvegarder dans le fichier JSON
        if (file_put_contents($file, json_encode($emails, JSON_PRETTY_PRINT))) {
            echo json_encode(["success" => true, "message" => "✅ Inscription réussie !"]);
        } else {
            echo json_encode(["success" => false, "message" => "❌ Erreur lors de l'enregistrement."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "❌ Adresse email invalide"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "🚫 Méthode non autorisée"]);
}
?>
