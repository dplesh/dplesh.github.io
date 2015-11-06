<?php
 

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
 

        function died($error) {

            // your error code can go here

            echo "We are very sorry, but there were error(s) found with the form you submitted. ";

            echo "These errors appear below.<br /><br />";

            echo $error."<br /><br />";

            echo "Please go back and fix these errors.<br /><br />";

            die();
        }


     if(isset($_POST['submit'])) 
    {
        echo "<script type='text/javascript'>alert('It worked!')</script>";
    }


        // validation expected data exists

        if(!isset($_POST['name']) ||


            !isset($_POST['phone']) ||

            !isset($_POST['message'])) {
            http_response_code(400);
            died('We are sorry, but there appears to be a problem with the form you submitted.');       

        }



        $name = strip_tags(trim($_POST["name"])); // required
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $telephone = trim($_POST["phone"]); // not required

        $comments = trim($_POST["message"]); // required



        $error_message = "";

        $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';



      if(strlen($comments) < 2) {

        $error_message .= 'The Comments you entered do not appear to be valid.<br />';

      }

      if(strlen($error_message) > 0) {

        died($error_message);

      }

        $email_message = "Form details below.\n\n";



        function clean_string($string) {

          $bad = array("content-type","bcc:","to:","cc:","href");

          return str_replace($bad,"",$string);

        }



        $email_message .= "Name: ".clean_string($name)."\n";


        $email_message .= "Telephone: ".clean_string($telephone)."\n";

        $email_message .= "Comments: ".clean_string($comments)."\n";



        //EMAIL HEADER DATA
        $email_to = "open.mind@outlook.co.il";

        $email_subject = "$name שלח הודעה";

    // create email headers

    $headers = 'From: admin@op.com'."\r\n".

    'Reply-To: admin@op.com'."\r\n" .

    'X-Mailer: PHP/' . phpversion();

    if(mail($email_to, $email_subject, $email_message, $headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }
    //header('Location:thank-you.html#contact');
     }  else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>