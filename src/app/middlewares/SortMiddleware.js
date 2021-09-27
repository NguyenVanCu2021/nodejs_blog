// https://expressjs.com/en/4x/api.html#res.locals để biết thêm về biến locals
//biến res.locals chỉ tồn tại trong 1 yêu cầu. ví dụ khi refress lại trang lần 1 nó có nhưng lần 2
// thì ko (chỉ tồn tại trong 1 yêu cầu). biến locals này chỉ có trong views (có thể sang .hbs để thử)


module.exports = function SortMiddleware(req, res, next) { // expression function nên ko cần đặt tên cho func tuy
    // để dễ hiểu cũng nên có tên. Nên lấy tên là chính nó để dễ hình dung
    res.locals._sort = { // tạo một biến locals 
        enabled: false,
        type: 'default'
    };

    // trong mongoose có hộ trợ phương thức sort để sắp xếp
    // dùng hasOwnProperty để tránh nó duyệt qua prototype
    if (req.query.hasOwnProperty('_sort')) {
        // res.locals._sort.enabled = true;
        // res.locals._sort.type = req.query.type;
        // res.locals._sort.column = req.query.name;

        // nếu thấy cách định nghĩa biến trên dài thì có thể định nghĩa như dưới đây
        Object.assign(res.locals._sort, {
            enabled: true,
            type: req.query.type,
            column: req.query.column,
        });
    };
    next();
}