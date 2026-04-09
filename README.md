# Gasolina x Etanol

Calculadora web para descobrir qual combustível é mais vantajoso com base nos preços atuais.

## Como funciona

A regra é simples: o etanol vale a pena quando seu preço é **menor ou igual a 70%** do preço da gasolina.

```
razão = preço_etanol / preço_gasolina

razão < 0.70  → Etanol é melhor
razão = 0.70  → Indiferente
razão > 0.70  → Gasolina é melhor
```

## Funcionalidades

- Máscara de moeda automática (formato `R$ 0,00`)
- Validação dos campos antes do cálculo
- Exibe a razão percentual e a economia por litro
- Resultado animado com card colorido por combustível
- Suporte a Enter para calcular
- Totalmente responsivo

## Estrutura

```
gasolina-x-etanol/
├── index.html   # Markup e config do Tailwind
└── js/
    └── main.js  # Máscara, cálculo, validação e eventos
```

## Tecnologias

- HTML5
- [Tailwind CSS](https://tailwindcss.com) via CDN — toda a estilização usa classes utilitárias, sem CSS customizado
- JavaScript vanilla

## Como rodar

Basta abrir o `index.html` no navegador. Não há dependências, build ou instalação necessários.
