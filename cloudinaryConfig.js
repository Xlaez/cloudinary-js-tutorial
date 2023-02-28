const cloud = require('cloudinary');
const path = require('path');

require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

// configues the cloudinary sdk
cloud.v2.config({
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
	// this is the cloud name you gave in your clooudinary.
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

// this would use the uploader function from cloudinary to upload the file
const uploadSingle = async (filePath) => {
	console.log(filePath);
	const { secure_url, public_id } = await cloud.v2.uploader.upload(filePath);
	console.log(secure_url, public_id);
	return { url: secure_url, publicId: public_id };
};

// by passing the file's cloudinary url we will delete it
const deleteSingle = async (fileUrl) => {
	return await cloud.v2.uploader.destroy(fileUrl);
};

// uploading many files using the upload single function we created
const uploadMany = async (filePaths) => {
	const result = Promise.all(filePaths.map((path) => uploadSingle(path)));
	if (!result) throw new Error('cannot upload multiple files');
	return result;
};

// delete many files using their url by pasing them to the delete_resources function provided by the cloudinary package.
const deleteMany = async (fileUrls) => {
	return await cloud.v2.api.delete_resources(fileUrls);
};

module.exports = {
	uploadSingle,
	uploadMany,
	deleteSingle,
	deleteMany,
};
