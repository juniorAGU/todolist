let subCon = document.querySelector(".sub-con");
let overLay = document.querySelector(".overlay");
let message = document.querySelector(".message");
let addContenet =document.querySelector(".add-content");
let form = document.querySelector("#form")
let main = document.querySelector(".main");
let Imes = document.querySelector(".in-mes")

let toDo = [];



function InitializeStorage(){
    let store = localStorage.getItem("todo")
    if(store){
        toDo = JSON.parse(store)
    }else{
        toDo = []  
    }
}

addContenet.addEventListener("click",() => {
    overLay.classList.add("show"); 
});
overLay.addEventListener("click",(e)=>{
     if(e.target === overLay) {
        overLay.classList.remove("show");
    }
})

function GetDate(){
    let normalDate = new Date();

    let time = normalDate.getTime();
    let day = normalDate.getDate();
    let month = normalDate.getMonth() + 1;
    let year = normalDate.getFullYear()
    return `${day}/${month}/${year}`
}

function HandleSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    let inPute = document.querySelector("#forname");
    let textArea = document.querySelector("#fordiscrip");
    
    let nameInput = inPute.value.trim();
    let text = textArea.value.trim();
    let idName = Math.floor(Math.random() * 1000) + 1;
    console.log(textArea.value.trim())

    if(nameInput === "" || text === ""){
        Imes.classList.add("showme")
        setTimeout(()=>{
            Imes.classList.remove("showme")
        },1300)

    }else{
        toDo.push({
            id: idName,
            taskName: nameInput,
            discription: text,
            completed: false,
            date:  GetDate()
        });
        message.classList.add("menow")
        setTimeout(()=>{
             window.location.href = "/Amaka3/index.html"
        },1500)
    }

    localStorage.setItem("todo",JSON.stringify(toDo))


}
form.addEventListener("submit",HandleSubmit)
function DisplayItems(){
    if(toDo.length > 0){
        subCon.innerHTML = toDo.map(items => `
            <div class="place"  data-task-id="${items.id}" style="${items.completed ? 'border-right: 4px solid green;background-color: #474d47;' : ''}">
                    <div class="name1">
                        <h2>${items.taskName}</h2>
                        <p>${items.date}</p>
                    </div>
                    <p>${items.discription}</p>
                    <div class="btn-edits">
                        <button onclick = "DoneTask(${items.id})" ${items.completed ? 'disabled' : ''}  style="${items.completed ? 'opacity: 0.5; cursor: not-allowed;' : ''}">
                        done
                        </button>
                        <button onclick = "DeleteItem(${items.id})">delete</button>
                    </div>
                </div>
            `).join("")
    }else{
        subCon.innerHTML = `
                <div class="no-product">
                    <h1>no task added</h1>
                </div>
        `
    }
}

    function DeleteItem(itemId){
         let produ = toDo.findIndex(p => p.id == itemId)
         toDo.splice(produ,1)

         localStorage.setItem("todo",JSON.stringify(toDo))

         DisplayItems()
    }
    function DoneTask(taskid){
        
        let product = toDo.find(p => p.id == taskid)
        console.log(product)
        
        if(product){
            product.completed = true
        }

        
         localStorage.setItem("todo", JSON.stringify(toDo));
         DisplayItems()
        

    }





InitializeStorage()
DisplayItems()
