const router = require('express').Router();
const apiRoutes = require('./api');
const {
	Todo,
	User,
} = require('./../models');
// The purpose of this file is to prepend /api to every route
// declared in apiRoutes
// This will prepend /api to every route declared
// in apiRoutes
router.use('/api', apiRoutes);
// /
router.get('/', async (req, res) => {
	const usersToCreate = [
		{
			username: 'Black Mamba',
			email: 'kobe@bryant.com',
			password: 'password',
		},
		{
			username: 'Leeroy Jenkins',
			email: 'leeroy@wow.com',
			password: 'password',
		}
	];
	const users = await User.bulkCreate(usersToCreate, {
        individualHooks: true,
    });
	const todosToCreate = [
		{
			task: 'Become a different animal, but stay the same beast',
			authorId: users[0].id,
		},
		{
			task: 'Cause raid party to wipe within a few minutes',
			authorId: users[1].id,
		}
	];
	const todos = await Todo.bulkCreate(todosToCreate);
	res.json({
		users,
		todos,
	});
});
module.exports = router;









