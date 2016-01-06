Feature: Avaliar uma ação de um funcionário da minha equipe.
	Para avaliar de maneira divertida as ações dos funcionários da equipe
	Eu como um integrante da equipe de T.I da empresa GOYS.SA
	Gostaria de criar atos para que todos avaliem as ações
	E desses atos receber uma pontuação sobre a ação.

	-------------------- REGRAS DE NEGÓCIO -----------------------

	RN1. Criação de atos
		Somente será permitido a criação de atos para membros da mesma equipe, sendo possível também criar um ato de si, anonimamente ou não.

	RN2. Avaliar atos
		Somente é possível avaliar um ato de quem for da mesma equipe.Se a pessoa criou o ato falando dela mesma não sera possivel avaliar esse ato.

	RN3. Transformar ato em XP
		Todo mês a pontuação dos atos devem virar pontos através do seguinte calculo:
		Pontos do ato 	  = SOMA(nota * lvl do avaliador)
		Pontos possíveis  = SOMA(4 * lvl do avaliado)
		proporcao = (pontos do ato * 100) / pontos possíveis
		experiencia necessária = Quantidade de experiencia necessária para subir de lvl
		experiencia a ganhar  = proporcao * experiencia necessária, sendo que o ato só se torna XP se todos os membros do grupo tiverem avaliado. E depois de transformado em XP a pessoa que está sendo avaliada receberá essa XP, sendo acrescentada ou retirada essa XP,somente é possível subir de lvl não é possível descer de lvl.
		A quantidade de exp que um ato garante, se ela fizer o funcionario subir de level, o execedente acumula para o próximo level

	RN4. Verificar a pontuação dos meus atos
		Somente será exibido o botão “mostrar minha pontuação” nos três primeiros dias uteis

	RN5.Avaliar ato comentário
  		É opcional a escrita do comentário no ato

Contexto:
	* Dado que usuários da equipe são
		| Usuário  | level | Administrador |
		| Renato   | 23    | true          |
        | Camiseta | 24    | false         |
		| Leda     | 22    | false         |
		| JarJar   | 11    | false         |

	* Dado que ação pode ser
		| Positiva (Ato de valor)| Negativa (Ato de vergonha)|

	* Dado que o ato pode ser avaliado  em
		| Positivo | Negativo  |
		| Epico	   | Fez merda |
        | Muito bom| Muito ruim|
		| Bom      | Ruim      |
		| Regular  | Regular   |

	* A experiencia necessária para subir de nível é igual ao nível atual vezes 1000

	* Dado que existe as seguintes escalas e suas faixas de níveis
		| Escala       | Nivel          |
		| Aprendiz     | de lvl 1 a 10  |
		| Adepto       | de lvl 11 a 20 |
		| Aventureiro  | de lvl 21 a 30 |
		| Mestre       | de lvl 31 a 40 |
		| Jedi         | de lvl 41 a 50 |


Scenario: Camiseta é um funcionário da empresa GOYS.SA e quer logar no sistema Enterprise RPG
	When  camiseta fornecer o login "Camiseta"
	And   senha "joaoS2gabriel"
	And   submeter o login
	Then  camiseta deve conseguir ver a pag inicial

Scenario: JarJar deseja criar um ato positivo porque o camiseta criou uma nova função que melhora a performance
	Given usuário "JarJar" está logado
	When  jarjar clicar no botão de Criar ato
	And   jarjar preencher o formulario com usuario "Camiseta"
	And   tipo "Valor"
#	And   nota "Épico"
	And   descrição "Fez o bagulho certin cara"
	Then  um novo ato de valor deve estar listado na pagina inicial

Scenario: Camiseta deseja criar um ato negativo porque o leda criou uma nova função que deixa o site torto
	Given "Camiseta" está logado
	When  Camiseta clicará no botão Criar ato
	And   camiseta  preencher o formulario com usuario "Leda"
	And   "Vergonha" como tipo
#	And   "Fez merda" como nota
	And   "cagou o sistema todo" como descrição
	Then  um novo ato de vergonha deve estar listado na pagina inicial

	#nao implementado dessa forma?
#Scenario: é o primeiro dia útil do més e camiseta quer verificar quantos pontos ele fez com seus atos
#	Given dado que "Camiseta" tinha level "20"
#	When  camiseta listar os membros da equipe
#	And   "camiseta" clicar em no link do seu nome
#	Then  será exibido os dados do "camiseta" no level "21"

Scenario: Leda quer avaliar um ato positivo do Camiseta
	Given que "Leda" esteja logado
	When  Leda clicar no link "Avaliar" do ato mais recente do "Camiseta"
	And   selecionar a opção positiva "Muito bom"
	And   clicar em "Avaliar"
	Then  será computado aquela avaliação pro ato do camiseta

Scenario: Renato quer avaliar um ato Negativo do JarJar
	Given "Renato" esteja logado
	When  "Renato" clicar em "avaliar" do ato mais recente do "Leda"
	And   selecionar a opção negativa "Fez merda"
	And   clicar no botão "avaliar"
	Then  computará aquela avaliação pro ato do JarJar

	#nao implementado dessa forma
#Scenario: Renato quer fechar os atos do mês de novembro
#	Given que é dia "30"
#	And   e todos atos estão aptos para ser fechados
#	When  "Renato" clicar no botão "fechar atos"
#	And   "Renato" escolher o mês de "novembro"
#	Then  é computado à cada pessoa da equipe os pontos dos atos

Scenario: Renato quer avaliar um ato positivo do Camiseta Anonimamente
	Given usuário "Renato" esteja logado
	When  Renato clicar em avaliar do ato mais recente do "Camiseta"
	And   escolhe nota "Muito bom"
	And   clicar no checkbox anonimo
	Then  entao será computado aquela avaliação pro ato do camiseta
	And   o ato devera ser fechado pois tem avaliação de toda a equipe

Scenario: jarjar quer avaliar ato criado do camiseta
	Given "JarJar" esta logado
	And  o ato ja possui 2 avaliações
	When jarjar cicar no botao avaliar no ato positivo do "Camiseta"
	And  selectionar "Muito bom" como nota
	And  submeter avaliação
	Then o ato do "Camiseta" deve estar fechado
