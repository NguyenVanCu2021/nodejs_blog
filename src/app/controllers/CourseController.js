// Controller này dùng để handler các chức năng của khóa học
const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');

// quy tắc: viết hoa chữ cái đầu nếu nó là class hoặc contructor function
class CourseController {

    // [get], /course/slug: --> render ra các slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
        .then(course => {
            res.render('courses/show', {course: mongooseToObject(course)});
            //mục courses trang show.hbs
        })
        .catch(next);
    }

    // [get], /course/create
    create(req, res, next) {
        res.render('courses/create');
    //mục courses trang create.hbs
    }

    // [post], /course/store
    store(req, res, next) {
        //Tạo địa chỉ của image theo videoId. (ví dụ)
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        
        const course = new Course(req.body);
        course
            .save() // dùng save() để lưu data vào CSDL
            .then(() =>res.redirect('/me/store/courses')) // redirect('/') sau khi thêm nó sẽ trả về trang này
                                        // nếu ở đây chọn ('/') --> trang chủ
            .catch(next);
    }

    // [get], /course/:id/edit
    //mục courses trang edit.hbs
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
   }

    // https://mongoosejs.com/docs/models.html#updating
    // có nhiều cách để update lại dữ liệu ở đây dùng updateOne
    // [put], /course/:id
    update(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/store/courses'))
            .catch(next);
   }

    // [delete], /course/:id
   destroy(req, res, next) {
    // deleteOne sẽ xóa thật --> xóa luôn trong cơ sở dữ liệu
    //    Course.deleteOne({ _id: req.params.id })
    //     .then(() => res.redirect('back'))
    //     .catch(next);

    //https://www.npmjs.com/package/mongoose-delete
    // dùng delete để soft delete
       Course.delete({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);        
   }

   // [delete], /course/:id/force
   forceDestroy(req, res, next) {
    //deleteOne sẽ xóa thật --> xóa luôn trong cơ sở dữ liệu
       Course.deleteOne({ _id: req.params.id })
        .then(() => res.redirect('back'))
        .catch(next);
   }

   // [patch], /course/:id/restore
   restore(req, res, next) {
       //https://www.npmjs.com/package/mongoose-delete
        // dùng restore để khôi phục 
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
   }

   // [post], /courses/handle-form-action
   handleFormAction(req, res, next) {
        //res.json(req.body);
        switch (req.body.action) {
            case 'delete':
                    //https://www.npmjs.com/package/mongoose-delete
                    // dùng delete để soft delete
                    // dữ liệu trả về ở đây là 1 array trong name="courseIds[]" do đó ko thể lấy ra một cách thônng thường đc
                    // trong mongoDB có thể dùng toán tử $in để lấy các phần tử trong mảng ra
                    // https://docs.mongodb.com/manual/reference/operator/query/in/
                    Course.delete({ _id: { $in: req.body.courseIds } })
                        .then(() => res.redirect('back'))
                        .catch(next);
                break;
            default:
                res.json({ message: 'action is invalid!' })
        }
   }

   // [post], /courses/select-custom
   selectCustom(req, res, next) {
       //res.json(req.body);
       switch (req.body.action) {
           case 'detroy':
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                .then(() => res.redirect('back'))
                .catch(next);
            break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                .then(() => res.redirect('back'))
                .catch(next);
            break;
            default:
                res.json({ message: 'action is invalid!' })
       }
   }
}

module.exports = new CourseController(); // dùng từ khóa new để khởi tạo luôn NewsController
// nó sẽ tạo ra một đối tượng và exports ra ngoài
