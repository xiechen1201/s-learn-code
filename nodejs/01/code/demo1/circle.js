const { PI } = Math;

// 导出 area 和 circumference 两个函数
exports.area = (r) => PI * r ** 2;
exports.circumference = (r) => 2 * PI * r;