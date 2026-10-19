# Escala de Serviço 24h

Sistema web para montar e conferir as escalas de serviço de 24 horas:
**Guarda** (soldados, 3 na preta e 6 na vermelha), **Cabo de dia**, **Sargento de dia** e **Permanência do Comando** (1 por dia; a Perm Cmdo só em dias úteis).

## Regras implementadas
- **Escala preta** (segunda a sexta) e **escala vermelha** (sábado, domingo e feriados), cada uma com folga própria.
- Em cada dia entra o militar **mais folgado** na cor do dia. Desempate: há mais tempo sem serviço, depois a ordem da lista.
- **Descanso mínimo de 48 h** após o serviço (quem tira sexta não pega sábado nem domingo).
- **Afastamentos** (saúde, férias, dispensa, missão, curso etc.): o militar sai da escala e a folga **continua contando**.
  No dia seguinte ao fim do afastamento ele se **apresenta** e, 24 h depois, **entra de serviço**.
- Feriados nacionais calculados automaticamente (inclui Carnaval, Sexta-feira Santa e Corpus Christi) e feriados locais cadastráveis.
- Dias passados ficam gravados no histórico; trocas manuais são respeitadas e o restante se recalcula.

## Trabalho junto com a planilha da Cia
Quem faz a escala continua na planilha do Google. Em **Ajustes → Atualizar com a planilha (.xlsx)** o app lê as abas
PLGD, Cb Dia, Sgt de Dia e Perm Cmdo, mostra um resumo do que muda e, ao confirmar:
- fixa os dias já publicados na planilha;
- recalibra as folgas a partir do dia (a planilha também conta missões e outros serviços);
- marca como fora da escala quem está em branco na planilha;
- guarda a planilha para comparar: a Previsão avisa quando o app e a planilha divergem e oferece "Usar planilha".
Depois do último dia preenchido, o app sugere pela folga. Na Perm Cmdo, quem está entrando ou saindo de serviço em outra escala (ESV/SSV) fica impedido.

## Previsão para o pessoal (somente leitura)
`previsao.html` é uma página pública, sem login, com os próximos 45 dias de todas as escalas (só datas e nomes).
O app do editor publica essa cópia sozinho a cada alteração e ao ser aberto (registro `publico.previsao`, com leitura
para qualquer pessoa e edição só do editor). Requer **Row security** ligado na tabela do Appwrite.
O militar digita o nome de guerra e vê os próprios serviços.

## Criar escalas
Em **Ajustes → Escalas → Nova escala** o sargenteante cria um novo posto ou função (ex.: motorista de dia):
nome, quantos entram na preta e na vermelha, e se é só em dias úteis. A escala nova ganha previsão, quadro,
conferência, serviço do dia e entra na página pública. No cadastro do militar, "Mesmo militar de outra escala"
impede escalá-lo no dia em que entra ou sai de serviço na outra escala. Escalas criadas podem ser editadas e
excluídas (quando não têm militares).

## Abas
- **Hoje**: serviço do dia em todas as escalas, efetivo, afastados, descanso e alertas.
- **Previsão**: cartões dia a dia para deslizar, tabela de até 180 dias, destaque de militar e exportação para Excel.
- **Quadro**: planilha militar × dia com folgas, serviços, afastamentos e linha de **conferência** (prova real).
- **Militares**, **Afastamentos** e **Ajustes**.

## Como rodar

São arquivos estáticos, sem build: `index.html` (o sistema) e `config.js` (configuração do Appwrite).
Com o `config.js` sem preencher, o sistema abre em **modo demonstração** (dados de exemplo, nada é salvo).

## Ligar ao Appwrite

O sistema usa **uma tabela** dentro de um banco que já exista (no plano gratuito só há 1 banco; pode ser o mesmo de outro app).

1. **Projeto**: em Settings, anote o **Project ID** e o **API Endpoint**.
2. **Banco**: em Databases, abra o banco existente e anote o **Database ID**.
3. **Tabela**: dentro dele, *Create table* (ou *Create collection*) com ID `escala_registros` e dois campos **String**:
   - `col`: tamanho 40, obrigatório
   - `dados`: tamanho 1000000, obrigatório (se o console não aceitar, use o tipo *Text*)
4. **Usuário**: Auth → *Create user* com seu e-mail e senha. Anote o **User ID** dele.
5. **Permissões da tabela** (Settings → Permissions): *Add role* → **Select users** → escolha o seu usuário →
   marque *Create, Read, Update, Delete*. **Não** use "All users" se o projeto tiver outros usuários (ex.: de outro app).
   Para liberar mais pessoas, repita com cada usuário ou crie um *Team* e dê a permissão ao time.
6. **Domínio**: Overview → *Add platform* → **Web**, com o domínio da Vercel e `localhost`.
7. **Configuração**: edite `config.js` com endpoint, Project ID e Database ID.

### Publicar na Vercel
*Add New → Project* → importe este repositório → Framework Preset **Other** → *Deploy*. Não precisa de build.

### Levar os dados da versão no Claude
Na versão no Claude: **Ajustes → Baixar backup (JSON)**. Na versão no Appwrite: **Ajustes → Importar backup**.

## Como os dados ficam no Appwrite
Uma única coleção (`registros`). Cada documento tem id `<tipo>.<id>` e o conteúdo em JSON no atributo `dados`:
`militares.*`, `afastamentos.*`, `meses.*` (histórico mensal de cada escala) e `config.geral` (regras e feriados).
As alterações aparecem em tempo real em todos os aparelhos abertos.
