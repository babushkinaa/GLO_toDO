console.log('toDoList');

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    headerBotton = document.querySelector('.header-button'),
    container = document.querySelector('.container'),
    // todo = document.getElementById('todo'),
    todo = document.getElementById('todo'),
    // todo = document.querySelector('#todo'),
    todoItem = document.querySelectorAll('.todo-item'),
    todoComplet = document.getElementById('completed'),
    
    
    job,
    newJob = [],
    complectJob = [],

    newJobBtnComplet = todo.querySelector('.todo-complete'),
    newJobBtnRemove = todo.querySelector('.todo-remove'),
    completJobBtnComplet = todoComplet.querySelector('.todo-complete'),
    completJobBtnRemove = todoComplet.querySelector('.todo-remove');
    // console.dir(itemBtn);



    
    addNewJobList = function(){
        console.log(event);
        let item = todo.querySelector('.todo-item').cloneNode(true); // получаем li  из newJob
        let itemBtn = item.querySelector('.todo-buttons').cloneNode(true); // получаем кнопки из li
        itemBtn.querySelector('.todo-complete').addEventListener('click',eventAdd); //событие на кнопку lj добавить в список
        itemBtn.querySelector('.todo-remove').addEventListener('click',deleteJob); // событие удалить
        item.textContent = document.querySelector('.header-input').value.trim(); // присваиваем значение новому li
        newJob.push(item.textContent);
        // addArrItem(newJob,item.textContent);
        item.appendChild(itemBtn); // вставляем кнопки
        todo.appendChild(item); //  вставляем элемент в список

    }

    addNewJobListComplet = function(){
        let itemValue = event.target.parentElement.parentElement; // получаем значение из введенной строки
        console.log('itemValue: ', typeof(itemValue.textContent));
        let item = todoComplet.querySelector('.todo-item').cloneNode(true); // получаем новый li
        let itemBtn = item.querySelector('.todo-buttons').cloneNode(true);// получаем кнопки из li
        let itemJob = itemValue.textContent.trim(); // сохраняем значение 
        itemBtn.querySelector('.todo-remove').addEventListener('click',eventRemov); // добавляем событие удалить
        itemBtn.querySelector('.todo-complete').addEventListener('click',eventReturnNewJob); // добавляем событие переместить в jobComplet
        item.textContent = itemJob; // присваиваем значение 
        complectJob.push(itemJob);
        // removeArrItem(newJob,itemJob);
        tmpArr = [];
        for (let i = 0; i < newJob.length; i++) {
            const element = newJob[i];
            if (element.responseText !== itemJob.responseText) {
                tmpArr[i] = element;

            }
            // newJob.splice(i,1)

            console.log('newJob',newJob);
                console.log('tmpArr',tmpArr);

            // (element.responseText === itemJob.responseText)? newJob.splice(i,1) : tmpArr.push(element.responseText);
            // (element.responseText === itemJob.responseText)? delete newJob[i] : tmpArr.push(element);
        }
        newJob = tmpArr;
        console.log('newJob fin',newJob);
        console.log('tmpArr fin',tmpArr);

        item.appendChild(itemBtn);
        todoComplet.appendChild(item);
        itemValue.remove();
    }
    returnNewJobList = function(){
        let itemValue = event.target.parentElement.parentElement;
        console.log('itemValue: ', itemValue);
        let item = todoComplet.querySelector('.todo-item').cloneNode(true);
        let itemBtn = item.querySelector('.todo-buttons').cloneNode(true);
        let itemJob = itemValue.textContent;
        itemBtn.querySelector('.todo-remove').addEventListener('click',eventRemov);
        itemBtn.querySelector('.todo-complete').addEventListener('click',eventAdd);
        newJob.push(itemJob);
        for (let i = 0; i < complectJob.length; i++) {
            const element = complectJob[i];
            (element.responseText === itemValue.textContent.responseText)? delete complectJob[i] : '';
        }
        console.log(newJob);
        console.log(complectJob);
        item.textContent = itemJob;
        item.appendChild(itemBtn);
        todo.appendChild(item);
        itemValue.remove();
    }
    removeArrItem = function(arr, item){
        tmpArr = [];
        for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            (element.responseText === item.responseText)? delete arr[i] : tmpArr.push(item.responseText);
        }
            
        
        arr = tmpArr;
    }
    addArrItem = function(arr, item){
        tmpArr = arr;
            arr.push(item);
    }

    eventReturnNewJob = function(){
        event.preventDefault();
        returnNewJobList();
    }
    
    eventAdd = function(){
        event.preventDefault();
        addNewJobListComplet();
    }

    eventRemov = function(){
        event.preventDefault();
            deleteJob();
    }

    deleteJob = function(){
        let itemValue = event.target.parentElement.parentElement;
        itemValue.remove();
        console.log('делете');
    }


showArr = function(){
    console.log('newJob',newJob);
    console.log('completJob',complectJob);
}
    
    

    // setInterval(showArr,10000);


headerBotton.addEventListener('click',(event)=>{        
    event.preventDefault();
    addNewJobList();
});

newJobBtnComplet.addEventListener('click',(event)=>{        
    event.preventDefault();
    addNewJobListComplet();
});

arr = [1,2,3,4,5,6,7,8,0];
ta=[];
for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    ( arr[i] === 5 ) ? delete arr[i]:ta.push(arr[i]); 
}
arr = ta;
console.log('arr: ', arr);
