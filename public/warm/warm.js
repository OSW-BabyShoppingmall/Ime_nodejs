


  function showPage2(num)  //page2와 screenfecne를 띄운다
  {
    var elements=document.getElementsByClassName("imageitem");  //imageitem은 5개로 제한한다



    for(var i=0;i<elements.length;i++)
    {
      elements[i].src="../warm.img/cloth"+num+"_"+(i+1)+".png";
    }
    InitializeItemValue(num); //페이지띄울때 해당 아이템에 맞게 값 초기화

    var screenFence=document.getElementsByClassName("screenfence");
    var Page2=document.getElementsByClassName("page2");
    var topright=document.getElementsByClassName("top_right");
    screenFence[0].style.visibility="visible";  //screenFence로 검은막 형성
    Page2[0].style.visibility="visible";  //screenFence위에 Page2형
    topright[0].style.display="none"; //상단 submenu안보이게. 보이면 exit버튼 클릭안됨
  }
  function PageMove(clickDirection)
  {   //참고로 함수에 매개변수넣을떄는 작은따옴표로 넣어야함


    var elements=document.getElementsByClassName("imageitem");
    var isNum=elements[0].src.slice(-8,-7); //이것이 문자라면 9이하의 숫자, 숫자라면 두자리수이기떄문에 10이상의 숫자.근데 왜 나눈거지? > 숫자를 가져오기위하여
    var clothIndex;
    var nextClothIndex; //다음 페이지로 넘어갈 때의 ClothIndex
    isNum=Number(isNum);
    if(clickDirection=="right") //오른쪽으로 클릭이 됐다면
    {
      if(isNaN(isNum)) //isNan이 NaN이면 cloth 번호가 한자리수라는 뜻
      {
        clothIndex=elements[0].src.substr(-7,1);
        clothIndex=parseInt(clothIndex);
        for(var i=0;i<elements.length;i++)
        {
          elements[i].src = elements[i].src.replaceAt(-7,clothIndex+1);
        }
        nextClothIndex=clothIndex+1;
      }
      else
      { //cloth 번호가 두자리수라는 뜻
        clothIndex=elements[0].src.substr(-8,2);
        clothIndex=parseInt(clothIndex);
        if(clothIndex==15) //clothIndex가 15라면, 15가 마지막 테이블이기때문에 cloth15_1에서 cloth1_1로바뀌게한다. 따라서 pagemove시 싸이클이 돌도록한다
        {
          for(var i=0;i<elements.length;i++)
          {
            elements[i].src = elements[i].src.replaceAt(-7,""); //두자리수에서 일의자리부분을 공백처리하여 1로만든다. 싸이클이 되도록 하기위함. 즉 15에서 1로 가도록
          }
          nextClothIndex=1;
        }
        else
        {
          for(var i=0;i<elements.length;i++)
          {
            elements[i].src = elements[i].src.replaceAt(-7,clothIndex+1-10); //두자리수에서 1의자리수만 +1한다
          }
          nextClothIndex=clothIndex+1;
        }
      }

    }
    else if(clickDirection=="left") //왼쪽으로 클릭이 됐다면
    {
      if(isNaN(isNum)) //isNan이 NaN이면 cloth 번호가 한자리수라는 뜻
      {
        clothIndex=elements[0].src.substr(-7,1);
        clothIndex=parseInt(clothIndex);
        if(clothIndex==1) //clothIndex가 1이므로, 싸이클이돌도록 맨 끝으로 가게하기위하여 1을 15로 대체한다
        {
          for(var i=0;i<elements.length;i++)
          {
            elements[i].src = elements[i].src.replaceAt(-7,15);
          }
          nextClothIndex=15;
        }
        else
        {
          for(var i=0;i<elements.length;i++)
          {
            elements[i].src = elements[i].src.replaceAt(-7,clothIndex-1);
          }
          nextClothIndex=clothIndex-1;
        }

      }
      else
      { //cloth 번호가 두자리수라는 뜻
        clothIndex=elements[0].src.substr(-8,2);
        clothIndex=parseInt(clothIndex);
        for(var i=0;i<elements.length;i++)
        {
          if(clothIndex==10) //clothIndex가 10이라면 -1하면 9일텐데, 자리수가 바뀜으로 문자열 관리법이 좀 다르다
          {
            elements[i].src=elements[i].src.replaceAt(-8,9); //10에서 1부분을 9로바꾼다
            elements[i].src=elements[i].src.replaceAt(-7,""); //10에서 0부분을 공백으로 대체한다
          }
          else
          {
            elements[i].src = elements[i].src.replaceAt(-7,clothIndex-1-10); //두자리수에서 1의자리수만 -1한
          }

        }
          nextClothIndex=clothIndex-1;
      }
    }
    else { //PageMove의 매개변수 예외처리
      document.write("PageMove paramater is wrong");
    }



    InitializeItemValue(nextClothIndex); //페이지 넘길 떄 해당 아이템에 맞게 값 초기화


  }

  function colorSelectFunc()
  {

    var colorSelect=document.getElementsByClassName("colorSelect");
    var sizeSelect=document.getElementsByClassName("sizeSelect");
    sizeSelect[0].selected="true"; //색깔이 선택된다면 사이즈메뉴초기화

  }

  function sizeSelectFunc()
  {
    var colorSelect=document.getElementsByClassName("colorSelect");
    var sizeSelect=document.getElementsByClassName("sizeSelect");
    var selectedColor;
    var selectedSize;
    var AddItem=document.getElementsByClassName("AddItem");
    var checkInclude=AddItem[0].innerHTML; //AddItem클래스에 들어있는 내용을 다 받음. AddItem은 추가한 목록인데, 중복된 아이템을 추가하지 않게하기위해 사용
    var itemPrice=document.getElementById("price");
    itemPrice=parseInt(itemPrice.innerHTML); //해당 물품의 가격정보를 가져온다. 그리고 뒤에 숫자가아닌 문자열은 제거시킨다
    for(var i=1;i<=3;i++) //색상중에 선택된 색상의 인덱스를 받고,그 생상정보를 얻는다
    {
      if(colorSelect[i].selected == true){
        selectedColor = colorSelect[i].value;
        break;
      }
    }

    for(var j=1;j<=2;j++) //사이즈 중에 선택된 사이즈의 인덱스를 받고, 그 사이즈 정보를 얻는다
    {
      if(sizeSelect[j].selected == true){
        selectedSize = sizeSelect[j].value;
        break;
      }
    }

    if(colorSelect[0].selected !=true && sizeSelect[0].selected !=true)  //색상과 사이즈가 선택되었을 때만 추가한다
    {
      if(checkInclude.includes(selectedColor+'/ '+selectedSize)!=true) //이미 AddItem에 해당 아이템이 있다면, 추가하지 않는다
      {
        $(document).ready(function(){
          $(".AddItem").append('<div  class="ItemList"><hr><div class="oneKindItem">'+selectedColor+'/ '+selectedSize+'</div><input class="inputNum" type="number" value="1" onchange="ItemPriceCalc(this)"/><a href="#" onclick="return false"><img class="removeImg" src="../warm.img/remove.png" alt="img" onclick="removeList(this)"/></a><div class="oneKindItemPrice">'+itemPrice+'원</div></hr></div>');
          TotalPriceCalc();
        });
      }
    }
  }


  function ItemPriceCalc(obj) //input number에서 this값들어오면 해당 input태그가 몇번째인지 알아내서, 총 값 계산
  {
    var inputNum=document.getElementsByClassName("inputNum");
    var oneKindItemPrice=document.getElementsByClassName("oneKindItemPrice");
    //var price=document.getElementById("price");
    var index;
    for(var i=0;i<inputNum.length;i++) //this값과 inputNum[i]가 같음을 이용해서 해당 index를 알아냄
    {
      if(inputNum[i]==obj){ index=i; break;}
    }

    oneKindItemPrice[index].innerHTML = parseInt(price.innerHTML)*obj.value+'원'; //아이템 갯수당 총 값 계산

    TotalPriceCalc();

  }

  function TotalPriceCalc()
  {
    var totalPrice=document.getElementsByClassName("totalPrice");
    var oneKindItemPrice=document.getElementsByClassName("oneKindItemPrice");
    var totalvalue=0;
    for(var i=0;i<oneKindItemPrice.length;i++)
    {
      totalvalue+=parseInt(oneKindItemPrice[i].innerHTML);
    }
    totalPrice[0].innerHTML=totalvalue+'원';
  }

  function removeList(obj)
  {
      var removeImg=document.getElementsByClassName("removeImg");
      var index;
      for(var i=0;i<removeImg.length;i++) //obj 즉 this와 removeImg[index]가 같은지 확인하여 해당 리스트가 몇번째 index인지 알게위함
      {
        if(removeImg[i]==obj){index=i;break;}
      }
      $(document).ready(function(){
        $(".ItemList").eq(index).remove();
        TotalPriceCalc();
      });
  }


  function InitializeItemValue(ItemIndex)
  {
    var AddItem=document.getElementsByClassName("AddItem"); //추가된 아이템 목록리스트를 초기화한다.
    AddItem[0].innerHTML="";
    var ItemPrice=document.getElementById("price");
    var ItemName=document.getElementById("itemName");
    var TotalPrice=document.getElementsByClassName("totalPrice");
    var ColorSelect=document.getElementsByClassName("colorSelect");
    var SizeSelect=document.getElementsByClassName("sizeSelect");
    TotalPrice[0].innerHTML="0원";
    ColorSelect[0].selected=true;
    SizeSelect[0].selected=true;

    switch (ItemIndex) {
      case 1:
          ItemPrice.innerHTML=45000+'원';
          itemName.innerHTML="부들부들 핑크패딩";
          break;
      case 2:
          ItemPrice.innerHTML=30000+'원';
          itemName.innerHTML="스노우 코트";
          break;
      case 3:
          ItemPrice.innerHTML=27000+'원';
          itemName.innerHTML="뽀글이 풀 집업";
            break;
      case 4:
          ItemPrice.innerHTML=35700+'원';
          itemName.innerHTML="초겨울 니트 세트";
          break;
      case 5:
          ItemPrice.innerHTML=33800+'원';
          itemName.innerHTML="베이스볼 롱후리스";
          break;
      case 6:
          ItemPrice.innerHTML=28500+'원';
          itemName.innerHTML="데일리 세일라방";
            break;
      case 7:
          ItemPrice.innerHTML=31500+'원';
          itemName.innerHTML="스노우 아노락&팬츠";
          break;
      case 8:
          ItemPrice.innerHTML=27000+'원';
          itemName.innerHTML="뽀글이밑단 청바지 (수입)";
          break;
      case 9:
          ItemPrice.innerHTML=8000+'원';
          itemName.innerHTML="얼룩무늬 빈티지 양말";
            break;
      case 10:
          ItemPrice.innerHTML=56000+'원';
          itemName.innerHTML="하트누빔케이프 롱패딩";
          break;
      case 11:
          ItemPrice.innerHTML=49500+'원';
          itemName.innerHTML="미니멜 후드 롱패딩";
          break;
      case 12:
          ItemPrice.innerHTML=37800+'원';
          itemName.innerHTML="반넥폴라 부클티";
            break;
      case 13:
          ItemPrice.innerHTML=27200+'원';
          itemName.innerHTML="아기 털신발 아이보리&베이지";
          break;
      case 14:
          ItemPrice.innerHTML=31500+'원';
          itemName.innerHTML="아동 주니어 양특기모 상하복";
          break;
      case 15:
          ItemPrice.innerHTML=28000+'원';
          itemName.innerHTML="하나비아 겨울신상";
            break;
      default:
        ItemPrice.innerHTML=100+'원';
      }
  }
  function Exit() //page2와 screenfecne를 제거한다
  {
    var screenFence=document.getElementsByClassName("screenfence");
    var Page2=document.getElementsByClassName("page2");
    var topright=document.getElementsByClassName("top_right");
    screenFence[0].style.visibility="hidden"; //screenFence제거
    Page2[0].style.visibility="hidden";  //screenFence위에 Page2제거
    topright[0].style.display="block";  //상단 submenu다시 보이게
  }

  String.prototype.replaceAt=function(index, character) { //문자열의 특정위치의 문자를, 입력 문자로 대체해주는 함수
    if(index>=0){ //index가 양수인 경우
      return this.substr(0, index) + character + this.substr(index+1);
    }
    else { //index가 음수인경우
      return this.substr(0,this.length+index)+character+this.substr(this.length+index+1);
    }
  }
