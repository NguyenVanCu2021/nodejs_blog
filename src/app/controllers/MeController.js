// https://www.npmjs.com/package/mongoose-delete
// truy cập vào để hiểu hơn về các phương thức Method overridden
const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

// quy tắc: viết hoa chữ cái đầu nếu nó là class hoặc contructor function
class MeController {

    // [get], linlk http://localhost:3000/me/store/courses
    storeCourse(req, res, next) {
        let courseQuery = Course.find({})
        // trong mongoose có hộ trợ phương thức sort để sắp xếp
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
            //trong object đặt tên sai cú pháp thì đưa vào dấu []
        }

        //mục me trang store-course.hbs
        //Nếu ko hiểu xem lí thuyết Promise
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deleteCount]) => // [courses, deleteCount] : destructuring
                res.render('me/store-course', {
                    deleteCount, // deleteCount: deleteCount : Enhanced object literalls
                    courses: mutipleMongooseToObject(courses)
                })
            )

        // Phương thức tương đương Promise bên trên
        // Course.find({})
        //     .then(courses => res.render('me/store-course', {
        //         courses: mutipleMongooseToObject(courses)
        //     })) // courses này sẽ đưa vào {{#each courses}} trong store-course.hbs để lặp ra phần tử
        //     // đọc hàm each (mục builtin-helpers) để xem cách làm
        //     // nó lấy phần tử ra qua this (this.name, this.description,...) this này là Course trong
        //     //module.exports = mongoose.model('Course', Course) --> Courses trong thư viện

        //     .catch(next); // tuong duong .catch(error => next(error))
        
        // Course.countDocumentsWithDeleted()
        //     .then((deleteCount) => {

        //     })
        //     .catch(() => {});
    }

    // [get], linlk http://localhost:3000/me/trash/courses
    trashCourse(req, res, next) {
        //findDeleted sẽ return ra những course đã xóa
        Course.findDeleted({}) 
            .then(courses => res.render('me/trash-course', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}

module.exports = new MeController(); // dùng từ khóa new để khởi tạo luôn NewsController
// nó sẽ tạo ra một đối tượng và exports ra ngoài
