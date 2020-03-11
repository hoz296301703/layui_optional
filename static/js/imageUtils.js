function shrink_img(str) {
  if (str.indexOf("goodsContent")) {
    // 判断str是否有‘goodsContent’字符，有就替换成‘goodsCompression’
    str = str.replace("goodsContent", "goodsCompression");
  }
  return str;
}
