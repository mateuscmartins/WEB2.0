<?php
//Validação da session
session_start();
  //Validação se o usuário está logado
  if(!isset($_SESSION['autenticado']) || $_SESSION['autenticado'] != 'SIM') {
    header('Location: index.php?login=erro2');
  }

?>