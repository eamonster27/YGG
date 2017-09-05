'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,30],
          msg: "Must be between 2 and 30 characters."
        },
        isAlpha: {
          args: true,
          msg: "Letters only, please."
        },
        notNull:  {
          args: true,
          msg: "You have a first name."
        },
        notEmpty: {
          args: true,
          msg: 'You have a first name.'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [2,30],
          msg: "Must be between 2 and 30 characters."
        },
        isAlpha: {
          args: true,
          msg: "Letters only, please."
        },
        notNull:  {
          args: true,
          msg: "You have a last name."
        },
        notEmpty: {
          msg: 'You have a last name.'
        }
      }
    },
    email: { //MAKE UNIQUE
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email address"
        },
        notNull: {
          args: true,
          msg: "You should have an email address."
        },
        notEmpty: {
          args: true,
          msg: 'You should have an email address.'
        }
      }
    },
    cell: { //MAKE UNIQUE
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10,10],
          msg: "Must be 10 digits."
        },
        is: {
          args: /^[0-9]+$/i,
          msg: "Digits only, please."
        },
        notNull:  {
          args: true,
          msg: "Let me get that number."
        },
        notEmpty: {
          args: true,
          msg: 'Let me get that number.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,25],
          msg: "Must be between 8 and 25 characters."
        },
        isAlphanumeric: {
          args: true,
          msg: "Alphanumeric only, please."
        },
        notNull:  {
          args: true,
          msg: "Dont forget that password."
        },
        notEmpty: {
          args: true,
          msg: 'Dont forget that password.'
        }
      }
    },
    passcode: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4,4],
          msg: "Must be 4 digits."
        },
        is: {
          args: /^[0-9]+$/i,
          msg: "Digits only, please."
        },
        notNull:  {
          args: true,
          msg: "Enter that passcode, yo."
        },
        notEmpty: {
          args: true,
          msg: 'Enter that passcode, yo.'
        }
      }
    },
    paniccode: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4,4],
          msg: "Must be 4 digits."
        },
        is: {
          args: /^[0-9]+$/i,
          msg: "Digits only, please."
        },
        notNull:  {
          args: true,
          msg: "Enter that panic code, yo."
        },
        notEmpty: {
          args: true,
          msg: 'Enter that panic code, yo.'
        },
        notPasscode(value) {
          if (value === this.passcode) {
            throw new Error('Cannot be the same as your passcode!')
          }
        }
      }
    }
  }, {})

  User.associate = function(models) {
    User.hasMany(models.Checkin, {foreignKey: 'UserID', as: 'Checkins'});
    User.hasMany(models.Checkup, {foreignKey: 'UserID', as: 'Checkups'});
  };

  return User;
};
