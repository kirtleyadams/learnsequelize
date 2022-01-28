const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../../models/User');
// Create user   /api/users
router.post('/', async (req, res) => {
	const {
		username,
		email,
		password,
		numberOfPets,
	} = req.body;
	if (!username || !email || !password) {
		return res.status(400).json({ error: 'You must provider username, password, and email'});
	}
	// PaSsWoRd
	try {
		const newUser = await User.create({
			username,
			email,
			password,
			numberOfPets,
		});
		res.json(newUser);
	} catch (e) {
		console.log(e);
		res.json(e);
	}
});
// Get all users
router.get('/', async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (e) {
		console.log(e);
		res.json(e);
	}
});
// endpoint is a GET request to get a user by their primary key
router.get('/:userId', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.userId);
		res.json(user);
	} catch (e) {
		res.json(e);
	}
});
router.patch('/:userId', async (req, res) => {
	const {
		username,
		email,
		password,
	} = req.body;
	try {
		await User.update(
			{
				username,
				email,
				password,
			},
			{
				where: {
					id: req.params.userId,
				},
				individualHooks: true,
			}
		);
		const user = await User.findByPk(req.params.userId);
		res.json(user);
	} catch (e) {
		res.json(e);
	}
});
router.delete('/:userId', async (req, res) => {
	try {
		const deletedUser = await User.findByPk(req.params.userId);
		await User.destroy({
			where: {
				id: req.params.userId,
			}
		});
		res.json(deletedUser);
	} catch (e) {
		res.json(e);
	}
});
// For logging in a user to our app
router.post('/login', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(401).json({ error: 'You must provide a valid email and password'});
	}
	try {
		//	find the user with the given email
		const user = await User.findOne({
			where: {
				email,
			}
		});
		//	check if the user actually exists with that given email
		if (!user) {
//	if no user exists, give them a 400
			return res.status(400).json({ error: 'No user with that email'});
		}
//	take the users hashed password and compare it with the password that they're passing in from the form
		const isMatchingPassword = await bcrypt.compare(password, user.password)
		if (!isMatchingPassword) {
			return res.status(401).json({ error: 'Invalid password'});
		}
		res.json({ message: 'You are now logged in successfully'});
	} catch (e) {
		res.json(e);
	}
});
// router for getting a user by their id and checking if they have a pet or not
//  localhost:3001/api/users/hasPets/:idWildcard
router.get('/hasPets/:userId', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found'});
		}

		const doesHavePets = user.hasPets();

		if (!doesHavePets) {
			return res.status(400).json({ message: 'User has no pets'});
		}
		res.json({ message: 'User does have pets'});
	} catch (e) {
		res.json(e);
	}
});
/*
* 1.
* 2.  endpoint is a PATCH request to update a user by their primary key, this should respond back with the updated user data
* 3.  endpoint is a DELETE request to delete a user by their primary key, this should respond back with the deleted user data
* */
module.exports = router;