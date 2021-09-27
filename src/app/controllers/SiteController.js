// Controller dùng để hiện thị trang home
const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

// quy tắc: viết hoa chữ cái đầu nếu nó là class hoặc contructor function
class SiteController {
    //phuong thuc [get], home
    index(req, res, next) {
        //we can find documents from the same collection -- mongoose

        // Course.find({}, function (err, courses) {
        //     if (!err) {
        //         res.json(courses);
        //     }else {
        //         res.status(400).json({ error: 'message' });
        //     }
        // }) //Viết kiểu callback

        // viết kiểu promise
        Course.find({}) // courses sẽ đưa vào home.hbs. cấu trúc của courses được lấy từ ../models/Course
                .then(courses => res.render('home', { 
                    courses: mutipleMongooseToObject(courses)
                }))// courses này sẽ đưa vào {{#each courses}} trong home.hbs để lặp ra phần tử
                // đọc hàm each (mục builtin-helpers) để xem cách làm
                // nó lấy phần tử ra qua this (this.name, this.description,...) this này là Course trong
                //module.exports = mongoose.model('Course', Course) --> Courses trong thư viện

            .catch(next) // tuong duong .catch(error => next(error))
        
        //Trong mongoose có 1 hàm tên là lean() , 
        //hàm này convert thành plain old JavaScript objects (POJOs). Thay thế cách dùng map và toObject() 
        //vi du
        //// GET /course/:id/edit
        // edit(req, res, next) {
        //     CourseModel.findById(req.params.id)
        //     .lean()
        //     .then((coursById) => {
        //         res.render('course/edit', { coursById })
        //     })
        //     .catch(next)
        // }


    }

    // [get], search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController(); // dùng từ khóa new để khởi tạo luôn NewsController
// nó sẽ tạo ra một đối tượng và exports ra ngoài
