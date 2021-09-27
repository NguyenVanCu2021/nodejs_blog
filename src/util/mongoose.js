//toObject() là hàm của mongoose dùng để trả ra chính phần tử đó. (chữa lỗi bảo mật)
// dùng phương thức map() để lặp ra phần tử
module.exports = {
    mutipleMongooseToObject: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose; // nếu chỉ có 1 phần tử thì dùng thằng này
    }
};
