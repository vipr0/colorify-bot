const isImageMimetype = (mimetype) => {
    return /^image/.test(mimetype)
}

module.exports = isImageMimetype