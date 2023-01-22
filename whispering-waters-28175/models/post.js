module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      itemImg: {
        type: DataTypes.STRING,
        defaultValue: "default.png"
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      carYear: {
        type: DataTypes.NUMBER,
        allowNull: false
      },
      carMake: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carModel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    Post.associate = function(models) {
      // We're saying that a Post should belong to a User
      // A Post can't be created without a User due to the foreign key constraint
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Post;
  };
  