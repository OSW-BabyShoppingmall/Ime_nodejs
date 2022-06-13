
function snsLogin(num){
    var login;
    if(num==0){
        login="naver";
    }
    else if(num==1){
        login="kakao";
    }
    else{
        login="google";
    }

    alert("login by "+login+" is not possible yet!");
}



$(document).ready(function() { 

    $("#submitt").click(function () {
        $.blockUI({

            // blockUI code with custom 
            // message and styling
            message: "<h3>Please Wait...<h3>",
            css: { color: 'green', borderColor: 'green'}
        });
        setTimeout(function () {
            $.unblockUI();
            //location.href="../index.html";
           // alert("login success!");
           Login();
        }, 2000);
    });

})

function Login(){



    const savedToDos=localStorage.getItem("userinfo");   //localStorage에 저장된 값을 불러옴 
    let toDos=[];
if(savedToDos){     //savedToDos가 비어있지 않으면
    const parsedToDos=JSON.parse(savedToDos);   //savedToDos는 saveToDos()로 인해 string형태로 저장돼있으므로
                                                //string을 array형태로 다시 저장해줌 
    toDos=parsedToDos;                          //그걸 다시 toDos에 저장해줌
    parsedToDos.forEach(paintResult);             //각각 paintToDo호출
}
}



function paintResult(newTodo){
    //화면에 데이터를 출력하는 함수

    var userinputid=$("#id").val();
    var userinputpwd=$("#pwd").val();

    console.log(newTodo.id);
    console.log(newTodo.password);
    console.log("userinputid"+userinputid);
    console.log("password"+userinputpwd);

    if(userinputid==newTodo.id && userinputpwd==newTodo.password){
        alert("Login success!");
        savestatus();
        location.href="../index.html";
    }
    else{
        alert("Login fail");
    }
}


$(document).ready(function() { 

    $('#signup').click(function() { 
        $.blockUI({ message: null }); 

        setTimeout(function () {
                $.unblockUI();
                location.href="../html/signup.html";
                }, 1500);
}); 

}); 


function savestatus(){
    localStorage.setItem("status","login");    //localStorage에 key : "username" , value : "text" 저장         
}
