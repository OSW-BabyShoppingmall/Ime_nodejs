var code=999999;



function doubleCheck(){
    var id=document.getElementById("id").value;
    console.log(id);
    if(id===""){
        alert("please input information");
    }
    else{
    alert("You can sign up");
    }
}

function getCode(){
    code=Math.floor(Math.random()*10**6);
    alert("varification code: "+code);
}







function moveLogin(){
    location.href="../html/login.html";
  }



//회원가입 통과시킬지 말지 

function signUp(){
   // $("#id").val()
    var id=$("#id").val();
    var pwd1=$("#password_1").val();
    var pwd2=$("#password_2").val();
    var name=$("#name").val();
    var year=$("#year").val();
    var day=$("#day").val();
    var phone=$("#phone").val();
    var usercode=$("#code").val();

    console.log(id);
    console.log(pwd1);
    console.log(pwd2);
    console.log(name);
    console.log(year);
    console.log(day);
    console.log(phone);
    console.log(usercode);
    
    
  
    var checkpass=1;

    if(id!="" && pwd1!="" && pwd2!="" && name!="" && year!="" 
    && day!="" && phone!="" && usercode!=""){
        if(pwd1==pwd2 && code==usercode){
            var i=0;
            console.log($("#cbx_chkAll").is(":checked"));
            
            if($("#cbx_chkAll").is(":checked")){
               checkpass=1;
            }
            else{
                checkpass=0;
            }
            
           
            if(checkpass==1){
            alert("Sign up success "+name+"!!");
            savelocalStorage();
            location.href="../html/login.html";
            }
            else{
                alert("Please agree all terms of services");
            }
            console.log(checkpass)
        }
        else if(pwd1!=pwd2){
            alert("password is different");
        }
        else if(code!=usercode){
            alert("verification code is different");
        }
        
    }
    else{
      
        alert("Please input information correctly");
    }


}

//체크박스 선택 기능

$(document).ready(function() {
	$("#cbx_chkAll").click(function() {
		if($("#cbx_chkAll").is(":checked")) $("input[name=chk]").prop("checked", true);
		else $("input[name=chk]").prop("checked", false);
	});

	$("input[name=chk]").click(function() {
		var total = $("input[name=chk]").length;
		var checked = $("input[name=chk]:checked").length;

		if(total != checked) $("#cbx_chkAll").prop("checked", false);
		else $("#cbx_chkAll").prop("checked", true); 
	});
});



//비밀번호 일치여부 확인기능

$(document).ready(function() {
	$('.pw').focusout(function () {
        var pwd1 = $("#password_1").val();
        var pwd2 = $("#password_2").val();
    
        if ( pwd1 != '' && pwd2 == '' ) {
            null;
        } else if (pwd1 != "" || pwd2 != "") {
            if (pwd1 == pwd2) {
                $("#alert-success").css('display', 'inline-block');
                $("#alert-danger").css('display', 'none');
            } else {
                $("#alert-success").css('display', 'none');
                $("#alert-danger").css('display', 'inline-block');
            }
        }
    });
});


function savelocalStorage(){
    event.preventDefault();                 //새로고침 막음
    const id=$("#id").val();
    const pwd=$("#password_1").val();
    const name=$("#name").val();
    let info=[];

   
    
    const newInfoObj={  //객체를 만들어 text와 id설정
        id: id,
        password : pwd,
        name: name
    };
    info.push(newInfoObj); //toDos에 객체 값 저장
    localStorage.setItem("userinfo", JSON.stringify(info)); //key : todos , value : {text, id} stringify는 string형태로 저장하는 것
}
