import bcrypt from 'bcrypt';

const users = [
	{
		username: 'Admin',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		username: 'kitty69420',
		email: 'kitty69420@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		username: 'mickesnipe',
		email: 'mick@example.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
