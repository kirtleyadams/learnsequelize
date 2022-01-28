const router = require('express').Router();
const {
	Todo,
	User,
} = require('../../../models');
// /api/todos prepended to every route in here
router.get('/', async (req, res) => {
	try {
		const todos = await Todo.findAll({
		//	will perform a join with the User table
			include: [{ model: User }],
		});
		res.json(todos);
	} catch (e) {
		res.json(e);
	}
});
module.exports = router;