# language: pt
# encoding: utf-8

Funcionalidade: Fluxo de Checkout E-commerce
  Como um cliente do e-commerce
  Eu quero adicionar produtos ao carrinho e finalizar minha compra
  Para receber os produtos solicitados

  Cenário: Adicionar produtos ao carrinho
    Dado que estou logado como "standard_user"
    E eu estou na página de inventário
    Quando eu adiciono o primeiro produto ao carrinho
    E eu adiciono o segundo produto ao carrinho
    Então eu devo ver o badge do carrinho com "2" itens
    E os botões devem mudar para "Remove"

  Cenário: Verificar itens no carrinho
    Dado que estou logado como "standard_user"
    E eu tenho produtos no carrinho
    Quando eu navego para o carrinho de compras
    Então eu devo ver todos os produtos adicionados
    E eu devo ver os preços dos produtos
    E eu devo ver a quantidade de cada item
    E eu devo ver o botão "Checkout"

  Cenário: Fluxo completo de checkout
    Dado que estou logado como "standard_user"
    E eu tenho produtos no carrinho
    Quando eu navego para o carrinho
    E eu clico em "Checkout"
    E eu preencho o nome "João"
    E eu preencho o sobrenome "Silva"
    E eu preencho o código postal "12345-678"
    E eu clico em "Continue"
    E eu clico em "Finish"
    Então eu devo ver a mensagem de sucesso
    E eu devo ver "THANK YOU FOR YOUR ORDER"
    E eu devo ver "Your order has been dispatched"

  Cenário: Validação de campos obrigatórios no checkout
    Dado que estou logado como "standard_user"
    E eu estou na página de checkout
    Quando eu clico em "Continue" sem preencher os campos
    Então eu devo ver uma mensagem de erro
    E eu devo permanecer na página de checkout

  Cenário: Cancelar checkout e retornar ao carrinho
    Dado que estou logado como "standard_user"
    E eu estou na página de checkout
    Quando eu clico em "Cancel"
    Então eu devo ser redirecionado para o carrinho
    E eu devo ver os produtos no carrinho

  Cenário: Remover produtos do carrinho
    Dado que estou logado como "standard_user"
    E eu tenho produtos no carrinho
    Quando eu removo um produto do carrinho
    Então o produto deve ser removido da lista
    E o badge do carrinho deve ser atualizado
    E eu devo ver o botão "Add to cart" novamente

  Cenário: Continuar comprando após adicionar ao carrinho
    Dado que estou logado como "standard_user"
    E eu tenho produtos no carrinho
    Quando eu navego para o carrinho
    E eu clico em "Continue Shopping"
    Então eu devo ser redirecionado para a página de inventário
    E eu devo ver os produtos disponíveis
    E o badge do carrinho deve manter a contagem
