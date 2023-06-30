export const getSender = (loggedInUser, users) => {
	if (users.length === 1) return users[0].name
	return users[0]._id === loggedInUser._id ? users[1].name : users[0].name
}
