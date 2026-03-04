/// <reference types="node" />

import { prisma } from "../src/modules/shared/database/prismaClient"

async function main() {
  console.log("🌱 Seeding database...")

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

  // datas

  const dates = [

    "2026-03-02",

    // cluster 3
    "2026-03-05",
    "2026-03-05",
    "2026-03-05",

    "2026-03-08",

    // cluster 5
    "2026-03-11",
    "2026-03-11",
    "2026-03-11",
    "2026-03-11",
    "2026-03-11",

    "2026-03-13",
    "2026-03-16",
    "2026-03-18",
    "2026-03-23",
    "2026-03-26",
    "2026-03-29",
  ]

  // notas (cluster com mesma nota)

  const scores = [

    760,

    // 05
    800,
    800,
    800,

    // 08
    790,

    // 11
    820,
    820,
    820,
    820,
    820,

    // restantes
    830,
    845,
    860,
    870,
    880,
    900,
  ]

  for (let i = 0; i < dates.length; i++) {

    const essay = await prisma.essay.create({
      data: {
        theme: `Tema teste ${i + 1}`,
        fileUrl: `https://example.com/redacao${i + 1}.pdf`,
        status: "CORRECTED",
        studentId: student.id,
        createdAt: new Date(dates[i]),
      },
    })

    await prisma.correction.create({
      data: {
        essayId: essay.id,
        c1: 160,
        c2: 160,
        c3: 150,
        c4: 160,
        c5: 170,
        total: scores[i],
        feedback: "Correção simulada para testes do dashboard.",
        createdAt: new Date(dates[i]),
      },
    })

  }

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