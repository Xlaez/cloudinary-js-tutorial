const multer = require('multer');
const path = require('path');

// List of file file extensions our application would accept
const fileExtensions = [
	'.jpeg',
	'.png',
	'.jpg',
	'.mp3',
	'.mp4',
	'.doc',
	'.docx',
	'.pdf',
	'.txt',
	'.wmv',
	'.mpeg',
	'.mkv',
];

const storage = multer.diskStorage({});

const fileFilter = function (req, file, callback) {
	const fileExtCheck = fileExtensions.includes(
		path.extname(file.originalname).toLowerCase()
	);

	// checks if file is valid and it's file extension is in our accepted list.
	if (!fileExtCheck && file.originalname !== 'blob') {
		callback(new Error('file not accepted'), false);
	} else {
		callback(null, true);
	}
};

// used for upload of a single file by the field name "upload"
const singleUpload = multer({
	storage,
	fileFilter,
}).single('upload');

// used to upload multiple files with a maximum of 10 using the field name "uploads"
const multipleUpload = multer({
	storage,
	fileFilter,
}).array('uploads', 10);

module.exports = {
	singleUpload,
	multipleUpload,
};
