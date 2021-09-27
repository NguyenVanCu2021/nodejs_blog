// Đây là nơi chứa cấu trúc dữ liệu mongoose sẽ giao tiếp với mongoDB theo cấu trúc dữ liệu định ở đây
// dùng Schema (lược đồ) để định cấu trúc.
const mongoose = require('mongoose');

//Các thư viện liên quan đến mongoose sẽ được require ở đây
// install slug
//https://www.npmjs.com/package/mongoose-slug-generator : npm install mongoose-slug-generator
const slug = require('mongoose-slug-generator'); //sau khi install thư viện slug thì gọi nó ra ở đây

//install mongoose-delete (soft delete)
// https://www.npmjs.com/package/mongoose-delete : npm install mongoose-delete
const mongooseDelete = require('mongoose-delete'); ////sau khi install thư viện thì gọi nó ra ở đây

// install mongoose-sequence (định địa chỉ id lần lược theo thứ tự). Ví dụ trong cùng một thời điểm có rất nhiều
// người cùng submit 1 form, thì nhờ thằng này nó sẽ ko bị lỗi id trong CSDL
// https://github.com/ramiel/mongoose-sequence : npm install --save mongoose-sequence
const AutoIncrement = require('mongoose-sequence')(mongoose);


const Schema = mongoose.Schema;//Models are defined through the Schema interface.


// defined cấu trúc của object
const Course = new Schema({
    _id: { type: Number },//chủ động định nghĩa ID bình thường ID sẽ tự động tạo. đây chỉ là ví dụ thực tế tùy trường
    //hợp mà thực hiện ko nhất thiết phải thay đổi ID tự động
    name: { type: String, required: true},
    description: { type: String},
    image: { type: String},
    slug: { type: String, maxLength: 255},
    videoId: { type: String, required: true},
    level: { type: String, maxLength: 255},
    slug: { type: String, slug: 'name', unique: true}, //auto tạo slug, slug: 'name': tạo slug giống name
    // unique: true để chỉ tạo duy nhất 1 cái thôi có nghĩa là nếu cố tình tạo một slug giống slug trước
    // đó thì nó sẽ tự động thêm phía sau slug đó một slugId ngẫu nhiên để tránh trùng lặp
  }, {
    _id: false, // thêm vào để mongoDB ko can thiệp vào trường này nữa mà chạy theo cấu trúc bên trên
    timestamps: true,// nó tương đương với
                     // createdAt: { type: Date, default: Date.now },
                     // updateAt: { type: Date, default: Date.now },
  });

  // Add plugin
  mongoose.plugin(slug);// Initialization của slug
  Course.plugin(AutoIncrement);
  Course.plugin(mongooseDelete, { // đặt dưới Course vì đặt trên sẽ có lỗi vì chưa khai báo
                                  // Thằng này khai báo giống kiểu prototype
    deletedAt : true, // lưu lại thời gian delete
    overrideMethods: 'all', // { overrideMethods: 'all' } dùng để ghi đè (reload lại) 
  }); 
                                 
                                 


  module.exports = mongoose.model('Course', Course);
  