/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, _Sequelize) => {
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
      password: '$2b$10$OIg4QDx2EE7umCUmnKeCOewwr8E7WihQa4kDYegM2aN7v5g88Ao9C'
    };

    /** @type {BasicUser} */
    const adminUser = {
      name: 'Rem',
      role: 'admin',
      email: 'rem@rezero.com',
      image: 'rem.png',
      username: 'rem',
      password: '$2b$10$BraSULLY74yM7PswG4MY5elTjpO.TOO.xTS5V.G.SqJdMcTI9gCsa'
    };

    /** @type {BasicUser} */
    const superAdminUser = {
      name: 'Emilia',
      role: 'superadmin',
      email: 'emilia@rezero.com',
      image: 'emilia.png',
      username: 'emilia',
      password: '$2b$10$JERVFQKdaqSd7As6QG3/KeY.EsZYd4oQTD78rESvt6jzYtjzA7tSK'
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
  down: (queryInterface, _Sequelize) => {
    // @ts-ignore
    return queryInterface.bulkDelete('Users', null, {});
  }
};
