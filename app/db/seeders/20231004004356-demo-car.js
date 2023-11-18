/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const { generateRandomCar } = await import('../../libs/seed.js');

    return queryInterface.bulkInsert('Cars', await generateRandomCar());
  },
  down: (queryInterface, _Sequelize) => {
    // @ts-ignore
    return queryInterface.bulkDelete('Cars', null, {});
  }
};
