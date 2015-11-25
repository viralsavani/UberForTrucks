<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Login</title>

    <!-- Bootstrap -->
    <link href="styles/bootstrap.css" rel="stylesheet">
    <link href="styles/custom.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>

<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="scripts/jquery.min.js"></script>
<script src="scripts/bootstrap.min.js"></script>


<!--SignIn SignUp-->

<div class="container">
    <div class="col-md-6">
        <div id="longbox">
            <form id="signin" method="post" action="/">
                <h1 class="h1" style="font-weight: bold">Login</h1>
                <input name="user[username]" type="text" placeholder="Enter your username" class="input pass"/>
                <input name="user[password]" type="password" placeholder="Enter your password" required="required"
                       class="input pass"/>
                <input type="submit" value="Login" class="inputButton" style="font-weight: bold"/>
            </form>
        </div>
    </div>

    <div class="col-md-6">
        <div id="longbox">
            <form id="signup" method="post" action="php/signup.php">
                <h1 class="h1" style="font-weight: bold">Create Account</h1>
                <input name="signup_username" type="text" placeholder="What's your username?" pattern="^[\w]{3,16}$"
                       autofocus="autofocus" required="required" class="input pass"/>

                <input name = "signup_email" type = "email" placeholder = "Email address" required = "required" class = "input pass"/>

                <input name = "signup_password" type = "password" placeholder = "Choose a password" required = "required"
                       class = "input pass"/>

                <input name = "signup_address" type = "text" placeholder="Enter address" required = "required"
                       class = "input"/>

                <input name = "signup_phonenumber" type = "text" placeholder="Enter phone number" required = "required"
                       class = "input"/>

                <input type = "submit" value = "Sign Up" class = "inputButton" style = "font-weight: bold"/>

            </form>
        </div>
    </div>

</div>
</div>
</body>
</html>