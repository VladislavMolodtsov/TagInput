const ul = document.querySelector("ul"),
      input = document.querySelector("input"),
      tagNumb = document.querySelector(".details span");

let maxTags = 10,
    tags = ["CSS", "HTML"];

countTags();
createTag();

function countTags(){
    input.focus();
    tagNumb.innerText = maxTags - tags.length;
}

function createTag(){
    ul.querySelectorAll("li").forEach(li => li.remove());//удаление всех тегов li перед добавлением, чтобы не было дублирования тега
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag); //вставка или добавление li внутри тега ul
    });
    countTags();
}

function remove(element, tag){
    let index = tags.indexOf(tag);//получение индекса удаления тегов
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];//удаление или исключение выбранного тега из массива
    element.parentElement.remove();//удаление li удаленного тега
    countTags();
}

function addTag(e){
    if(e.key == "Enter"){
        let tag = e.target.value.replace(/\s+/g, ' '); //удаление нежелательных пробелов из tag
        if(tag.length > 1 && !tags.includes(tag)){ //если длина тега больше 1 и тег еще не существует
            if(tags.length < 10){
                tag.split(',').forEach(tag => { //разделение каждого тега через запятую
                    tags.push(tag); // добавление каждого тега внутрь массива
                    createTag();
                });
            }
        }
        e.target.value = "";
    }
}

input.addEventListener("keyup", addTag);
const removeBtn = document.querySelector(".details button");
removeBtn.addEventListener("click", () =>{
    tags.length = 0; // сделать массив пустым
    ul.querySelectorAll("li").forEach(li => li.remove()); // удаление всех тегов li
    countTags();
});