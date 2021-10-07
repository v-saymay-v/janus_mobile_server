<?php
/*
UserSpice 2.5.6
by Dan Hoover at http://UserSpice.com

based on
UserCake Version: 2.0.2


UserCake created by: Adam Davis
UserCake V2.0 designed by: Jonathan Cassels

Please note that this version uses technology that some consider
to be outdated. This version is designed as a cosmetic upgrade for
users of 2.0.2 and as a path towards development of version 3.0 and beyond
*/

class userCakeMail {
	//UserCake uses a text based system with hooks to replace various strs in txt email templates
	public $contents = NULL;

	//Function used for replacing hooks in our templates
	public function newTemplateMsg($template,$additionalHooks)
	{
		global $mail_templates_dir,$debug_mode;

		$this->contents = file_get_contents($mail_templates_dir.$template);

		//Check to see we can access the file / it has some contents
		if(!$this->contents || empty($this->contents))
		{
			return false;
		}
		else
		{
			//Replace default hooks
			$this->contents = replaceDefaultHook($this->contents);

			//Replace defined / custom hooks
			$this->contents = str_replace($additionalHooks["searchStrs"],$additionalHooks["subjectStrs"],$this->contents);

			return true;
		}
	}

	public function sendMail($email,$subject,$msg = NULL)
	{
		global $websiteName,$emailAddress;

		$header  = "MIME-Version: 1.0 \n" ;
		$header .= "Content-Type: text/plain;charset=ISO-2022-JP \n";
		$header .= "From: ".mb_encode_mimeheader(mb_convert_encoding($websiteName,"ISO-2022-JP","AUTO"))."<".$emailAddress."> \n";

		//Check to see if we sending a template email.
		if($msg == NULL)
			$msg = $this->contents;

		$message = $msg;

		$message = wordwrap($message, 70);

		$body = mb_convert_encoding($message, "ISO-2022-JP", "AUTO");
		return mail($email, $subject, $body, $header);
	}
}

?>
