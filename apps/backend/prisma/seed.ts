import { prisma } from "../src/modules/shared/database/prismaClient"

async function main() {
  console.log("🌱 Seeding database...")

  // 🔹 Criar Student
  const student = await prisma.student.upsert({
    where: { email: "luiz@email.com" },
    update: {},
    create: {
      id: "c641d56d-31cd-494c-995b-00602bdd1146",
      name: "Luiz Felipe Porfirio",
      email: "luiz@email.com",
      credits: 5,
    },
  })

  // 🔹 Criar Essays
  const essay1 = await prisma.essay.create({
    data: {
      theme: "Democracia e Participação Social",
      fileUrl: "https://example.com/redacao1.pdf",
      status: "CORRECTED",
      studentId: student.id,
    },
  })

  const essay2 = await prisma.essay.create({
    data: {
      theme: "Desafios da Educação no Brasil",
      fileUrl: "https://example.com/redacao2.pdf",
      status: "CORRECTED",
      studentId: student.id,
    },
  })

  const essay3 = await prisma.essay.create({
    data: {
      theme: "Impacto da Tecnologia na Sociedade",
      fileUrl: "https://example.com/redacao3.pdf",
      status: "IN_REVIEW",
      studentId: student.id,
    },
  })

  // 🔹 Correções reais (nota ENEM padrão 0–200 por competência)

  await prisma.correction.create({
    data: {
      essayId: essay1.id,
      c1: 160,
      c2: 140,
      c3: 120,
      c4: 160,
      c5: 180,
      total: 760,
      feedback: "Boa argumentação, mas repertório sociocultural pode melhorar.",
    },
  })

  await prisma.correction.create({
    data: {
      essayId: essay2.id,
      c1: 180,
      c2: 160,
      c3: 140,
      c4: 160,
      c5: 180,
      total: 820,
      feedback: "Estrutura bem consolidada, melhorar aprofundamento crítico.",
    },
  })

  // 🔹 Temas recomendados por competência
  await prisma.recommendedTheme.createMany({
    data: [
      { title: "Cidadania Digital e Fake News", focusCompetency: "C3" },
      { title: "Desinformação na Era Digital", focusCompetency: "C3" },
      { title: "Valorização da Diversidade Cultural", focusCompetency: "C2" },
      { title: "Mobilidade Urbana nas Grandes Cidades", focusCompetency: "C4" },
      { title: "Saúde Mental na Juventude", focusCompetency: "C1" },
      { title: "Inclusão Social e Tecnologia Assistiva", focusCompetency: "C5" },
    ],
  })

  console.log("✅ Seed finished successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })