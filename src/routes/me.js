// cách sử dụng routes: truy cập vào https://expressjs.com/en/4x/api.html#router.use để xem
const express = require('express');
// var app = express() // ko cần vì đã định nghĩa rồi
const router = express.Router();

const meController = require('../app/controllers/MeController'); // Lôi handler function ra

router.get('/store/courses', meController.storeCourse); //thằng này đặt trên để nếu ko có nó thì nó lọt xuống thằng dưới
router.get('/trash/courses', meController.trashCourse); //thằng này đặt trên để nếu ko có nó thì nó lọt xuống thằng dưới

module.exports = router;
