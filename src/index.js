// khai báo
// để sử dụng các thư viện thì cần đặt ra một biến sau đó dùng require đường dẫn đến thư viện
const path = require('path');
const express = require('express'); // gọi thư viện ExpressJS
const morgan = require('morgan'); // thư viện morgan quan sát các request từ client lên server

//https://expressjs.com/en/resources/middleware.html
//http://expressjs.com/en/resources/middleware/method-override.html npm install method-override
//html chỉ có 2 phương thức là GET(mặc định) và POST khi cài method-override nó giúp sử dụng phương thức
// PUT và DELETE
const methodOverride = require('method-override')

//thư viện handlebars express (tạo html đơn giản hơn)
// nó được tạo nên dựa trên handlebarsjs
const handlebars = require('express-handlebars');

// thêm middleware sort (sắp xếp)
const SortMiddleware = require('./app/middlewares/SortMiddleware')

const route = require('./routes'); // ko can them index vì mặc định nó sẽ tự động load file index
const db = require('./config/db'); // gọi mongoose

// connect to DB --> kết nối tới CSDL
db.connect();

const app = express(); // app is a function of express
const port = 3000;

/////////////////////////////////////////////////////////////////////////////////
// middleware thư viện

// cách Xử lí static file
// http://localhost:3000/img/logo.jpg nếu muốn truy cập vào logo.jpg
app.use(express.static(path.join(__dirname, 'public'))); // middleware dùng xác định file tĩnh

// methodOverride có 2 cách sử dụng: 1 là qua header(header của http protocol). 2 là qua query value
// ở đây dùng qua query value. ở sau phải có ?_method=DELETE(hoặc PUT)
// ví dụ <form class="mt-4" method="POST" action="/courses/{{course._id}}?_method=PUT">
// mình vẫn chỉ submit ở POST nhưng nhờ methodOverride nó có thể điều hướng sang PUT
app.use(methodOverride('_method'))

// Middleware - từ express ver 4.16 trở đi đã tích hợp body-parse nên ko cần cài chỉ lấy ra dùng thôi
app.use(
    express.urlencoded({ // Middleware dùng để bắt dữ liệu submit từ form lên
        extended: true,
    }),
    // bản thân biến req trong function handdler đã chứa dữ liệu từ submit form rồi tuy nhiên nó là dữ liệu chưa
    // được cấu trúc lại express.urlencoded sẽ cấu trúc lại dữ liệu và lưu vào object là body
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

/////////////////////////////////////////////////////////////////////////////
// middleware tự tạo

app.use(SortMiddleware);

// Template engine --> ko thực hiện được phép toán trong handlebars chỉ thực hiện đc ở đây thông qua helpers
//https://www.npmjs.com/package/express-handlebars
app.engine( // chữ engine (tự đặt)
    'hbs',
    handlebars({
        extname: '.hbs', // đổi đuôi handlebars thành hbs cho ngắn (hbs: tự đặt)
        helpers: {
            sum: (a, b) => a + b, //{{sum @index 1}} a= @index, b= 1
            //Ex: {{{sortable 'name' _sort}}} => field = 'name', sort = _sort
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending'
                };
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc'
                };
                
                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                            <span class="${icon}"></span>
                        </a>`
            }//https://handlebarsjs.com/guide/#block-helpers xem HTML Escaping để hiểu 
            // nói chung {{{}}} hiện thị ra đúng thẻ code. {{}} các kí tự liên quan để các thẻ (> < & ...) 
            //nó sẽ mã hóa để bảo vệ dữ liệu. 
            // chú ý đến vấn đề bảo mật nếu dùng {{{}}}
        }
    }),
);
app.set('view engine', 'hbs');
// .
// └── server
//     ├── server.js
//     └── views
//         ├── home.handlebars
//         └── layouts
//             └── main.handlebars
app.set('views', path.join(__dirname, 'resources', 'views')); // đổi lại địa chỉ mặc định

// Home, search, contact, hoặc những file đơn (ko có slug) thì thay vì riêng từng file kiểu như
// HomeController, ContactController thì chỉ cần tạo một file site.js

//Routes init
route(app);

app.listen(port, () => {
    // lắng nghe cổng có port là 3000 (localhost: 127.0.0.1)
    console.log(`App listening at http://localhost:${port}`);
});

// Các phương thức:
// GET: gửi yêu cầu lên server, yêu cầu server trả dữ liệu lại cho client
// POST: gửi yêu cầu lên server, yêu cầu server tạo mới 1 dữ liệu
// PUT: Chỉnh sửa dữ liệu (theo kiểu replace hẳn cả 1 document)
// PATCH: Chỉnh sửa dữ liệu (theo kiểu chỉnh sửa từng field trong 1 document)
// DELETE: 
// OPTIONS: 
// HEAD:  

// hướng dẫn

// https://expressjs.com/en/guide/writing-middleware.html để hiểu về middleware
// các middleware chỉ áp dụng trong phạm vi Path(route) của nó
// nếu muốn 1 middleware toàn cục thì thêm function middleware đó vào app.use()
// https://handlebarsjs.com/guide/ truy cập vào để hiểu hơn về handlebars
// https://www.npmjs.com/package/express-handlebars Template engine handlebars

// https://mongoosejs.com/ truy cập vào để hiểu hơn mongoose
// https://www.npmjs.com/package/mongoose-delete truy cập vào để hiểu hơn Method overridden, soft delete
// https://mongoosejs.com/docs/models.html#updating truy cập vào để hiểu hơn update lại dữ liệu
// https://www.npmjs.com/package/mongoose-slug-generator : npm install mongoose-slug-generator : slug
// https://github.com/ramiel/mongoose-sequence : để xem cách định địa chỉ id lần lược theo thứ tự
// (thực chất thư viện này có lẽ vẫn bị duplicate trường _id. Chỉ có thể giải quyết triệt để vấn đề này bằng
// cách thiết lập Mongo tự động increment như SQL Server, một khi còn dựa vào Mongoose thì vẫn bị.)

// https://getbootstrap.com/docs/5.1/getting-started/introduction/ bootstrap
// cách sử dụng routes: truy cập vào https://expressjs.com/en/4x/api.html#router.use để xem

//https://expressjs.com/en/resources/middleware.html
//http://expressjs.com/en/resources/middleware/method-override.html npm install method-override
//html chỉ có 2 phương thức là GET(mặc định) và POST khi cài method-override nó giúp sử dụng phương thức
// PUT và DELETE

// button type
// submnit: (default) gửi dữ liệu form hiện tại
// button: chỉ đơn giản là 1 nút nhấn. việc thực hiện nó như nào sẽ thông qua js
// reset:  Resets data in the current form.

// xem Definition and Usage attributes của các thẻ tag vào HTML https://www.w3schools.com/tags/tag_label.asp
// tìm hiểu về form https://xuanthulab.net/the-form-trong-html.html


//NodeLists and Arrays are two different things because NodeLists are actually not a JavaScript API,
// but a browser API.

//Things like querySelectorAll() and getElementsByTagName() aren’t JavaScript methods,
// they’re browser APIs that let you access DOM elements. You can then manipulate them with JavaScript.
// Array.prototype.slice.call() dùng thằng này để convert sang kiểu array

// IE bản thấp ko hỗ trợ arrow function

// https://expressjs.com/en/4x/api.html#res.locals để biết thêm về biến locals
//biến res.locals chỉ tồn tại trong 1 yêu cầu. ví dụ khi refress lại trang lần 1 nó có nhưng lần 2
// thì ko (chỉ tồn tại trong 1 yêu cầu). biến locals này chỉ có trong views (có thể sang .hbs để thử)
