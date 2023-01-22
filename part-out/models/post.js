module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    itemImg: {
      type: DataTypes.STRING,
      defaultValue: 'default.png'
    },
    price: {
      type: DataTypes.DOUBLE
    },
    carYear: {
      type: DataTypes.INTEGER
    },
    carMake: {
      type: DataTypes.STRING
    },
    carModel: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
  });

  Post.associate = function(models) {
    // We're saying that a Post should belong to a User
    // A Post can't be created without a User due to the foreign key constraint
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Post.hasMany(models.Comment, {
      onDelete: 'cascade'
    });
  };

  return Post;
};
