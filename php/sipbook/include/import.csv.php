<?php
require_once "import.del.php";
class ImportCsv extends ImportDel
{
  function ImportCsv( $file_lines, $delims = array(";", ",", "\t"), $quotes = array('"', "'") ) {
  //function __construct( $file_lines, $delims = array(";", ",", "\t"), $quotes = array('"', "'") ) {

    function maxChar($chars, $testString) {

      $max_count = 0;
      $the_char  = (count($chars) > 0 ? $chars[0] : " ");

      foreach($chars as $char) {

        $new_count = substr_count($testString, $char);
        if($new_count > $max_count) {
          $max_count = $new_count;
          $the_char  = $char;
        }
      }
      return $the_char;
    }

    $test_line = $file_lines[0];

    // Detect the most probable delimiter.
    $delim = maxChar($delims, $test_line);
    $quote = maxChar($quotes, $test_line);

    // Re-Conncat the file-lines
    $input = implode("\n", $file_lines)."\n";

    // Setup and run the parser
    include "lib/parsecsv.lib.php";

    $csv = new parseCSV();
    $csv->delimiter = $delim;
    $csv->enclosure = $quote;
    $csv->file_data = &$input;
    $this->data = $csv->parse_string();

    // Convert the array to addresses
    $this->convertToAddresses();
var_dump($this->ab);
  }
}?>
