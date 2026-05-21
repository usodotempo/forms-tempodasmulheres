function generateFESPSPSurveyForm() {
  // Auxiliar: converte array de strings em choices simples
  function choices(item, labels) {
    return labels.map((label) => item.createChoice(label));
  }

  const form = FormApp.create("Pesquisa: Como as Mulheres Vivem o Tempo");

  // --- PÁGINA DE ENCERRAMENTO ---
  const closeForm = form.addPageBreakItem().setTitle("Encerramento");
  const headerEncerramento = form
    .addSectionHeaderItem()
    .setTitle("Este formulário não se aplica ao perfil buscado.");

  // --- BLOCO 1: IDENTIFICAÇÃO ---
  // form.addPageBreakItem().setTitle("Bloco 1: Identificação");

  form.addTextItem().setTitle("0. Código do formulário").setRequired(true);
  form
    .addTextItem()
    .setTitle("0.1 Nome da pesquisadora responsável")
    .setRequired(true);
  form.addDateItem().setTitle("0.2 Data da coleta").setRequired(true);
  form.addTextItem().setTitle("0.3 Ponto da coleta").setRequired(true);
  // form.addTextItem().setTitle("1. Qual é o seu nome?");

  // --- BLOCO 2: TRIAGEM ---
  form.addPageBreakItem().setTitle("Bloco 2: Triagem");

  form.addTextItem().setTitle("2. Quantos anos você tem?").setRequired(true);

  const q2b = form
    .addMultipleChoiceItem()
    .setTitle("2.1 Faixa etária")
    .setHelpText("Se menor que 20 ou maior que 50, agradeça e encerre.")
    .setRequired(true);
  q2b.setChoices([
    q2b.createChoice("Menos de 20 anos", closeForm),
    q2b.createChoice("Entre 20 e 50 anos", FormApp.PageNavigationType.CONTINUE),
    q2b.createChoice("Mais de 50 anos", closeForm),
  ]);

  form.addDateItem().setTitle("3. Qual é a sua data de nascimento?");

  const q4 = form
    .addMultipleChoiceItem()
    .setTitle("4. Você mora na cidade de São Paulo?")
    .setHelpText("Se Não, encerre.")
    .setRequired(true);
  q4.setChoices([
    q4.createChoice("Sim", FormApp.PageNavigationType.CONTINUE),
    q4.createChoice("Não", closeForm),
  ]);

  // --- BLOCO 2: PERFIL SOCIODEMOGRÁFICO ---
  form.addPageBreakItem().setTitle("Bloco 2: Perfil Sociodemográfico");

  const q5 = form
    .addMultipleChoiceItem()
    .setTitle("5. Em qual região da cidade de São Paulo você mora?");
  q5.setChoices(choices(q5, ["Norte", "Sul", "Leste", "Oeste", "Centro"]));

  form.addTextItem().setTitle("6. Qual o nome do bairro onde você mora?");

  const q7 = form.addMultipleChoiceItem().setTitle("7. Religião");
  q7.setChoices(
    choices(q7, [
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
    ]),
  );

  const q8 = form
    .addMultipleChoiceItem()
    .setTitle("8. Qual é o seu estado civil?");
  q8.setChoices(
    choices(q8, [
      "Solteira",
      "Casada",
      "Divorciada",
      "Separada",
      "Viúva",
      "União estável",
      "NS/NR",
    ]),
  );

  // --- BLOCO 3: MATERNIDADE E FAMÍLIA ---
  form.addPageBreakItem().setTitle("Bloco 3: Maternidade e Família");
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

  const q11 = form
    .addMultipleChoiceItem()
    .setTitle("11. Você têm familiares com mais de 60 anos/idosos vivos?");
  q11.setChoices(choices(q11, ["Sim", "Não"]));

  const q12 = form
    .addMultipleChoiceItem()
    .setTitle("12. Quantos familiares idosos vivos você tem?");
  q12.setChoices(choices(q12, ["1", "2", "3", "4", "5", "6 ou mais", "NA"]));

  form
    .addCheckboxItem()
    .setTitle("13. Com quem você mora? (Múltipla seleção)")
    .setChoiceValues([
      "Sozinha",
      "Companheira/o",
      "Filhos/as",
      "Amigos/as",
      "Pais",
      "Outros familiares",
    ]);

  // --- BLOCO 4: ESTRUTURA DOMÉSTICA E RENDA ---
  form.addPageBreakItem().setTitle("Bloco 4: Estrutura Doméstica e Renda");
  const q14 = form
    .addMultipleChoiceItem()
    .setTitle("14. Você possui empregada e/ou diarista?");

  const s4_frequencia = form
    .addPageBreakItem()
    .setTitle("Bloco 4.1: Frequência de Serviço");

  const q15 = form
    .addMultipleChoiceItem()
    .setTitle("15. Com que frequência utiliza o serviço?");
  q15.setChoices(
    choices(q15, [
      "1x semanal",
      "2x por semana",
      "4x por semana",
      "5x por semana",
      "6x por semana",
      "7x por semana",
    ]),
  );

  const s4_identidade = form
    .addPageBreakItem()
    .setTitle("Bloco 4.2: Identidade e Bens");
  q14.setChoices([
    q14.createChoice("Sim", FormApp.PageNavigationType.CONTINUE),
    q14.createChoice("Não", s4_identidade),
  ]);

  const q16 = form
    .addMultipleChoiceItem()
    .setTitle("16. Como você se identifica em relação ao seu gênero?");
  q16.setChoices(
    choices(q16, [
      "Mulher Cisgênero",
      "Mulher Transgênero",
      "Não Binário",
      "Travesti",
    ]),
  );

  const q17 = form.addMultipleChoiceItem().setTitle("17. Orientação Sexual");
  q17.setChoices(
    choices(q17, [
      "Heterossexual",
      "Lésbica",
      "Bi-sexual",
      "Assexual",
      "Pansexual",
      "NS/NR",
    ]),
  );

  const q18 = form.addMultipleChoiceItem().setTitle("18. Cor ou raça");
  q18.setChoices(
    choices(q18, ["Branca", "Preta", "Parda", "Amarela", "Indígena"]),
  );

  form
    .addCheckboxItem()
    .setTitle("19. Quais desses itens sua casa possui?")
    .setChoiceValues([
      "Máquina de lavar roupas",
      "Aspirador de pó",
      "Tanquinho",
    ]);

  form
    .addTextItem()
    .setTitle("20. Rendimento bruto mensal (Valor)")
    .setHelpText("Considere todas as fontes de renda.");

  // --- BLOCO 5: EDUCAÇÃO E PERCEPÇÃO ---
  form.addPageBreakItem().setTitle("Bloco 5: Educação e Percepção do Tempo");

  const q21 = form
    .addMultipleChoiceItem()
    .setTitle("21. Qual o curso mais elevado que concluiu anteriormente?");
  q21.setChoices(
    choices(q21, [
      "Alfabetização",
      "Primário",
      "Ensino fundamental",
      "Ensino Médio",
      "Superior de graduação",
      "Especialização",
      "Mestrado",
      "Doutorado",
      "NS/NR",
    ]),
  );

  const q22 = form
    .addMultipleChoiceItem()
    .setTitle(
      "22. Atualmente você frequenta escola, faculdade ou curso técnico?",
    );
  q22.setChoices(
    choices(q22, [
      "Sim, presencial",
      "Sim, à distância",
      "Sim, híbrido",
      "Não",
    ]),
  );

  const q23 = form
    .addMultipleChoiceItem()
    .setTitle(
      "23. Deixou de estudar na última semana para realizar afazeres domésticos ou cuidar de alguém?",
    );
  q23.setChoices(choices(q23, ["Sim", "Não", "NA"]));

  const q24 = form
    .addMultipleChoiceItem()
    .setTitle("24. Como se sente em relação ao uso do seu tempo?");
  q24.setChoices(
    choices(q24, [
      "Muito Insatisfeita",
      "Insatisfeita",
      "Nem satisfeita nem insatisfeita",
      "Satisfeita",
      "Muito satisfeita",
    ]),
  );

  const q25 = form
    .addCheckboxItem()
    .setTitle(
      "25. A quais das seguintes áreas você dedica mais tempo? (Escolha até 3)",
    );
  q25.setChoiceValues([
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
  form.addPageBreakItem().setTitle("Bloco 6: Trabalho Remunerado");
  form
    .addCheckboxItem()
    .setTitle("26. Realizou trabalho remunerado na última semana?")
    .setChoiceValues([
      "Não",
      "Sim (CLT)",
      "Sim (PJ)",
      "Sim (Estágio)",
      "Sim (Autônoma)",
    ]);

  const q27 = form
    .addMultipleChoiceItem()
    .setTitle("27. Modalidade de trabalho");
  q27.setChoices(choices(q27, ["Presencial", "Home office", "Híbrido", "NA"]));

  const q28 = form
    .addMultipleChoiceItem()
    .setTitle(
      "28. Se não trabalhou, o motivo foi afazeres domésticos/cuidado?",
    );
  q28.setChoices(choices(q28, ["Sim", "Não", "NA"]));

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
  form
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
  form.addPageBreakItem().setTitle("Bloco 9: Lazer, Estudo e Religião");
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
    .setChoiceValues([
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
  form.addPageBreakItem().setTitle("Bloco 10: Percepção, Autonomia e Política");

  const q50 = form
    .addMultipleChoiceItem()
    .setTitle(
      "50. Considera que faz mais do que lhe corresponde nas tarefas da casa?",
    );
  q50.setChoices(choices(q50, ["Sim", "Não", "NS/NR"]));

  const q51 = form
    .addMultipleChoiceItem()
    .setTitle("51. O tempo foi suficiente para realizar tudo o que precisava?");
  q51.setChoices(choices(q51, ["Sim", "Não", "NS/NR"]));

  const q52 = form
    .addMultipleChoiceItem()
    .setTitle("52. Quem geralmente decide sobre grandes gastos no domicílio?");
  q52.setChoices(
    choices(q52, [
      "Somente você",
      "Você e parceiro(a)",
      "Somente parceiro(a)",
      "Outro homem da família",
      "Outra mulher da família",
    ]),
  );

  const q53 = form
    .addMultipleChoiceItem()
    .setTitle("53. Quem decide sobre se você pode trabalhar fora?");
  q53.setChoices(
    choices(q53, [
      "Somente você",
      "Você e parceiro(a)",
      "Somente parceiro(a)",
      "Outro homem",
      "Outra mulher",
    ]),
  );

  const q54 = form
    .addMultipleChoiceItem()
    .setTitle("54. Como se sente (novamente) em relação ao uso do seu tempo?");
  q54.setChoices(
    choices(q54, [
      "Muito Insatisfeita",
      "Insatisfeita",
      "Nem satisfeita",
      "Satisfeita",
      "Muito satisfeita",
    ]),
  );

  const q56 = form
    .addCheckboxItem()
    .setTitle(
      "56. Você considera que alguma área da sua vida está sendo negligenciada? (Até 3)",
    );
  q56.setChoiceValues([
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

  const q57 = form
    .addMultipleChoiceItem()
    .setTitle(
      "57. Em relação às suas preferências políticas, você se considera:",
    );
  q57.setChoices(
    choices(q57, [
      "Extrema esquerda",
      "Esquerda",
      "Centro",
      "Direita",
      "Extrema direita",
      "NS/NR",
    ]),
  );

  const itens = form.getItems();
  const totalItens = itens.length;

  form.moveItem(closeForm.getIndex(), totalItens - 1);
  form.moveItem(headerEncerramento.getIndex(), totalItens - 1);

  Logger.log("Formulário Gerado com Sucesso!");
  Logger.log("URL de Edição: " + form.getEditUrl());
}
