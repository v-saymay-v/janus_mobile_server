<?php

  	 $addr = array();
  	 $addr['lastname']  = getIfSet($rec,0);
     $addr['lastyomi']  = getIfSet($rec,1);
  	 $addr['firstname'] = getIfSet($rec,2);
     $addr['firstyomi'] = getIfSet($rec,3);

     $date_parts        = explode(".", getIfSet($rec,4));
     if(count($date_parts) == 3) {
  	   $addr['bday']      = ltrim($date_parts[0],"0");
  	   $addr['bmonth']    = MonthToName($date_parts[1]);
  	   $addr['byear']     = $date_parts[2];
  	 }

     $addr['company']    = getIfSet($rec,5);
     $addr['compyomi']   = getIfSet($rec,6);
     $addr['division']   = getIfSet($rec,7);
     $addr['title']      = getIfSet($rec,8);

  	 $addr['zip']        = getIfSet($rec,9);
     $addr['prefecture'] = getIfSet($rec,10);
     $addr['city']       = getIfSet($rec,11);
     $addr['number']     = getIfSet($rec,12);
     $addr['address']   = getIfSet($rec,10).getIfSet($rec,11).getIfSet($rec,12);

     $addr['email']      = getIfSet($rec,13);
     $addr['work']       = getIfSet($rec,14);
     $addr['fax']        = getIfSet($rec,15);
     $addr['mobile']     = getIfSet($rec,16);

  	 //$addr['home']      = getIfSet($rec,6);
  	 //$addr['email2']    = getIfSet($rec,11);
  	 //$addr['address2']  = str_replace(", ", "\n", getIfSet($rec,12));
  	 //$addr['phone2']    = getIfSet($rec,13);
?>
