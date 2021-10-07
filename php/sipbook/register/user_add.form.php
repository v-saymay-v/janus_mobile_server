<form accept-charset="utf-8" name="LoginForm" method="post" action="user_add_save.php">
   <label>e-Mail:</label><input value="<?php echo $email; ?>" name="email"/><br/>
   <label>Password:</label><input value="<?php echo $password; ?>" name="password" type="password"/><br/>
   <br/>
   <input type=submit value="Sign-Up"/>
</form>
  <script>				
    document.LoginForm.user.focus();
  </script>
