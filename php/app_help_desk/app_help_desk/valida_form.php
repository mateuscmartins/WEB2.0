<?php
//Script para validação do formulário de login


    //iniciando o recurso de session
    session_start();

    //Declaração de variáveis
    $usuario_autenticado = false;
    $usuario_id = null;
    $usuario_perfil_id = null;

    //array de definição de perfil do usuário do sistema
    $perfis = array(1 => "Administrativo", 2 => "Usuário");

    //array hardcode com os logins e senhas dos usuários
    $usuarios_app = array(
        array('id'=> 1, 'email' => 'adm@teste.com.br', 'senha' => '123456', 'perfil_id' => '1'),
        array('id'=> 2, 'email' => 'user@teste.com.br', 'senha' => 'abcd', 'perfil_id' => '2')
    );

    //Rotina para percorrer o array $usuarios_app para verificar se o login inserido está cadastrado
    foreach($usuarios_app as $user) {

        if ($user['email'] == $_POST['email'] && $user['senha'] == $_POST['senha']) {
            $usuario_autenticado = true;
            $usuario_id = $user['id'];
            $usuario_perfil_id = $user['perfil_id'];
        }
    };

    if ($usuario_autenticado) {
        echo 'Usuário autenticado';
        $_SESSION['autenticado'] = 'SIM';
        $_SESSION['id'] = $usuario_id;
        $_SESSION['perfil_id'] = $usuario_perfil_id;
        header('Location: home.php');
    } else {
        $_SESSION['autenticado'] = 'NAO';
        header('Location: index.php?login=erro');
    };


    //Variáveis para receber os dados via metódo POST
    //$_POST['email'];
    //$_POST['senha'];

?>