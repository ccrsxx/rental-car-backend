/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { faker } = await import('@faker-js/faker');
    const authService = await import('../../api/services/auth.js');

    // @ts-ignore
    /** @typedef {import('../../api/models/user.js').UserAttributes} UserAttributes */
    /** @typedef {Omit<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>} BasicUser */

    /** @type {BasicUser} */
    const memberUser = {
      name: 'Subaru',
      role: 'member',
      email: 'subaru@rezero.com',
      image: 'subaru.png',
      username: 'subaru',
      password: 'subaru'
    };

    /** @type {BasicUser} */
    const adminUser = {
      name: 'Rem',
      role: 'admin',
      email: 'rem@rezero.com',
      image: 'rem.png',
      username: 'rem',
      password: 'rem'
    };

    /** @type {BasicUser} */
    const superAdminUser = {
      name: 'Emilia',
      role: 'superadmin',
      email: 'emilia@rezero.com',
      image: 'emilia.png',
      username: 'emilia',
      password: 'emilia'
    };

    /** @type {Omit<UserAttributes, 'id'>[]} */
    const placeholderUsers = await Promise.all(
      [memberUser, adminUser, superAdminUser].map(async (user) => ({
        ...user,
        password: await authService.hashPassword(user.password),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent()
      }))
    );

    return queryInterface.bulkInsert('Users', placeholderUsers);
  },
  down: (queryInterface, Sequelize) => {
    // @ts-ignore
    return queryInterface.bulkDelete('Users', null, {});
  }
};
