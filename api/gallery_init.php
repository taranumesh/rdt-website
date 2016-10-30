<?php

if (isset($_GET["key"]) && isset($_GET["index"])) {
  $index = $_GET["index"];
  $directory = "../images/gallery";
  $files = scandir($directory);
  $result = array();

  for ($i = $index; $i < $index + 20; $i++) {
    if (!is_dir($directory."/".$files[$i])) {
      $result[] = $files[$i]; 
    }
  }

  echo json_encode($result);
}
?>