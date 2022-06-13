window.onload=function(){
const savedUsername=localStorage.getItem("status"); //localStorage에 저장된 username값 받아옴
console.log(savedUsername);

if(savedUsername===null){       //localStorage에 저장된 username이 비어있으면
    
}

else{
    const savedToDos=localStorage.getItem("userinfo");   //localStorage에 저장된 값을 불러옴 
    let toDos=[];
if(savedToDos){     //savedToDos가 비어있지 않으면
    const parsedToDos=JSON.parse(savedToDos);   //savedToDos는 saveToDos()로 인해 string형태로 저장돼있으므로
                                                //string을 array형태로 다시 저장해줌 
    toDos=parsedToDos;                          //그걸 다시 toDos에 저장해줌
    parsedToDos.forEach(paintToDo);             //각각 paintToDo호출       
 
}
}
}


function paintToDo(newTodo){
    //화면에 데이터를 출력하는 함수


    var userinputname=newTodo.name;
    
    $("#welcomename").text("Hello  "+userinputname);
    $("#welcomename").css("display","block");
  
}
