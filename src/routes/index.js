// file này quản lí tất cả các routes
const newRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');

function route(app) {
    // định nghĩa tuyến đường (path) khi tuyến đường đúng thì nó thực thi function (handler)
    // funtion sẽ trả về req (request)  và res (response)
    // req chứa thông tin phía client yêu cầu lên server
    // res dùng để tùy chỉnh kết quả trả về
    app.use('/news', newRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);

    app.use('/', siteRouter); // thằng /(ko địa chỉ --> trang home) này luôn đặt cuối 
}

module.exports = route;
