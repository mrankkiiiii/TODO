// Category color 
let allList = document.getElementsByClassName('container');
for(let i=0; i<allList.length; i++){
    // setting the background color as per the category
      console.log(allList[i].querySelector(".category-tab").innerText);
      if(allList[i].querySelector(".category-tab").innerText == "Personal"){
          allList[i].querySelector(".category-tab").style.backgroundColor = "rgb(247, 132, 0)";
      }
      if(allList[i].querySelector(".category-tab").innerText == "Work"){
          allList[i].querySelector(".category-tab").style.backgroundColor = "rgb(202, 86, 131)";
      }
      if(allList[i].querySelector(".category-tab").innerText == "School"){
          allList[i].querySelector(".category-tab").style.backgroundColor = "rgb(18, 155, 102)";
      }
      if(allList[i].querySelector(".category-tab").innerText == "Meeting"){
          allList[i].querySelector(".category-tab").style.backgroundColor = "rgb(211, 211, 129)";
      }
      if(allList[i].querySelector(".category-tab").innerText == "Other"){
          allList[i].querySelector(".category-tab").style.backgroundColor = "rgb(104, 161, 161)";
      }
  }