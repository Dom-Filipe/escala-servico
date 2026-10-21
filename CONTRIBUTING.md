# Fluxo de trabalho com Git

A `main` é sempre a versão **estável**, a que está no ar na Vercel. Nada é feito direto nela.

## 1. Uma branch para cada mudança

```bash
git checkout main
git pull
git checkout -b feat/escala-motorista
```

Nomes das branches:

| Prefixo   | Quando usar                    | Exemplo                        |
|-----------|--------------------------------|--------------------------------|
| `feat/`   | função nova                    | `feat/exportar-pdf`            |
| `fix/`    | correção de erro               | `fix/descanso-48h-feriado`     |
| `chore/`  | manutenção, config, docs       | `chore/fluxo-de-trabalho`      |

## 2. Commits pequenos e claros

Formato: `tipo: o que mudou` (no imperativo, em português).

```
feat: adiciona escala de motorista de dia
fix: respeita descanso de 48 h na véspera de feriado
docs: explica como importar a planilha
```

Um commit = uma ideia. Se a mensagem precisa de "e", provavelmente são dois commits.

## 3. Pull request (PR)

```bash
git push -u origin feat/escala-motorista
```

No GitHub, abra o PR para a `main`. O modelo de descrição aparece sozinho.
A Vercel cria uma **URL de preview** só para esse PR: teste nela antes de aprovar.

## 4. Merge e limpeza

Tudo certo na preview → **Squash and merge** → apague a branch.
A Vercel publica a `main` em produção automaticamente.

## Se algo quebrar em produção

No GitHub, abra o PR que causou o problema e clique em **Revert**.
Isso cria um PR que desfaz a mudança; faça o merge e a versão anterior volta ao ar.
