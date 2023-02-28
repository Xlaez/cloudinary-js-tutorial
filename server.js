const express = require('express');
const { singleUpload } = require('./multerConfig');
const { uploadSingle } = require('./cloudinaryConfig');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// singleUpload is passed as a middleware to express.
server.post('/v1', singleUpload, async (req, res) => {
	const { file } = req;
	if (!file) return res.status(400).send('Please add a file to your request');

	// we pass the file's path to the fuction
	const { publicId, url } = await uploadSingle(file.path);
	console.log(publicId, url);
	res.status(200).json({ url, publicId });
});

const port = 5000;
// Our seerver would run on port 5000
server.listen(process.env.PORT || port, () => {
	console.info(`Server is running on port ${port}`);
});
