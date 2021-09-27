// cách sử dụng routes: truy cập vào https://expressjs.com/en/4x/api.html#router.use để xem
const express = require('express');
// var app = express() // ko cần vì đã định nghĩa rồi
const router = express.Router();

const courseController = require('../app/controllers/CourseController'); // Lôi handler function ra

router.get('/create', courseController.create);//tới trang tạo mới
router.post('/store', courseController.store);// tạo dữ liệu
router.get('/:id/edit', courseController.edit);// tới trang edit
router.post('/handle-form-action', courseController.handleFormAction) //thêm, sửa xóa theo checkbox. Chú ý
// là nó phải nằm trên mấy thằng /:id nếu ko nó sẽ hiểu là id và ko match và hàm.
router.post('/select-custom', courseController.selectCustom)// Xóa vĩnh viễn, restore
router.put('/:id', courseController.update);//update lại nguyên 1 document (sửa khóa học)
router.patch('/:id/restore', courseController.restore);//chỉnh 1 filder trong document (restore khóa học)
router.delete('/:id', courseController.destroy);// đưa vào thùng rác 
router.delete('/:id/force', courseController.forceDestroy);// xóa vĩnh viễn
router.get('/:slug', courseController.show); 

module.exports = router;
