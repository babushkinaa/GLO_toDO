console.log('toDoList');

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    headerBotton = document.querySelector('.header-button'),
    container = document.querySelector('.container'),
    todo = document.getElementById('todo'),
    todoItem = document.querySelectorAll('.todo-item'),
    todoComplet = document.getElementById('completed'),
    
    
    job,
    newJob = [],
    complectJob = [],

    newJobBtnComplet = todo.querySelector('.todo-complete'),
    newJobBtnRemove = todo.querySelector('.todo-remove'),
    completJobBtnComplet = todoComplet.querySelector('.todo-complete'),
    completJobBtnRemove = todoComplet.querySelector('.todo-remove'),
    itemNewJob = todo.querySelector('.todo-item').cloneNode(true),
    itemCompletJob = todoComplet.querySelector('.todo-item').cloneNode(true);

    hidenElement = function(){
        todo.querySelector('.todo-item').style.display = 'none';
        todoComplet.querySelector('.todo-item').style.display = 'none';
        lsNewJob = localStorage.getItem('newJob').split(',');
        lsCompleteJob = localStorage.getItem('complectJob').split(',');
        console.log('lsNewJob: ', lsNewJob);
        if (lsNewJob) {
            for (const key in lsNewJob) {
                if (lsNewJob.hasOwnProperty(key)) {
                    const element = lsNewJob[key];
                    let item = itemNewJob.cloneNode(true);
                    console.log('item: ', item);
                    let itemBtn = itemNewJob.querySelector('.todo-buttons').cloneNode(true);
                    itemBtn.querySelector('.todo-complete').addEventListener('click', eventAdd); //событие на кнопку lj добавить в список
                    itemBtn.querySelector('.todo-remove').addEventListener('click',deleteJob);
                    item.textContent = element;
                    item.appendChild(itemBtn); // вставляем кнопки
                    todo.appendChild(item); 
                }
            }
        }
        if (lsCompleteJob) {

            for (const key in lsNewJob) {
                if (lsCompleteJob.hasOwnProperty(key)) {
                    const element = lsCompleteJob[key];
                    let item = itemCompletJob.cloneNode(true);
                    console.log('item: ', item);
                    let itemBtn = itemCompletJob.querySelector('.todo-buttons').cloneNode(true);
                    itemBtn.querySelector('.todo-complete').addEventListener('click', eventReturnNewJob); //событие на кнопку lj добавить в список
                    itemBtn.querySelector('.todo-remove').addEventListener('click',deleteJob);
                    item.textContent = element;
                    item.appendChild(itemBtn); // добавляем в li кнопки с новыми событиями
                    todoComplet.appendChild(item); 
                }
            }

            
        }
    }

    // добавляем новую задачу со строки

    addNewJobList = function(){
        console.log(event);
        let item = itemNewJob.cloneNode(true); // получаем li  из newJob
        let itemBtn = item.querySelector('.todo-buttons').cloneNode(true); // получаем кнопки из li
        itemBtn.querySelector('.todo-complete').addEventListener('click',eventAdd); //событие на кнопку lj добавить в список
        itemBtn.querySelector('.todo-remove').addEventListener('click',deleteJob); // событие удалить
        item.textContent = document.querySelector('.header-input').value.trim(); // присваиваем значение новому li
        newJob.push(item.textContent.trim());
        localStorage.setItem('newJob',newJob);
        item.appendChild(itemBtn); // вставляем кнопки
        todo.appendChild(item); //  вставляем элемент в список
        document.querySelector('.header-input').value = '';
        console.log(newJob);

    }

    // перемещаем задачу в лист с выполненными задачами

    addNewJobListComplet = function(){
        let itemValue = event.target.parentElement.parentElement; // получаем значение из введенной строки
        let item = itemCompletJob.cloneNode(true); // получаем новый li
        console.log('item: ', item);
        let itemBtn = item.querySelector('.todo-buttons').cloneNode(true);// получаем кнопки из li
        let itemJob = itemValue.textContent.trim(); // сохраняем значение 
        itemBtn.querySelector('.todo-remove').addEventListener('click',eventRemov); // добавляем событие удалить
        itemBtn.querySelector('.todo-complete').addEventListener('click',eventReturnNewJob); // добавляем событие переместить в jobComplet
        item.textContent = itemJob; // присваиваем значение 
        complectJob.push(itemJob); // добавляем в массив выполненных работ
        tmpArr = []; // временный масив
        console.log(newJob);
        for (const key in newJob) {// проверяем по массиву newJob перемещаемый элемент
            console.log(newJob.hasOwnProperty(key));
            if (newJob.hasOwnProperty(key) && newJob[key] !== itemJob) { //если он есть и не равен значению удаляемого элемента
                const element = newJob[key]; // для удобства переменная текущее значение элемента массива
                tmpArr.push(element);// добавляем во временный массив
                console.log('tmpArr: ', tmpArr);
            }
        }
        newJob = tmpArr;// присваиваем массиву newJob временный массив
        console.log('newJob: ', newJob);
        localStorage.setItem('newJob',newJob); // записываем в ls новый массив
        localStorage.setItem('complectJob',complectJob); // записываем в ls новый массив выполненных работ
        item.appendChild(itemBtn); // добавляем в li кнопки с новыми событиями
        todoComplet.appendChild(item); // вставляем элемент
        itemValue.remove(); // удаляем выбранный элемент
    }

    //возвращаем в список новых задач
    returnNewJobList = function(){
        let itemValue = event.target.parentElement.parentElement;
        console.log('itemValue: ', itemValue);
        let item = itemCompletJob.cloneNode(true);
        let itemBtn = item.querySelector('.todo-buttons').cloneNode(true);
        let itemJob = itemValue.textContent.trim();
        itemBtn.querySelector('.todo-remove').addEventListener('click',eventRemov);
        itemBtn.querySelector('.todo-complete').addEventListener('click',eventAdd);
        newJob.push(itemJob);
        tmpArr = [];
        for (const key in complectJob) {
            if (complectJob.hasOwnProperty(key) && complectJob[key] !== itemJob) {
                const element = complectJob[key];
                tmpArr.push(element);
            }
        }
        complectJob = tmpArr;
        localStorage.setItem('complectJob',complectJob);
        localStorage.setItem('newJob',newJob);

        item.textContent = itemJob;
        item.appendChild(itemBtn);
        todo.appendChild(item);
        itemValue.remove();
        console.log(complectJob);
    }

    // событие на кнопке синей - возврат в список новых дел
    eventReturnNewJob = function(){
        event.preventDefault();
        returnNewJobList();
    }

    // событие на кнопке белой - добавление в список выполненных дел
    eventAdd = function(){
        event.preventDefault();
        addNewJobListComplet();
    }

    // событие удаление задачи из списков
    eventRemov = function(){
        event.preventDefault();
            deleteJob();
    }

    // функция удаления задачи из списков
    deleteJob = function(){
        let itemValue = event.target.parentElement.parentElement.parentElement;
        let itemJob = event.target.parentElement.parentElement.textContent.trim();
        let item = event.target.parentElement.parentElement;
        let nameArr = itemValue.id;
        let jobArr =[];
        (itemValue.id === 'todo') ? jobArr = newJob : jobArr = complectJob;
        (itemValue.id === 'todo') ? nameArr = 'newJob' : nameArr = 'complectJob';
        tmpArr = [];
        for (const key in jobArr) {
            if (jobArr.hasOwnProperty(key) && jobArr[key] !== itemJob) {
                const element = jobArr[key];
                tmpArr.push(element);
            }
        }
        jobArr = tmpArr;
        localStorage.setItem(nameArr,jobArr);
        item.remove();
    }
   

// событие добавление новой задачи
headerBotton.addEventListener('click',(event)=>{        
    event.preventDefault();
    addNewJobList();
});
// событие добавления выполненной задачи
newJobBtnComplet.addEventListener('click',(event)=>{        
    event.preventDefault();
    addNewJobListComplet();
});

// не испольщую но перепишу
removeArrItem = function(arr, item){
    tmpArr = [];
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        (element.responseText === item.responseText)? delete arr[i] : tmpArr.push(item.responseText);
    }
    arr = tmpArr;
}
// не испольщую но перепишу
addArrItem = function(arr, item){
    tmpArr = arr;
        arr.push(item);
}
hidenElement();
