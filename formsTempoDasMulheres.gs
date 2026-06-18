function generateFESPSPSurveyForm() {
  // converte array de strings em choices simples
  function choices(item, labels) {
    return labels.map((label) => item.createChoice(label));
  }

  // faixas de horas reutilizadas em várias perguntas
  const options50 = [
    "Zero",
    "1-5",
    "5-10",
    "10-15",
    "15-20",
    "20-25",
    "25-30",
    "30-35",
    "35-40",
    "40-45",
    "45-50",
    ">50 horas",
  ];

  const form = FormApp.create("Pesquisa: Como as Mulheres Vivem o Tempo");

  // BLOCO 1: IDENTIFICAÇÃO

  form.addTextItem().setTitle("Código do formulário").setRequired(true);
  form.addTextItem().setTitle("0. Pesquisadora responsável").setRequired(true);
  form.addDateItem().setTitle("0.1. Data da coleta").setRequired(true);
  form.addTextItem().setTitle("0.2. Ponto da coleta").setRequired(true);

  // BLOCO 2: TRIAGEM

  form.addPageBreakItem().setTitle("Bloco 2: Triagem Idade");

  // Q1 - Idade (condicional)
  const itemAge = form.addTextItem();

  const validationAge = FormApp.createTextValidation()
    .requireNumberBetween(20, 50)
    .setHelpText("Se menor que 20 ou maior que 50, agradeça e encerre.")
    .build();

  itemAge
    .setTitle("1. Quantos anos você tem?")
    .setRequired(true)
    .setValidation(validationAge);

  form.addPageBreakItem().setTitle("Bloco 2: Triagem Cidade");

  // Q2 - Mora em SP (condicional)
  const q2 = form
    .addMultipleChoiceItem()
    .setTitle("2. Você mora na cidade de São Paulo?")
    .setRequired(true);

  q2.setChoices([
    q2.createChoice("Sim", FormApp.PageNavigationType.CONTINUE),
    q2.createChoice("Não", FormApp.PageNavigationType.SUBMIT),
  ]);

  // BLOCO 3: PERFIL SOCIODEMOGRÁFICO

  form.addPageBreakItem().setTitle("Bloco 3: Perfil Sociodemográfico");

  // Q3
  const q3 = form
    .addMultipleChoiceItem()
    .setTitle("3. Em qual região da cidade de São Paulo você mora?")
    .setRequired(true);
  q3.setChoices(choices(q3, ["Norte", "Sul", "Leste", "Oeste", "Centro"]));

  // Q4
  form
    .addTextItem()
    .setTitle("4. Qual o nome do bairro onde você mora?")
    .setRequired(true);

  // Q5 - Cor/raça
  const q5 = form
    .addMultipleChoiceItem()
    .setTitle("5. Sua cor ou raça é:")
    .setRequired(true);
  q5.setChoices(
    choices(q5, [
      "Branca",
      "Preta",
      "Parda",
      "Amarela",
      "Indígena",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q6 - Gênero
  const q6 = form
    .addMultipleChoiceItem()
    .setTitle("6. Como você se identifica em relação ao seu gênero?")
    .setHelpText("Ler definições entre parênteses apenas se necessário.")
    .setRequired(true);
  q6.setChoices(
    choices(q6, [
      "Mulher Cisgênero (pessoa que se identifica com o gênero feminino, atribuído no nascimento)",
      "Mulher Transgênero (pessoa que se identifica como mulher, mas foi designada com outro gênero ao nascer)",
      "Não Binário (pessoa cuja identidade de gênero não se encaixa exclusivamente como homem ou mulher)",
      "Travesti (identidade de gênero historicamente construída por pessoas designadas homens ao nascer que vivem o gênero feminino de forma própria e política)",
    ]),
  );

  // BLOCO 3: MATERNIDADE E FAMÍLIA

  form.addPageBreakItem().setTitle("Bloco 3: Maternidade e Família");

  // Q7 - Filhos
  const q7 = form
    .addMultipleChoiceItem()
    .setTitle("7. Você têm filhos?")
    .setRequired(true);
  q7.setChoices(choices(q7, ["Sim", "Não"]));

  // Q8 - Quantidade de filhos por faixa etária
  form
    .addGridItem()
    .setTitle("8. Quantos filhos você possui em cada faixa etária?")
    .setHelpText("Marcar quantidade de filhos em cada box.")
    .setRows([
      "0 a 4 anos",
      "5 a 9 anos",
      "10 a 14 anos",
      "15 a 19 anos",
      "Mais de 19 anos",
      "NA (não se aplica/não tenho filhos)",
    ])
    .setColumns(["0", "1", "2", "3", "4+", "NA"]);

  // Q9 - Idosos
  const q9 = form
    .addMultipleChoiceItem()
    .setTitle("9. Você têm familiares com mais de 60 anos/idosos vivos?")
    .setRequired(true);
  q9.setChoices(choices(q9, ["Sim", "Não"]));

  // Q10 - Com quem mora
  form
    .addCheckboxItem()
    .setTitle(
      "10. Com quem você mora? (Marque todas as alternativas correspondentes, podendo ser mais de 1)",
    )
    .setChoiceValues([
      "Sozinha",
      "Filhos/as",
      "Companheira/o",
      "Amigos/as",
      "Pais",
      "Outros familiares",
    ])
    .setRequired(true);

  // BLOCO 4: ESTRUTURA DOMÉSTICA E RENDA

  form.addPageBreakItem().setTitle("Bloco 4: Estrutura Doméstica e Renda");

  // Q11 - Empregada/diarista
  const q11 = form
    .addMultipleChoiceItem()
    .setTitle(
      "11. Você possui serviço de empregada e/ou diarista para a realização de tarefas domésticas?",
    )
    .setRequired(true);
  q11.setChoices(
    choices(q11, [
      "Não",
      "Sim, mensalmente",
      "Sim, quinzenalmente",
      "Sim, semanalmente",
      "Sim, 2-3x por semana",
      "Sim, diariamente",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q12 - Itens da casa
  form
    .addCheckboxItem()
    .setTitle(
      "12. Quais desses itens sua casa possui? (Assinale todas as alternativas correspondentes)",
    )
    .setChoiceValues([
      "Máquina de lavar roupas",
      "Aspirador de pó",
      "Tanquinho",
    ]);

  // Q13 - Renda familiar
  const q13 = form
    .addMultipleChoiceItem()
    .setTitle(
      "13. Qual é a sua renda familiar? (Rendimento bruto mensal normalmente recebido pelo(s) responsável(is) pelo domicílio. Considere rendimentos de trabalho, aposentadoria, Bolsa Família ou outra origem.)",
    )
    .setRequired(true);
  q13.setChoices(
    choices(q13, [
      "R$ 0 - 2.000",
      "R$ 2.001 a 3.500",
      "R$ 3.501 a 5.000",
      "R$ 5.001 - 6.500",
      "R$ 6.501 a 8.000",
      "> R$ 8.000",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // BLOCO 5: TRABALHO REMUNERADO

  form.addPageBreakItem().setTitle("Bloco 5: Trabalho Remunerado");

  // Q14 - múltipla seleção (CheckboxItem não suporta navegação condicional)
  const q14 = form
    .addCheckboxItem()
    .setTitle(
      "14. Nos últimos 7 dias, você realizou algum trabalho remunerado?",
    )
    .setHelpText(
      "Marque todas as que correspondem ao trabalho realizado na última semana, podendo ser mais de 1 opção.",
    )
    .setRequired(true);
  q14.setChoices(
    choices(q14, [
      "Não",
      "Sim, trabalho formal com carteira assinada/CLT/PJ",
      "Sim, trabalho informal, em atividade autônoma ou própria (ex: consultora de vendas em cosméticos e produtos para o lar, artesanato, costura, cuidadora de animais de estimação e etc)",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q15 - não obrigatória (pular se respondeu Não na Q14)
  const q15 = form
    .addMultipleChoiceItem()
    .setTitle("15. Em qual modalidade de trabalho?")
    .setHelpText("Pular se respondeu Não na pergunta 14.")
    .setRequired(false);
  q15.setChoices(
    choices(q15, [
      "Presencial",
      "Home office/teletrabalho",
      "Híbrido (presencial alternado com teletrabalho)",
      "NA (não se aplica/não trabalhou)",
    ]),
  );

  // Q16 - não obrigatória (pular se respondeu Não na Q14)
  const q16 = form
    .addMultipleChoiceItem()
    .setTitle(
      "16. Nos últimos 7 dias, quantas horas você trabalhou de forma remunerada?",
    )
    .setHelpText("Pular se respondeu Não na pergunta 14.")
    .setRequired(false);
  q16.setChoices(
    choices(q16, [
      "Zero",
      "1-10",
      "10-20",
      "20-30",
      "30-40",
      "40-50",
      "50-60",
      ">60 horas",
    ]),
  );

  // Q17
  const q17 = form
    .addMultipleChoiceItem()
    .setTitle(
      "17. Se você não trabalhou na última semana, qual o motivo principal?",
    )
    .setRequired(true);
  q17.setChoices(
    choices(q17, [
      "Necessidade de realizar afazeres domésticos",
      "Cuidar de alguém (crianças, idosos, pessoas com deficiência)",
      "Outros",
      "NS (não sabe)",
      "NR (não respondeu)",
      "NA (não se aplica, pois trabalhou)",
    ]),
  );

  // BLOCO 6: CUIDADOS PESSOAIS

  form.addPageBreakItem().setTitle("Bloco 6: Cuidados Pessoais");

  // Q18
  const q18 = form
    .addMultipleChoiceItem()
    .setTitle(
      "18. Nos últimos 7 dias, quantas horas você dedicou a dormir, incluindo cochilos?",
    )
    .setRequired(true);
  q18.setChoices(
    choices(q18, [
      "Zero",
      "1-10",
      "10-20",
      "20-30",
      "30-40",
      "40-50",
      "50-60",
      "60-70",
      "70-80",
      ">80 horas",
    ]),
  );

  // Q19
  const q19 = form
    .addMultipleChoiceItem()
    .setTitle(
      "19. Nos últimos 7 dias, quantas horas você dedicou aos seus cuidados pessoais básicos, alimentar-se (refeições e lanches) e sua higiene/arrumação pessoal (banho, vestir-se, escovar os dentes, etc)?",
    )
    .setRequired(true);
  q19.setChoices(options50.map((o) => q19.createChoice(o)));

  // BLOCO 7: TRABALHO DOMÉSTICO NÃO REMUNERADO - NO PRÓPRIO DOMICÍLIO

  form
    .addPageBreakItem()
    .setTitle(
      "Bloco 7: Trabalho Doméstico Não Remunerado - No Próprio Domicílio",
    );

  // Q20
  const q20 = form
    .addMultipleChoiceItem()
    .setTitle("20. Rotina Manual (Cozinha, Limpeza e Roupas)")
    .setHelpText(
      "Nos últimos 7 dias, quantas horas você dedicou às tarefas manuais de rotina e de limpeza em sua casa, como preparar alimentos, lavar louça, limpar a moradia e cuidar das roupas (lavar/passar/guardar), gestão e ao abastecimento da sua residência, como planejar e pagar contas, administrar o lar, pesquisar preços e fazer compras, cuidar de animais domésticos e plantas?",
    )
    .setRequired(true);
  q20.setChoices(options50.map((o) => q20.createChoice(o)));

  // Q21
  const q21 = form
    .addMultipleChoiceItem()
    .setTitle("21. Manutenção (Reparos e consertos do lar)")
    .setHelpText(
      "Nos últimos 7 dias, quantas horas você dedicou a pequenos reparos na casa, em eletrodomésticos e equipamentos da sua residência?",
    )
    .setRequired(true);
  q21.setChoices(options50.map((o) => q21.createChoice(o)));

  // Q22
  const q22 = form
    .addMultipleChoiceItem()
    .setTitle(
      "22. Nos últimos 7 dias, quantas horas você dedicou a limpar, cozinhar, lavar, cuidar de animais de estimação e plantas FORA do seu DOMICÍLIO para PARENTES sem receber pagamento?",
    )
    .setRequired(true);
  q22.setChoices(options50.map((o) => q22.createChoice(o)));

  // Q23
  const q23 = form
    .addMultipleChoiceItem()
    .setTitle(
      "23. Nos últimos 7 dias, quantas horas você dedicou a limpar, cozinhar, lavar, cuidar de animais de estimação e plantas FORA do seu DOMICÍLIO para AMIGOS / VIZINHOS / TRABALHO VOLUNTÁRIO sem receber pagamento?",
    )
    .setRequired(true);
  q23.setChoices(options50.map((o) => q23.createChoice(o)));

  // BLOCO 8: CUIDADO DIRETO

  form
    .addPageBreakItem()
    .setTitle("Bloco 8: Cuidado Direto")
    .setHelpText(
      "Considerando todas as formas de cuidar - alimentar, banhar, medicar, brincar, ajudar nos estudos, planejar e agendar consultas e exames ou levar ao médico - responda as perguntas a seguir.",
    );

  // Q24
  const subQ24 = [
    { id: "24.1", label: "Crianças (0-14 anos) - No seu próprio domicílio" },
    { id: "24.2", label: "Crianças (0-14 anos) - No domicílio de parentes" },
    {
      id: "24.3",
      label:
        "Crianças (0-14 anos) - Domicílios de vizinhos/comunidade/voluntariado",
    },
    {
      id: "24.4",
      label: "Adultos/adolescentes (15-59 anos) - No seu próprio domicílio",
    },
    {
      id: "24.5",
      label: "Adultos/adolescentes (15-59 anos) - No domicílio de parentes",
    },
    {
      id: "24.6",
      label:
        "Adultos/adolescentes (15-59 anos) - Domicílios de vizinhos/comunidade/voluntariado",
    },
    { id: "24.7", label: "Idosos (60+) - No seu próprio domicílio" },
    { id: "24.8", label: "Idosos (60+) - No domicílio de parentes" },
    {
      id: "24.9",
      label: "Idosos (60+) - Domicílios de vizinhos/comunidade/voluntariado",
    },
    {
      id: "24.10",
      label:
        "Pessoas com deficiência ou dependência permanente - No seu próprio domicílio",
    },
    {
      id: "24.11",
      label:
        "Pessoas com deficiência ou dependência permanente - No domicílio de parentes",
    },
    {
      id: "24.12",
      label:
        "Pessoas com deficiência ou dependência permanente - Domicílios de vizinhos/comunidade/voluntariado",
    },
  ];

  subQ24.forEach(function (sub) {
    const item = form
      .addMultipleChoiceItem()
      .setTitle(
        sub.id +
          ". Nos últimos 7 dias, quantas horas você dedicou a cuidar de: " +
          sub.label +
          "?",
      )
      .setRequired(true);
    item.setChoices(options50.map((o) => item.createChoice(o)));
  });

  // BLOCO 9: ESTUDO

  form.addPageBreakItem().setTitle("Bloco 9: Estudo");

  // Q25
  const q25 = form
    .addMultipleChoiceItem()
    .setTitle(
      "25. Atualmente você frequenta escola, faculdade ou curso técnico?",
    )
    .setHelpText("Assinalar apenas uma opção")
    .setRequired(true);
  q25.setChoices(
    choices(q25, [
      "Sim, de forma presencial",
      "Sim, à distância",
      "Sim, de forma híbrida (presencial alguns dias da semana, online em outros dias)",
      "Não",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q26
  const q26 = form
    .addMultipleChoiceItem()
    .setTitle(
      "26. Nos últimos 7 dias, quantas horas você dedicou a frequentar aulas ou participar de algum curso (presencial ou online)?",
    )
    .setRequired(true);
  q26.setChoices(options50.map((o) => q26.createChoice(o)));

  // Q27
  const q27 = form
    .addMultipleChoiceItem()
    .setTitle(
      "27. Nos últimos 7 dias, FORA do horário de aula, quantas horas você dedicou a estudar em casa e executar tarefas relacionadas ao estudo?",
    )
    .setRequired(true);
  q27.setChoices(options50.map((o) => q27.createChoice(o)));

  // Q28
  const q28 = form
    .addMultipleChoiceItem()
    .setTitle(
      "28. Se você não frequentou a escola/curso ou não estudou em casa na última semana, qual o motivo principal?",
    )
    .setHelpText(
      "Perguntar apenas para quem respondeu zero nas perguntas 26 ou 27",
    )
    .setRequired(false);
  q28.setChoices(
    choices(q28, [
      "Necessidade de realizar afazeres domésticos",
      "Cuidar de alguém (crianças, idosos, pessoas com deficiência)",
      "Outros",
      "NS (não sabe)",
      "NR (não respondeu)",
      "NA (não se aplica, pois não estudou)",
    ]),
  );

  // BLOCO 10: MOBILIDADE

  form
    .addPageBreakItem()
    .setTitle("Bloco 10: Mobilidade para Trabalho e Estudo");

  // Q29
  const q29 = form
    .addMultipleChoiceItem()
    .setTitle(
      "29. Nos últimos 7 dias, quantas horas você gastou em trajetos e deslocamentos de ida e volta para o trabalho e estudos (escola/cursos/faculdade)?",
    )
    .setRequired(true);
  q29.setChoices(options50.map((o) => q29.createChoice(o)));

  // BLOCO 11: LAZER

  form.addPageBreakItem().setTitle("Bloco 11: Lazer");

  // Q30
  const q30 = form
    .addMultipleChoiceItem()
    .setTitle(
      "30. Nos últimos 7 dias, quantas horas você dedicou a conversar com amigos, filhos, familiares (seja online ou pessoalmente)?",
    )
    .setRequired(true);
  q30.setChoices(options50.map((o) => q30.createChoice(o)));

  // Q31
  const q31 = form
    .addMultipleChoiceItem()
    .setTitle(
      "31. Nos últimos 7 dias, quantas horas você dedicou a assistir TV/vídeos, ouvir rádio/podcast/música e ler por lazer?",
    )
    .setRequired(true);
  q31.setChoices(options50.map((o) => q31.createChoice(o)));

  // BLOCO 12: ÓCIO

  form.addPageBreakItem().setTitle("Bloco 12: Ócio");

  // Q32
  const q32 = form
    .addMultipleChoiceItem()
    .setTitle(
      "32. Nos últimos 7 dias, quantas horas você ficou recostada ou sentada, pensando ou refletindo sem fazer nenhuma outra atividade?",
    )
    .setRequired(true);
  q32.setChoices(options50.map((o) => q32.createChoice(o)));

  // BLOCO 13: RELIGIÃO

  form.addPageBreakItem().setTitle("Bloco 13: Religião");

  // Q33
  const q33 = form
    .addMultipleChoiceItem()
    .setTitle(
      "33. Nos últimos 7 dias, quantas horas você dedicou a participar de cultos, missas, sessão, gira e/ou eventos religiosos, contando o deslocamento?",
    )
    .setRequired(true);
  q33.setChoices(options50.map((o) => q33.createChoice(o)));

  // BLOCO 14: EXERCÍCIOS E ATIVIDADES FÍSICAS

  form.addPageBreakItem().setTitle("Bloco 14: Exercícios e Atividades Físicas");

  // Q34
  const q34 = form
    .addMultipleChoiceItem()
    .setTitle(
      "34. Nos últimos 7 dias, quantas horas você dedicou a praticar livremente algum esporte, dançar, fazer yoga, exercício físico ou ir à academia, somando o tempo de deslocamento?",
    )
    .setRequired(true);
  q34.setChoices(options50.map((o) => q34.createChoice(o)));

  // BLOCO 15: AUTONOMIA

  form.addPageBreakItem().setTitle("Bloco 15: Autonomia");

  // Q35
  const q35 = form
    .addMultipleChoiceItem()
    .setTitle("35. Quem geralmente decide sobre grandes gastos no domicílio?")
    .setRequired(true);
  q35.setChoices(
    choices(q35, [
      "Somente você",
      "Você e seu(a) parceiro(a)",
      "Somente seu(a) parceiro(a)",
      "Outro membro da família homem",
      "Outro membro da família mulher",
      "Você e outro membro da família",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q36
  const q36 = form
    .addMultipleChoiceItem()
    .setTitle("36. Quem geralmente decide sobre se você pode trabalhar fora?")
    .setRequired(true);
  q36.setChoices(
    choices(q36, [
      "Somente você",
      "Você e seu(a) parceiro(a)",
      "Somente seu(a) parceiro(a)",
      "Outro membro da família homem",
      "Outro membro da família mulher",
      "Você e outro membro da família",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // BLOCO 16: PERFIL

  form.addPageBreakItem().setTitle("Bloco 16: Perfil");

  // Q37
  const q37 = form
    .addMultipleChoiceItem()
    .setTitle("37. Qual é o seu estado civil?")
    .setRequired(true);
  q37.setChoices(
    choices(q37, [
      "Solteira",
      "Casada",
      "Divorciada",
      "Separada",
      "Viúva",
      "União estável",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q38
  const q38 = form
    .addMultipleChoiceItem()
    .setTitle("38. Qual é a sua orientação sexual?")
    .setRequired(true);
  q38.setChoices(
    choices(q38, [
      "Heterossexual",
      "Lésbica",
      "Bi-sexual",
      "Assexual",
      "Pansexual",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q39
  const q39 = form
    .addMultipleChoiceItem()
    .setTitle("39. Qual o curso mais elevado que concluiu anteriormente?")
    .setRequired(true);
  q39.setChoices(
    choices(q39, [
      "Classes de alfabetização",
      "Primário",
      "Ensino fundamental",
      "Ensino Médio",
      "Ensino Técnico",
      "Superior de graduação",
      "Especialização de nível superior",
      "Mestrado",
      "Doutorado",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  // Q40
  const q40 = form
    .addMultipleChoiceItem()
    .setTitle("40. Qual é a sua religião?")
    .setHelpText(
      '"Leia devagar na ordem. Não pergunte diretamente "qual é sua religião?"',
    )
    .setRequired(true);
  q40.setChoices(
    choices(q40, [
      "Católica",
      "Evangélica/Neo-pentecostal",
      "Protestante tradicional",
      "Espírita / Kardecista / Espiritualista",
      "Umbanda",
      "Candomblé / outras afro-brasileiras",
      "Não tem religião",
      "Agnóstico",
      "Ateu / não acredita em Deus",
    ]),
  );
  q40.showOtherOption(true); // campo aberto para "Outra religião. Qual?"

  // Q41
  const q41 = form
    .addMultipleChoiceItem()
    .setTitle(
      "41. Em relação às suas preferências políticas, você se considera:",
    )
    .setRequired(true);
  q41.setChoices(
    choices(q41, [
      "Extrema esquerda",
      "Esquerda",
      "Centro",
      "Direita",
      "Extrema direita",
      "NS (não sabe)",
      "NR (não respondeu)",
    ]),
  );

  Logger.log("Formulário gerado com sucesso!");
  Logger.log("URL de edição: " + form.getEditUrl());
}
