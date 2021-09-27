// cách sử dụng routes: truy cập vào https://expressjs.com/en/4x/api.html#router.use để xem
const express = require('express');
// var app = express() // ko cần vì đã định nghĩa rồi
const router = express.Router();

const siteController = require('../app/controllers/SiteController'); // Lôi handler function ra

router.get('/search', siteController.search); //thằng này đặt trên để nếu ko có nó thì nó lọt xuống thằng dưới
router.get('/', siteController.index);

module.exports = router;
