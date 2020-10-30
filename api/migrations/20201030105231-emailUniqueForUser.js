'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Promise.all([
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        unique: true
    }),
  ]);
},

  down: async (queryInterface, Sequelize) => {
    await Promise.all([queryInterface.changeColumn('Users', 'email')]);
  },
};

// Cette migration permet d'ajouter une règle d'email unique 
// pour un utilisateur. Afin de ne pas avoir plusieurs mêmes emails.
