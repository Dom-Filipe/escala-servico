# Escala de Serviço 24h

Sistema web para montar e conferir as escalas de serviço de 24 horas:
**Guarda** (soldados, 4 por dia), **Cabo de dia** e **Sargento de dia** (1 por dia cada).

## Regras implementadas
- **Escala preta** (segunda a sexta) e **escala vermelha** (sábado, domingo e feriados), cada uma com folga própria.
- Em cada dia entra o militar **mais folgado** na cor do dia. Desempate: há mais tempo sem serviço, depois a ordem da lista.
- **Descanso mínimo de 48 h** após o serviço (quem tira sexta não pega sábado nem domingo).
- **Afastamentos** (saúde, férias, dispensa, missão, curso etc.): o militar sai da escala e a folga **continua contando**.
  No dia seguinte ao fim do afastamento ele se **apresenta** e, 24 h depois, **entra de serviço**.
- Feriados nacionais calculados automaticamente (inclui Carnaval, Sexta-feira Santa e Corpus Christi) e feriados locais cadastráveis.
- Dias passados ficam gravados no histórico; trocas manuais são respeitadas e o restante se recalcula.

## Abas
- **Hoje**: serviço do dia em todas as escalas, efetivo, afastados, descanso e alertas.
- **Previsão**: cartões dia a dia para deslizar, tabela de até 180 dias, destaque de militar e exportação para Excel.
- **Quadro**: planilha militar × dia com folgas, serviços, afastamentos e linha de **conferência** (prova real).
- **Militares**, **Afastamentos** e **Ajustes**.

## Como rodar

São arquivos estáticos, sem build: `index.html` (o sistema) e `config.js` (configuração do Appwrite).
Com o `config.js` sem preencher, o sistema abre em **modo demonstração** (dados de exemplo, nada é salvo).

## Ligar ao Appwrite

1. **Projeto**: no console do Appwrite, abra (ou crie) um projeto e anote o **Project ID** e o **API Endpoint** (Settings).
2. **Banco**: Databases → *Create database* com ID `escala`.
3. **Coleção**: dentro do banco, *Create collection* com ID `registros` e crie dois atributos do tipo **String**:
   - `col` — tamanho 40, obrigatório
   - `dados` — tamanho 1000000, obrigatório
4. **Permissões da coleção** (Settings da coleção → Permissions): adicione o papel **Users** com *Create, Read, Update, Delete*.
   Deixe *Document security* desligado.
5. **Usuário**: Auth → Users → crie o seu usuário com e-mail e senha.
   Em Auth → Security, ajuste **Users limit** para o número de usuários que vão usar, para ninguém mais conseguir se cadastrar.
6. **Domínio**: Overview → *Platforms* → *Add platform* → **Web**, com o domínio onde o sistema vai rodar
   (ex.: `escala-servico.vercel.app`) e também `localhost` para testes.
7. **Configuração**: edite `config.js` com o endpoint e o Project ID.

### Publicar na Vercel
*Add New → Project* → importe este repositório → Framework Preset **Other** → *Deploy*. Não precisa de build.

### Levar os dados da versão no Claude
Na versão no Claude: **Ajustes → Baixar backup (JSON)**. Na versão no Appwrite: **Ajustes → Importar backup**.

## Como os dados ficam no Appwrite
Uma única coleção (`registros`). Cada documento tem id `<tipo>.<id>` e o conteúdo em JSON no atributo `dados`:
`militares.*`, `afastamentos.*`, `meses.*` (histórico mensal de cada escala) e `config.geral` (regras e feriados).
As alterações aparecem em tempo real em todos os aparelhos abertos.
