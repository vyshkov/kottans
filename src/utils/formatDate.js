const formatDate = date => {
	const dateObj = new Date(date);
	return `${dateObj.getDate()}.${dateObj.getMonth()+1}.${dateObj.getFullYear()}`;
};

export default formatDate;
