module.exports = (req, res, next) => {
    try { 
        req.body = JSON.parse(req.body) 
    } 
    catch (e) { 
        req.body = require('qs').parse(req.body.toString()) 
    }
    
    next();
}