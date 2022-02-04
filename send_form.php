<?php
if(isset($_POST['form__phonev'])){

    $form__phonev = $_POST['form__phonev'];
    $message = '
                <html>
                    <head>
                        <title>"Новый контакт"</title>
                    </head>
                    <body>
                        <p>Телефон: '. $form__phonev .'</p>                       
                    </body>
                </html> ';
   
    $headers = "From: \r\nContent-type: text/html; charset=utf-8\r\n";

    $success = mail("mail@gmail.ru",  $message, $headers);
    echo $success;

    

}
?>