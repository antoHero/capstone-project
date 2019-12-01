const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dilld3u7b',
    api_key: '596382934926219',
    api_secret: '5wKv_a5djbmP8FwBk6vcyTtiSdg'
});

exports.uploads = (file) => {
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({url: result.url, id: result.public_id})
        },
        {resource_type: "auto"}
        )
    })
}