// quy tắc: viết hoa chữ cái đầu nếu nó là class hoặc contructor function
class NewsController {
    //phuong thuc [get], chọc vào path là news
    index(req, res) {
        res.render('news'); //trang new.hbs
    }

    // [get], news/:slug(id) chọc vào thằng con của news
    show(req, res) {
        res.send('NEWS DETAIL!!!');
    }
}

module.exports = new NewsController(); // dùng từ khóa new để khởi tạo luôn NewsController
// nó sẽ tạo ra một đối tượng và exports ra ngoài
