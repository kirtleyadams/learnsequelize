const { UUIDV4, Model, DataTypes } = require('sequelize');
const sequelize = require('../config');
class Todo extends Model {}
Todo.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: UUIDV4,
			primaryKey: true,
		},
		task: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		completed: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	//	This column will store a reference of the 'id' of the 'user' that this Todo belongs to
		authorId: {
			type: DataTypes.UUID,
		//	this will create the connection between Todo and User
			references: {
				model: 'User',
			//	specify to sequelize which column in the User table does this data refer to
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		modelName: 'Todo',
	}
);
module.exports = Todo;