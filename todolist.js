// Selector (Phương thức "document.querySelector()" chả về phần tử đầu tiên phù hợp với bộ chọn)
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
// console.log(todoList)
const filterOption = document.querySelector('.filter-todo');


// Event Listeners (Gắn một trình xử lý sự kiện vào phần tử được chỉ định.)
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener('click', addTodo); 
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

/**
 * Phương thức "document.addEventListener()" đính kèm một trình xử lý sự kiện vào tài liệu;
 * DOMContentLoaded: trình duyệt đã tải đầy đủ HTML và cây DOM được tạo (Sự kiện "DOMContentLoaded" xảy ra trên đối tượng "getTodo");
 * todoButton, todoList, filterOption: ĐỐi tượng HTML sử dụng DOM để lấy;
 * addTodo, deleteCheck, filterTodo: Hàm được chạy khi sự kiện "click" được kích hoạt;
 */

// Function
function addTodo(event) {
    // Ngăn không gửi biểu mẫu
    event.preventDefault();  
    // Todo DIV
    const todoDiv = document.createElement('div'); // Tạo ra một nút <div>
    todoDiv.classList.add("todo"); // "classlist.add()"  thêm class "todo" vào thẻ <div>
    //Create LI
    const newTodo = document.createElement('li'); // Tạo ra một nút <li>
    // Taking Input (Lấy đầu vào)
    newTodo.innerText = todoInput.value; // <innerText> được sử dụng để viết các văn bản động trên các trang web html
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);

    /**
     * Phương thức "appendChild()" gắn thêm nút con mới vào cuối danh sách nút con của một nút.
     * "newTodo" Một nút con sẽ được thêm (gắn vào) todoDiv
     */
    
    //ADD TODO TO LOCAL STORAGE (Thêm việc cần làm vào bộ nhớ cục bộ)
    saveLocalTodos(todoInput.value);
    /**
     * Đối tượng localStorage lưu trữ dữ liệu không có ngày hết hạn. Dữ liệu sẽ không bị xóa khi trình duyệt bị đóng 
     * Thuộc tính localStorage là chỉ đọc.
     */

    // CHECKED Mark Button (nút đánh dáu đã kiểm tra)
    const completedButton = document.createElement('button'); // Tao ra một nút <button>
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash  Button (nút thùng rác)
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; // <innerHTML> Giúp <set: truyền vào> hoặc <get: lấy được> đoạn mã HTML của một phần tử nào đó trên trang ưeb
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to List (nối vào danh sách)
    todoList.appendChild(todoDiv)
    // Clear Todo Input Value ()
    todoInput.value = "";

}

function deleteCheck(e) {

    const item = e.target; // Thuộc tính <e.target> trả về phần tử kích hoạt sự kiện
    //DELETE
    if (item.classList[0] === "trash-btn") { //Thuộc tính classList trả về (các) tên lớp của một phần tử, dưới dạng một đối tượng DOMTokenList.
        const todo = item.parentElement;
        // Animation
        todo.classList.add('fall');

        removeLocalTodos(todo);
        //todo.remove();
        todo.addEventListener('transitioned', function() { // <transitioned: chuyển tiếp> 

            todo.remove();

        });

    }

    // Check Mark (đánh dấu)
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed"); // bạn có thể hiểu thế này có rồi thì nó bỏ , còn chưa có thì nó sẽ thêm vào. (trả về kiểu Boolean)
    }
                             
}

function filterTodo(e) {
    const todos = todoList.childNodes; // Thuộc tính childNodes trả về một tập hợp các nút con của một nút, như một đối tượng NodeList.
    console.log(todos)
    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) { 
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = 'flex';

                } else {
                    todo.style.display = "none";
                } 
                break;  
        }
    });
}

function saveLocalTodos(todo){
    // Check ---Hey Do I have thing in here
    let todos;
    if(localStorage.getItem('todos') === null){ 
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos')); 
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

/**
 * <JSON.parse>: đẻ chuyển đổi văn bản thành một đối tượng Javascript
 * <x=localStorage.getItem("item")>: Trả lại giá trị của key => key không tồn tại, nếu tồn tại trả về DOMString
 * <localStorage.setItem>: Đặt giá trị của mục lưu trữ phiên được chỉ định. Giá trị trả về <undefined>
 * <JSON.stringify>: phương pháp chuyển đổi một đối tượng JavaScript hoặc giá trị cho một chuỗi JSON
 */

function getTodos(){
    // Check ---Hey Do I have thing in here
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
        console.log(todos)
    }
    todos.forEach(function(todo){

        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        // CHECKED Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        // Trash  Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        // Append to List
        todoList.appendChild(todoDiv)    

    });
    
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];

    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = Array.from(todoList.childNodes).indexOf(todo);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos)); 

    /**
     * <Array.from()>: trả về một đối tượng Array từ bất kỳ đối tượng nào có thuộc tính length hoặc một đối tượng có thể lặp lại.
     * <Aray.indexOf()>: phươn g thức trả về chỉ số đầu tiên mà tại đó một yếu tố nhất định có thể được tìm thấy trong mảng, hoặc -1 nếu nó không phải là hiện tại.
     * <todos.splice>: Phương thức splice () thêm / xóa các mục vào / khỏi một mảng và trả về (các) mục đã loại bỏ.
     */
    
    /*
    or,,,
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    */
}