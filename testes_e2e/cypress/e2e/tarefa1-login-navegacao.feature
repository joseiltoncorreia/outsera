# language: pt
# encoding: utf-8

Funcionalidade: Login e Navegação
  Como um usuário do sistema
  Eu quero fazer login e navegar para diferentes páginas
  Para acessar funcionalidades do sistema

  Cenário: Login bem-sucedido e navegação para página de produtos
    Dado que estou na página de login
    Quando eu preencho o campo usuário com "standard_user"
    E eu preencho o campo senha com "secret_sauce"
    E eu clico no botão de login
    Então eu devo ser redirecionado para a página de inventário
    E eu devo ver a lista de produtos disponíveis
    E eu devo ver o título da página "Products"

  Cenário: Login com usuário bloqueado
    Dado que estou na página de login
    Quando eu preencho o campo usuário com "locked_out_user"
    E eu preencho o campo senha com "secret_sauce"
    E eu clico no botão de login
    Então eu devo ver uma mensagem de erro
    E eu devo permanecer na página de login

  Cenário: Navegação para página de produtos após login
    Dado que estou logado como "standard_user"
    Quando eu navego para a página de inventário
    Então eu devo ver 6 produtos disponíveis
    E eu devo ver o menu de ordenação
    E eu devo ver o carrinho de compras vazio

  Cenário: Ordenação de produtos por nome
    Dado que estou logado como "standard_user"
    E eu estou na página de inventário
    Quando eu seleciono ordenação "Name (A to Z)"
    Então os produtos devem estar ordenados alfabeticamente de A a Z
    E o primeiro produto deve ser "Sauce Labs Backpack"

  Cenário: Ordenação de produtos por preço
    Dado que estou logado como "standard_user"
    E eu estou na página de inventário
    Quando eu seleciono ordenação "Price (low to high)"
    Então os produtos devem estar ordenados por preço do menor para o maior
    E o produto mais barato deve ser "Sauce Labs Onesie"
