let input = document.querySelector("input"); // 输入框

let add = document.querySelector(".app_top button"); // 添加按钮

let ul = document.querySelector("ul");

let li = document.getElementsByTagName("li");

let remove = document.querySelector(".todo_list"); // 事件委托

let clear = document.querySelector(".app_footer button"); // 清除全部按钮

let number = document.querySelector(".number"); // 获取计数的数字

function refresh() {
    remove.innerHTML = ""; // 清空 ul 的内容

    let storage = localStorage.getItem("todo_app");
    storage = JSON.parse(storage);

    if (!storage) {
        number.innerHTML = "0";
    } else {
        storage.map((item) => {
            ul.insertAdjacentHTML(
                "beforeend",
                `<li>${item}<button class='button delete'>删除</button></li>`
            );
        });
        number.innerHTML = `${storage.length}`;
    }
}

refresh();

// 添加按钮绑定事件
add.addEventListener("click", () => {
    let todo_item = input.value; // 获取输入框内容

    if (todo_item) {
        let storage = localStorage.getItem("todo_app"); // 获取localStorage
        if (!storage) {
            storage = []; // 如果为空就将其设为空数组
        } else {
            storage = JSON.parse(storage); // 不为空就将其解析为数组
        }

        if (storage.includes(todo_item)) {
            alert("已存在"); // 如果内容已存在就提示用户已存在并返回
            return;
        }

        storage.push(todo_item); // 数组增加新的元素
        storage = JSON.stringify(storage); // JSON化
        localStorage.setItem("todo_app", storage); // 存储localStorage

        input.value = ""; // 清空输入框内容
        refresh(); // 刷新数据
    }
});

// 删除按钮绑定事件
remove.addEventListener("click", (event) => {
    // 获取要删除的 item 的内容
    let value = event.target.previousSibling;
    value = value.data;

    // 获取localStorage
    let storage = localStorage.getItem("todo_app");
    storage = JSON.parse(storage);

    // 获取 item 的索引
    let index = storage.indexOf(value);

    // 删除 item
    storage.splice(index, 1);

    // 存储 localStorage
    storage = JSON.stringify(storage);
    localStorage.setItem("todo_app", storage);

    refresh(); // 刷新
});

// 清空按钮绑定事件
clear.addEventListener("click", () => {
    localStorage.clear();
    refresh();
});
