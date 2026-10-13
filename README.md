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
É um único arquivo `index.html`, sem dependências de build. Abra no navegador ou publique no GitHub Pages / Vercel.

> Os dados são salvos pelo armazenamento da versão publicada no Claude (artifact).
> Aberto fora dele, o sistema funciona em **modo demonstração** (dados de exemplo, sem salvar).
> Para uso independente, o próximo passo é ligar o armazenamento a um banco próprio (ex.: Supabase).
