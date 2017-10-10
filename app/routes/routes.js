const router = require('express').Router();
const path = require('path');

module.exports = router;

router.post('/', function(req, res, next){
    // console.log('hello world!');
    res.status(200).json(req.body);
});

router.get('/', function(req, res) {
    res.sendFile('public/index.html', {
        root: path.join(__dirname, '../..')
    });
})