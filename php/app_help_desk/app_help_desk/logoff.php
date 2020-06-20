<?php
    session_start();

    session_destroy(); //Apaga todas as variáveis das superglobal SESSION
    header('Location: index.php') //Redireciona para a página inicial, pois a session_destroy não atualiza automaticamente

?>