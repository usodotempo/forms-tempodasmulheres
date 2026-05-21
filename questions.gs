function generateFESPSPSurveyForm() {
  const form = FormApp.create(
    "Pesquisa: Como as Mulheres Vivem o Tempo em São Paulo",
  );
  // form.setDescription("");

  // --- BLOCO 1: IDENTIFICAÇÃO E TRIAGEM ---
  const s1 = form
    .addPageBreakItem()
    .setTitle("Bloco 1: Identificação e Triagem");

  form.addTextItem().setTitle("0. Código do formulário").setRequired(true);
  form
    .addTextItem()
    .setTitle("0.1 Nome da pesquisadora responsável")
    .setRequired(true);
  form.addDateItem().setTitle("0.2 Data da coleta").setRequired(true);
  form.addTextItem().setTitle("0.3 Ponto da coleta").setRequired(true);
  form.addTextItem().setTitle("1. Qual é o seu nome?");

  const q2 = form
    .addMultipleChoiceItem()
    .setTitle("2. Quantos anos você tem?")
    .setHelpText("Se idade menor que 20 ou maior que 50, agradeça e encerre.");
  q2.setChoices([
    q2.createChoice("Menos de 20 anos", FormApp.PageNavigationType.SUBMIT_FORM),
    q2.createChoice("Entre 20 e 50 anos", FormApp.PageNavigationType.CONTINUE),
    q2.createChoice("Mais de 50 anos", FormApp.PageNavigationType.SUBMIT_FORM),
  ]).setRequired(true);

  form.addDateItem().setTitle("3. Qual é a sua data de nascimento?");

  const q4 = form
    .addMultipleChoiceItem()
    .setTitle("4. Você mora na cidade de São Paulo?");
  q4.setChoices([
    q4.createChoice("Sim", FormApp.PageNavigationType.CONTINUE),
    q4.createChoice("Não", FormApp.PageNavigationType.SUBMIT_FORM),
  ]).setRequired(true);

  // --- BLOCO 2: PERFIL SOCIODEMOGRÁFICO ---
  const s2 = form
    .addPageBreakItem()
    .setTitle("Bloco 2: Perfil Sociodemográfico");

  form
    .addMultipleChoiceItem()
    .setTitle("5. Em qual região da cidade de São Paulo você mora?")
    .setChoices(["Norte", "Sul", "Leste", "Oeste", "Centro"]);
  form.addTextItem().setTitle("6. Qual o nome do bairro onde você mora?");
  form
    .addListItem()
    .setTitle("7. Religião")
    .setHelpText("Leia devagar na ordem.")
    .setChoices([
      "Católica",
      "Evangélica Neo-pentecostal",
      "Protestante",
      "Espírita/ Kardecista/ Espiritualista",
      "Umbanda",
      "Candomblé/ outras afro-brasileiras",
      "Não tem religião",
      "Agnóstico",
      "Ateu",
      "Outra",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle("8. Qual é o seu estado civil?")
    .setChoices([
      "Solteira",
      "Casada",
      "Divorciada",
      "Separada",
      "Viúva",
      "União estável",
      "NS/NR",
    ]);

  // --- BLOCO 3: MATERNIDADE E FAMÍLIA ---
  const s3 = form.addPageBreakItem().setTitle("Bloco 3: Maternidade e Família");
  const q9 = form.addMultipleChoiceItem().setTitle("9. Você têm filhos?");

  const s3_filhos = form
    .addPageBreakItem()
    .setTitle("Bloco 3.1: Detalhes sobre Filhos");
  form
    .addGridItem()
    .setTitle("10. Quantos filhos você possui em cada faixa etária?")
    .setRows([
      "0 a 4 anos",
      "5 a 9 anos",
      "10 a 14 anos",
      "15 a 19 anos",
      "Mais de 19 anos",
    ])
    .setColumns(["0", "1", "2", "3", "4+"]);

  const s3_idosos = form
    .addPageBreakItem()
    .setTitle("Bloco 3.2: Familiares e Moradia");
  q9.setChoices([
    q9.createChoice("Sim", FormApp.PageNavigationType.CONTINUE),
    q9.createChoice("Não", s3_idosos),
  ]);

  form
    .addMultipleChoiceItem()
    .setTitle("11. Você têm familiares com mais de 60 anos/idosos vivos?")
    .setChoices(["Sim", "Não"]);
  form
    .addListItem()
    .setTitle("12. Quantos familiares idosos vivos você tem?")
    .setChoices(["1", "2", "3", "4", "5", "6 ou mais", "NA"]);
  form
    .addCheckboxItem()
    .setTitle("13. Com quem você mora? (Múltipla seleção)")
    .setChoices([
      "Sozinha",
      "Companheira/o",
      "Filhos/as",
      "Amigos/as",
      "Pais",
      "Outros familiares",
    ]);

  // --- BLOCO 4: ESTRUTURA DOMÉSTICA E RENDA ---
  const s4 = form
    .addPageBreakItem()
    .setTitle("Bloco 4: Estrutura Doméstica e Renda");
  const q14 = form
    .addMultipleChoiceItem()
    .setTitle("14. Você possui empregada e/ou diarista?");

  const s4_frequencia = form
    .addPageBreakItem()
    .setTitle("Bloco 4.1: Frequência de Serviço");
  form
    .addListItem()
    .setTitle("15. Com que frequência utiliza o serviço?")
    .setChoices([
      "1x semanal",
      "2x por semana",
      "4x por semana",
      "5x por semana",
      "6x por semana",
      "7x por semana",
    ]);

  const s4_identidade = form
    .addPageBreakItem()
    .setTitle("Bloco 4.2: Identidade e Bens");
  q14.setChoices([
    q14.createChoice("Sim", FormApp.PageNavigationType.CONTINUE),
    q14.createChoice("Não", s4_identidade),
  ]);

  form
    .addMultipleChoiceItem()
    .setTitle("16. Como você se identifica em relação ao seu gênero?")
    .setChoices([
      "Mulher Cisgênero",
      "Mulher Transgênero",
      "Não Binário",
      "Travesti",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle("17. Orientação Sexual")
    .setChoices([
      "Heterossexual",
      "Lésbica",
      "Bi-sexual",
      "Assexual",
      "Pansexual",
      "NS/NR",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle("18. Cor ou raça")
    .setChoices(["Branca", "Preta", "Parda", "Amarela", "Indígena"]);
  form
    .addCheckboxItem()
    .setTitle("19. Quais desses itens sua casa possui?")
    .setChoices(["Máquina de lavar roupas", "Aspirador de pó", "Tanquinho"]);
  form
    .addTextItem()
    .setTitle("20. Rendimento bruto mensal (Valor)")
    .setHelpText("Considere todas as fontes de renda.");

  // --- BLOCO 5: EDUCAÇÃO E PERCEPÇÃO ---
  const s5 = form
    .addPageBreakItem()
    .setTitle("Bloco 5: Educação e Percepção do Tempo");
  form
    .addListItem()
    .setTitle("21. Qual o curso mais elevado que concluiu anteriormente?")
    .setChoices([
      "Alfabetização",
      "Primário",
      "Ensino fundamental",
      "Ensino Médio",
      "Superior de graduação",
      "Especialização",
      "Mestrado",
      "Doutorado",
      "NS/NR",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle(
      "22. Atualmente você frequenta escola, faculdade ou curso técnico?",
    )
    .setChoices(["Sim, presencial", "Sim, à distância", "Sim, híbrido", "Não"]);
  form
    .addMultipleChoiceItem()
    .setTitle(
      "23. Deixou de estudar na última semana para realizar afazeres domésticos ou cuidar de alguém?",
    )
    .setChoices(["Sim", "Não", "NA"]);
  form
    .addMultipleChoiceItem()
    .setTitle("24. Como se sente em relação ao uso do seu tempo?")
    .setChoices([
      "Muito Insatisfeita",
      "Insatisfeita",
      "Nem satisfeita nem insatisfeita",
      "Satisfeita",
      "Muito satisfeita",
    ]);

  const q25 = form
    .addCheckboxItem()
    .setTitle(
      "25. A quais das seguintes áreas você dedica mais tempo? (Escolha até 3)",
    );
  q25.setChoices([
    "Trabalho",
    "Lazer",
    "Cuidados Pessoais",
    "Cuidados De Terceiros",
    "Trajeto/Trânsito/Deslocamento",
    "Família",
    "Relacionamento Afetivo",
    "Atividade Física",
  ]);
  q25.setValidation(
    FormApp.createCheckboxValidation().requireSelectAtMost(3).build(),
  );

  // --- BLOCO 6: TRABALHO REMUNERADO ---
  const s6 = form.addPageBreakItem().setTitle("Bloco 6: Trabalho Remunerado");
  form
    .addCheckboxItem()
    .setTitle("26. Realizou trabalho remunerado na última semana?")
    .setChoices([
      "Não",
      "Sim (CLT)",
      "Sim (PJ)",
      "Sim (Estágio)",
      "Sim (Autônoma)",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle("27. Modalidade de trabalho")
    .setChoices(["Presencial", "Home office", "Híbrido", "NA"]);
  form
    .addMultipleChoiceItem()
    .setTitle("28. Se não trabalhou, o motivo foi afazeres domésticos/cuidado?")
    .setChoices(["Sim", "Não", "NA"]);
  form
    .addDurationItem()
    .setTitle(
      "29. Horas trabalhadas de forma remunerada na semana (Tempo Total)",
    );
  form
    .addDurationItem()
    .setTitle(
      "30. MOBILIDADE: Tempo gasto em trajetos para o trabalho (Semanal)",
    );

  // --- BLOCO 7 E 8: TEMPOS DE CUIDADO E ROTINA ---
  const s7 = form
    .addPageBreakItem()
    .setTitle("Bloco 7 e 8: Cuidados Pessoais e Domésticos");
  form
    .addDurationItem()
    .setTitle("31. Cuidados pessoais básicos (Dormir, comer, higiene)");
  form
    .addDurationItem()
    .setTitle("32. Rotina Manual (Cozinha, Limpeza e Roupas)")
    .setHelpText("Considere faxinas pesadas e preparo antecipado.");
  form
    .addDurationItem()
    .setTitle(
      "33. Gestão e Suprimento (Pagar contas, planejar gastos, compras)",
    );
  form
    .addDurationItem()
    .setTitle("34. Cuidado com Animais Domésticos e Plantas");
  form
    .addDurationItem()
    .setTitle("35.1 Tarefas domésticas para PARENTES que NÃO moram com você");
  form
    .addDurationItem()
    .setTitle(
      "35.2 Tarefas domésticas na casa de AMIGOS/VIZINHOS (Voluntário)",
    );

  form
    .addGridItem()
    .setTitle("36. Matriz de Cuidado Direto (Horas Semanais)")
    .setHelpText("Tempo dedicado a alimentar, banhar, medicar, brincar, etc.")
    .setRows([
      "Crianças (0-14)",
      "Adultos/Adolescentes (15-59)",
      "Idosos (60+)",
      "PCD",
    ])
    .setColumns(["No seu próprio domicílio", "No domicílio de parentes"]);

  form
    .addDurationItem()
    .setTitle("37.1 MOBILIDADE: Transportar pessoas do SEU domicílio");
  form
    .addDurationItem()
    .setTitle("37.2 MOBILIDADE: Transportar pessoas de domicílio de PARENTES");
  form
    .addDurationItem()
    .setTitle(
      "39. CUIDADO PASSIVO: Tempo em condição de ALERTA enquanto faz outras atividades",
    );

  // --- BLOCO 9: LAZER, ESTUDO E RELIGIÃO ---
  const s9 = form
    .addPageBreakItem()
    .setTitle("Bloco 9: Lazer, Estudo e Religião");
  form.addDurationItem().setTitle("40. Frequentar aulas e cursos");
  form.addDurationItem().setTitle("41. Estudar em casa e tarefas relacionadas");
  form.addDurationItem().setTitle("42. MOBILIDADE: Trajetos para estudo");
  form
    .addDurationItem()
    .setTitle("43. Conversar com amigos e familiares (Online ou presencial)");
  form
    .addDurationItem()
    .setTitle("44. Assistir TV/Vídeos e ouvir Rádio/Podcast");
  form
    .addCheckboxItem()
    .setTitle("45. Atividades simultâneas enquanto consome mídia")
    .setChoices([
      "Não",
      "Limpar a casa",
      "Lavar/Passar",
      "Cuidar de pessoas",
      "Se deslocar",
      "Outros",
    ]);
  form.addDurationItem().setTitle("46. Ler por lazer");
  form
    .addDurationItem()
    .setTitle("47. Ócio (Ficar recostada/pensando sem outra atividade)");
  form
    .addDurationItem()
    .setTitle("48. Religião: Cultos, missas e eventos (Incluindo traslado)");
  form
    .addDurationItem()
    .setTitle("49. Exercícios e Atividades Físicas (Incluindo traslado)");

  // --- BLOCO 10: AUTONOMIA E POLÍTICA ---
  const s10 = form
    .addPageBreakItem()
    .setTitle("Bloco 10: Percepção, Autonomia e Política");
  form
    .addMultipleChoiceItem()
    .setTitle(
      "50. Considera que faz mais do que lhe corresponde nas tarefas da casa?",
    )
    .setChoices(["Sim", "Não", "NS/NR"]);
  form
    .addMultipleChoiceItem()
    .setTitle("51. O tempo foi suficiente para realizar tudo o que precisava?")
    .setChoices(["Sim", "Não", "NS/NR"]);
  form
    .addMultipleChoiceItem()
    .setTitle("52. Quem geralmente decide sobre grandes gastos no domicílio?")
    .setChoices([
      "Somente você",
      "Você e parceiro(a)",
      "Somente parceiro(a)",
      "Outro homem da família",
      "Outra mulher da família",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle("53. Quem decide sobre se você pode trabalhar fora?")
    .setChoices([
      "Somente você",
      "Você e parceiro(a)",
      "Somente parceiro(a)",
      "Outro homem",
      "Outra mulher",
    ]);
  form
    .addMultipleChoiceItem()
    .setTitle("54. Como se sente (novamente) em relação ao uso do seu tempo?")
    .setChoices([
      "Muito Insatisfeita",
      "Insatisfeita",
      "Nem satisfeita",
      "Satisfeita",
      "Muito satisfeita",
    ]);

  const q56 = form
    .addCheckboxItem()
    .setTitle(
      "56. Você considera que alguma área da sua vida está sendo negligenciada? (Até 3)",
    );
  q56.setChoices([
    "Trabalho",
    "Lazer",
    "Cuidados Pessoais",
    "Cuidados De Terceiros",
    "Trajeto/Deslocamento",
    "Família",
    "Relacionamento Afetivo",
    "Atividade Física",
  ]);
  q56.setValidation(
    FormApp.createCheckboxValidation().requireSelectAtMost(3).build(),
  );

  form
    .addMultipleChoiceItem()
    .setTitle(
      "57. Em relação às suas preferências políticas, você se considera:",
    )
    .setChoices([
      "Extrema esquerda",
      "Esquerda",
      "Centro",
      "Direita",
      "Extrema direita",
      "NS/NR",
    ]);

  Logger.log("Formulário Gerado com Sucesso!");
  Logger.log("URL de Edição: " + form.getEditUrl());
}
