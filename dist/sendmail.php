<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/PHPMailer.php';

//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);
if ($_POST['check'] != 'secretcode') exit('Spam decected');
try {
   //Server settings
   $mail->CharSet = 'UTF-8';
   $mail->setLanguage('ru', 'phpmailer/language/');
   //$mail->SMTPDebug = 3;                      //Enable verbose debug output
   $mail->isSMTP();                                            //Send using SMTP
   $mail->Host       = 'mail.nic.ru';                     //Set the SMTP server to send through
   $mail->Username = 'test@olmix.su';
   $mail->Password = '01200120Ss';
   $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
  // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
   $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

   //Recipients
   $mail->setFrom('test@olmix.su', 'Mailer');
   $mail->addAddress('orionp1997@mail.ru', 'Joe User');     //Add a recipient

   //Content
   $mail->isHTML(true);                                  //Set email format to HTML
   $mail->Subject = 'Заявка';
   $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
   $body = '<h1>Заявка:</h1>';
   if(trim(!empty($_POST['username']))){
		$body.='<p><strong>Имя: </strong>'.$_POST['username'].'</p>';
	}
     if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Телефон: </strong>'.$_POST['phone'].'</p>';
	}
    $mail->Body = $body;
   
		if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
	
} catch (Exception $e) {
    
}
?>