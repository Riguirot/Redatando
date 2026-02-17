import { CompetenceContent, CompetenceId } from "./competence.types"


export const competences: Record<CompetenceId, CompetenceContent> = {
  C1: {
    id: "C1",
    title: "Domínio da norma culta",
    description: "...",
    evaluatorFocus: [],
    commonMistakes: [],
    example: "",
    checklist: [],
    videoUrl: ""
  },

  C2: {
    id: "C2",
    title: "Compreensão do tema",
    description: "",
    evaluatorFocus: [],
    commonMistakes: [],
    example: "",
    checklist: [],
    videoUrl: ""
  },

  C3: {
    id: "C3",
    title: "Argumentação e organização de ideias",
    description:
      "Avalia a capacidade de selecionar, organizar e desenvolver argumentos de forma consistente, articulando ideias de maneira lógica e relacionada ao tema proposto.",
    evaluatorFocus: [
      "Apresentação clara de tese.",
      "Argumentos consistentes e bem desenvolvidos.",
      "Progressão lógica entre os parágrafos.",
      "Uso pertinente de repertório sociocultural.",
      "Coerência entre tese e desenvolvimento."
    ],
    commonMistakes: [
      "Argumentos genéricos que não aprofundam a discussão.",
      "Repertório usado apenas como citação decorativa.",
      "Parágrafos que repetem a mesma ideia com palavras diferentes.",
      "Desenvolvimento superficial sem explicação ou exemplificação.",
      "Desconexão entre o argumento e o recorte do tema."
    ],
    example: `Tema: Desafios da valorização da ciência no Brasil.

Tese: A desvalorização da ciência no Brasil está ligada à falta de investimentos públicos e à disseminação de desinformação.

Primeiramente, a insuficiência de investimentos governamentais compromete o avanço científico nacional...`,
    checklist: [
      "Minha tese está clara e responde ao tema proposto?",
      "Cada parágrafo desenvolve uma ideia diferente?",
      "Expliquei o argumento ou apenas afirmei?",
      "Usei repertório de forma pertinente e integrada ao argumento?",
      "Retomei a tese ao final do desenvolvimento?"
    ],
    videoUrl: "https://youtube.com/link-da-aula-c3"
  },

  C4: {
    id: "C4",
    title: "Coesão",
    description: "",
    evaluatorFocus: [],
    commonMistakes: [],
    example: "",
    checklist: [],
    videoUrl: ""
  },

  C5: {
    id: "C5",
    title: "Proposta de intervenção",
    description: "",
    evaluatorFocus: [],
    commonMistakes: [],
    example: "",
    checklist: [],
    videoUrl: ""
  }
}
