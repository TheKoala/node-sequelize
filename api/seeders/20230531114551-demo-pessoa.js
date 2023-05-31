"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          nome: "Felipe Lima",
          ativo: true,
          email: "felipe.lima@email.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Job Costa",
          ativo: true,
          email: "job.costa@email.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Daivid Jorge",
          ativo: true,
          email: "daivid.jorge@email.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Richardson Bruno",
          ativo: true,
          email: "richardson.bruno@email.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Ana Souza",
          ativo: true,
          email: "ana@ana.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Marcos Cintra",
          ativo: true,
          email: "marcos@marcos.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Felipe Cardoso",
          ativo: true,
          email: "felipe@felipe.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Sandra Gomes",
          ativo: false,
          email: "sandra@sandra.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Paula Morais",
          ativo: true,
          email: "paula@paula.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Sergio Lopes",
          ativo: true,
          email: "sergio@sergio.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pessoas", null, {});
  },
};
