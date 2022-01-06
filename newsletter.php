<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer;

$email = htmlspecialchars($_POST['email']);


$mail->SMTPDebug = 0;   // Enable verbose debug output

try {
    //Server settings

    //IF USING SMTP COMMENT OUT BELOW

    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;       //Enable verbose debug output
    // $mail->isSMTP();                             //Send using SMTP
    // $mail->Host       = '';                     //Set the SMTP server to send through
    // $mail->SMTPAuth   = true;                   //Enable SMTP authentication
    // $mail->Username   = '';                     //SMTP username
    // $mail->Password   = '';                     //SMTP password
    // $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
    // $mail->Port       = 465;                     //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`


    //WITHOUT SMTP

    //Recipients
    $mail->setFrom('enterhere@yourwebsiteemail.com'); //Add your website email
    $mail->addAddress('enterhere@youremail.com');     //Add where to forward
    // $mail->addAddress('ellen@example.com');               //Name is optional
    $mail->addReplyTo($email);
    // $mail->addCC('cc@example.com');
    // $mail->addBCC('bcc@example.com');
  
    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = "Subscriptions";
    $message = "has subscribed";
    $mail->Body    = "$email $message";
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'You have subscribed';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}

$mail->clearReplyTos();
$mail->clearAllRecipients();

    //MAIL TO SUBSCRIBER
$mail->addAddress($email);          
$mail->Subject = "Confirm Subscription";
$mail->Body    = "Welcome to our family";

$mail->send();