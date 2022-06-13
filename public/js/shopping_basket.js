var xxx;
$(document).ready(function () {
    $(".btn-block").click(function () {
        $("#basket").toggle("slow");
    });
});

var product_number=0;

var product_data=[
    ["../warm.img/cloth1_1.png",".cloth1_1","1"],
    ["../warm.img/cloth1_2.png",".cloth1_2","2"],
    ["../warm.img/cloth3_1.png",".cloth1_3","3"],
    ["",".cloth1_4","4"],
    ["",".cloth1_5","5"],
    ["",".cloth1_6","6"],
]

//호출한 태그의 클래스값 저장
function get(n){
    // var x=n.className;
    // alert(x);
    // var y=document.getElementsByClassName(x);
    // if(y[0].checked==true){
    //     append(0);
    // }
}

$(document).ready(function () {   
    $(".cloth1_1").change(function () {
        if ($(".cloth1_1").is(":checked")) {           
            append(".cloth1",0);
            add_total(0);
        } else {
            remove(0);
            minus_total(0);
        }
    });
    $(".cloth1_2").change(function () {
        if ($(".cloth1_2").is(":checked")) {
            append(".cloth1",1);
            add_total(1);
        } else {
            remove(1);
            minus_total(1);
        }
    });
    $(".cloth1_3").change(function () {
        if ($(".cloth1_3").is(":checked")) {
            append(".cloth1",2);
            add_total(2);
        } else {
            remove(2);
            minus_total(2);
        }
    });
    $(".cloth1_4").change(function () {
        if ($(".cloth1_4").is(":checked")) {
            append(".cloth1",3);
            add_total(3);
        } else {
            remove(3);
            minus_total(3);
        }
    });
    $(".cloth1_5").change(function () {
        if ($(".cloth1_5").is(":checked")) {
            append(".cloth1",4);
            add_total(4);
        } else {
            remove(4);
            minus_total(4);
        }
    });
    $(".cloth1_6").change(function () {
        if ($(".cloth1_6").is(":checked")) {
            append(".cloth1",5);
            add_total(5);
        } else {
            remove(5);
            minus_total(5);
        }
    });
});


function append(name,n){
    $(name).append("<tr class="+n+"><td><img src="+product_data[n][0]+"></td>"+
    "<td><p>"+product_data[n][1]+"</p></td>"+
    "<td><select><option value=''>--choose option--</option>"+
    "<option value='option1'>option1</option>"+
    "<option value='option2'>option2</option></select></td>"+
    "<td><p class='price'>"+product_data[n][2]+"</p></td>"+
    "<td><span class='result'>1</span>"+
    "<button class='btn'onclick='add("+n+")'>up</button>"+
    "<button class='btn' onclick='minus("+n+")'>down</button></td></tr>"
    );
}

function remove(n){
    var x=document.getElementsByClassName(n);
    x[0].remove();
}

/*물건 개수에 따른 가격 계산*/
function add(n){
    var x=document.getElementsByClassName("result");
    var y=document.getElementsByClassName("price");
    x[n].innerHTML = Number(x[n].innerHTML)+1;
    y[n].innerHTML=Number(y[n].innerHTML)+Number(product_data[n][2]);
    add_total(n);
}

function minus(n){
    var x=document.getElementsByClassName("result");
    var y=document.getElementsByClassName("price");
    if(Number(x[n].innerHTML)==0){
        alert("There is no product");
    }
    else{
        x[n].innerHTML = Number(x[n].innerHTML)-1;
        y[n].innerHTML=Number(y[n].innerHTML)-Number(product_data[n][2]);
        minus_total(n);
    }
}
    
/*물건 가격 총합, 총 결재 금액 계산*/
function add_total(n){
    var x=document.getElementsByClassName("product_price");   
    var y=document.getElementsByClassName("delivery_price");
    var z=document.getElementsByClassName("total_price");
    x[0].innerHTML=Number(x[0].innerHTML)+Number(product_data[n][2]);
    if(Number(x[0].innerHTML)>20){
        y[0].innerHTML=0;
    }
    z[0].innerHTML=Number(x[0].innerHTML)+Number(y[0].innerHTML);
}

function minus_total(n){
    var x=document.getElementsByClassName("product_price");   
    var y=document.getElementsByClassName("delivery_price");
    var z=document.getElementsByClassName("total_price");

    x[0].innerHTML=Number(x[0].innerHTML)-Number(product_data[n][2]);
    if(Number(x[0].innerHTML)<=20){
        y[0].innerHTML=10;
    }
    z[0].innerHTML=Number(x[0].innerHTML)+Number(y[0].innerHTML);
    if(Number(x[0].innerHTML)==0){
        z[0].innerHTML=Number(z[0].innerHTML)-10;
    }
}
