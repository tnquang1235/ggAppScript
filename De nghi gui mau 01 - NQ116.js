function sayHello(){
      alert("Hello world!")
  }

  //PREVENT FORMS FROM SUBMITTING / PREVENT DEFAULT BEHAVIOUR
  function preventFormSubmit() {
    var forms = document.querySelectorAll('form');
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
      });
    }
  }
  window.addEventListener("load", preventFormSubmit, true); 
  
  //HANDLE FORM SUBMISSION
  function handleFormSubmit(formObject) {
    google.script.run.withSuccessHandler(createTable).processForm(formObject);
    //document.getElementById("search-form").reset();
    var div = document.getElementById('notify');
    div.innerHTML = "Đang xử lý!";
  }

  //CREATE THE DATA TABLE
  function createTable(dataArray) {
    var div = document.getElementById('notify');
    if(dataArray && dataArray !== undefined && dataArray.length != 0){
      if(dataArray == "errorMaDV"){
        div.innerHTML = "Sai mã đơn vị!";
      } else {
        var resultTab = document.getElementById('result-tab');
        var step1 = document.getElementById('step1');
        var step2 = document.getElementById('step2');
        var result = "<table class='table table-hover table-bordered dt-responsive' id='dtable' style='width:100%'>"+
                    "<thead class='thead-light' style='white-space: nowrap'>"+
                      "<tr>"+                               //Change table headings to match witht he Google Sheet
                        "<th scope='col'>Mã đơn vị</th>"+
                        "<th scope='col'>Email liên hệ</th>"+
                      "</tr>"+
                    "</thead>";
        result += "<tr>";
        result += "<td id='maDV'>"+dataArray[0][0]+"</td>";
        result += "<td id='emailDV'>"+dataArray[0][1]+"</td>";
        result += "</tr>";
        result += "</table>";
        resultTab.innerHTML = result;
        step1.style.display = "none";
        step2.style.display = "block";
      }
    }else{
      div.innerHTML = "Không tìm thấy dữ liệu!";
    }
  }

  function selectTrue(){
    var step3 = document.getElementById('step3');
    var step4 = document.getElementById('step4');
    step3.style.display = "none";
    step4.style.display = "block";
  }

  function selectFalse(){
    var step3 = document.getElementById('step3');
    var step4 = document.getElementById('step4');
    step4.style.display = "none";
    step3.style.display = "block";
  }
  
  function inputHS604(){
    var hs604 = document.getElementById('hs604').value;
    var step4 = document.getElementById('step4');
    step4.style.display = "block";
  }

  function writeSheet(overwrite){
    var maDV = document.getElementById('maDV').innerHTML
    var emailDV = document.getElementById('emailDV').innerHTML
    var emailTrue = document.getElementById('emailTrue').checked
    var hs604 = document.getElementById('hs604').value
    google.script.run.withSuccessHandler(respondApp).writeToSheet({val: maDV, val2: emailDV, val3: emailTrue, val4: hs604}, overwrite)
  }

  function submit(){
    writeSheet(false)
  }
  
  // function respondApp(returnValue){
  //   // if(returnValue == :"?overwrite"){
  //   //   if(confirm("Mã đơn vị đã được đề nghị gửi email! Bạn muốn đề nghị lại?"){
  //   //     writeSheet(true)
  //   //   }
  //   // } else{
  //   //   alert("Đã đề nghị thành công!")
  //   // }
  // }
