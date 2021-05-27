const express = require("express");
const path = require("path");
const app = new express();
app.use(express.static(path.join(__dirname, "page")));
app.listen(80, () => {
    console.log("server 80 已启动");
});
