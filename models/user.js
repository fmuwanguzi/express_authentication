'use strict';
const bcrypt = require('bcrypt'); //making a hash password for the user
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len:{
          args:[1,99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'invalid e-mail'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [12,99],
        msg: 'password must be between 12 and 99 characters'
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};

user.addHook('beforeCreate', function(pendingUser){
  //bcrypt hash a password for us
  let hash = bcrypt.hashSync(pendingUser.password, 12);

  // set password to equal the hash
  pendingUser.password = hush;
  });

  user.prototype.validPassword = function(passordTyped){
    let correctPassword = bcrypt.compareSync(passwordTyped, this.password);

//return true or false based on correct password or not
    return correctPassword;
  }

  //remove the password before it gets serialized
  user.prototype.toJSon = function(){
    let userData = this.get();
    delete userData.paswword;
    return userData;
  }