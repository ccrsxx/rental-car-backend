/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('Cars', 'deletedAt', {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }),
      queryInterface.addColumn('Cars', 'createdBy', {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      }),
      queryInterface.addColumn('Cars', 'updatedBy', {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'Users',
          key: 'id'
        }
      }),
      queryInterface.addColumn('Cars', 'deletedBy', {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'Users',
          key: 'id'
        }
      })
    ]);
  },
  async down(queryInterface, _Sequelize) {
    await Promise.all([
      queryInterface.removeColumn('Cars', 'createdBy'),
      queryInterface.removeColumn('Cars', 'deletedAt'),
      queryInterface.removeColumn('Cars', 'updatedBy'),
      queryInterface.removeColumn('Cars', 'deletedBy')
    ]);
  }
};
