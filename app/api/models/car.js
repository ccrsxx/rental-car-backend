import { Model } from 'sequelize';

/**
 * @typedef CarAttributes
 * @property {string} id
 * @property {string} name
 * @property {CarTypes} type
 * @property {string} image
 * @property {number} capacity
 * @property {number} rentPerDay
 * @property {string} description
 * @property {Date} availableAt
 * @property {Date} createdAt
 * @property {string | null} createdBy
 * @property {string | null} updatedBy
 * @property {string | null} deletedBy
 * @property {Date | null} deletedAt
 * @property {Date} updatedAt
 */

export const carTypes = /** @type {const} */ (['small', 'medium', 'large']);

/** @typedef {(typeof carTypes)[number]} CarTypes */

export const Models = {};

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */
export default (sequelize, DataTypes) => {
  /** @extends {Model<CarAttributes>} */
  class Car extends Model {
    /**
     * Helper method for defining associations. This method is not a part of
     * Sequelize lifecycle. The `models/index` file will call this method
     * automatically.
     *
     * @param {Record<'User', any>} models
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'createdByUser'
      });

      this.belongsTo(models.User, {
        foreignKey: 'updatedBy',
        as: 'updatedByUser'
      });

      this.belongsTo(models.User, {
        foreignKey: 'deletedBy',
        as: 'deletedByUser'
      });
    }
  }

  Car.init(
    // @ts-ignore
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'Name must be at least 3 characters'
          }
        }
      },
      type: {
        type: DataTypes.ENUM(...carTypes),
        allowNull: false,
        validate: {
          isIn: {
            args: [carTypes],
            msg: `Type must be one of ${carTypes.join(', ')}`
          }
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: 'Image is not valid'
          }
        }
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Capacity must be an integer'
          }
        }
      },
      rentPerDay: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            msg: 'Rent per day must be a float'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [3, 255],
            msg: 'Description must be at least 3 characters'
          }
        }
      },
      availableAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: {
            args: true,
            msg: 'Available at must be a date'
          }
        }
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      deletedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'Users',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      modelName: 'Car',
      paranoid: true
    }
  );

  return Car;
};
