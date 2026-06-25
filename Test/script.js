document.addEventListener('DOMContentLoaded', function(){

    const todoList = document.getElementById('todoList');
    const inputTodo = document.getElementById('inputTodo');
    const btnAdd = document.getElementById('btnAdd');

    // 저장된 데이터 불러오기
    loadTodos();

    // 데이터 등록
    btnAdd.addEventListener('click', function() {

        const todoValue = inputTodo.value.trim();

        if(todoValue === ''){
            alert('할 일을 입력하세요.');
            return;
        }

        addTodo(todoValue);

        inputTodo.value = '';
        inputTodo.focus();
    });

    // 엔터키로 추가
    inputTodo.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            btnAdd.click();
        }
    });

    // 할 일 추가 함수
    function addTodo(todoText){

        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = todoText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.classList.add('delete-btn');

        // 데이터 삭제
        deleteBtn.addEventListener('click', function(){

            li.remove();

            let todos = JSON.parse(localStorage.getItem('todos')) || [];

            todos = todos.filter(todo => todo !== todoText);

            localStorage.setItem('todos', JSON.stringify(todos));
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        saveTodo(todoText);
    }

    // 데이터 저장
    function saveTodo(todoText){

        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        todos.push(todoText);

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // 데이터 불러오기
    function loadTodos(){

        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        todos.forEach(todo => {

            const li = document.createElement('li');

            const span = document.createElement('span');
            span.textContent = todo;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.classList.add('delete-btn');

            deleteBtn.addEventListener('click', function(){

                li.remove();

                let savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

                savedTodos = savedTodos.filter(item => item !== todo);

                localStorage.setItem('todos', JSON.stringify(savedTodos));
            });

            li.appendChild(span);
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
        });
    }

});