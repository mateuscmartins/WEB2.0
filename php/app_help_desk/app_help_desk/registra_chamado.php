<?php

    session_start();

    //Subistituindo # se houver no texto submetido
    $titulo =  str_replace("#", "-", $_POST['titulo']);
    $categoria = str_replace("#", "-", $_POST['categoria']);
    $descricao =    str_replace("#", "-", $_POST['descricao']);

    //Abrindo o arquivo
    $arquivo = fopen("../../app_help_desk/arquivo.hd","a");

    //Concatenando os valores submetidos para armazenar no arquivo.hd
    $texto = $_SESSION['id'] . '#' . $titulo . '#' . $categoria . '#' . $descricao . PHP_EOL;
    
    //Armazenando o texto no arquivo
    fwrite($arquivo, $texto);

    //Fechando o arquivo
    fclose($arquivo);

    //retornando para a página abrir_chamado
    header('Location: abrir_chamado.php')

?>