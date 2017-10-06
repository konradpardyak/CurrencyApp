document.addEventListener("DOMContentLoaded", function(){

  class Exchange{
    constructor(){
      this.value = 85;
    }
    watch(){
      let exInput = document.querySelector("#exchange input");
      exInput.onkeyup = ()=>{
        if(exInput.value == ""){
          this.value = 85;
        } else {
          this.value = Math.floor(parseFloat(exInput.value)*100);
        }
        transactions.refresh(this.value);
        impTransaction.show();
      }
    }
  }

  class Transactions{
    add(){
      let sub = document.querySelector("input[name='add']");

      sub.addEventListener("click", (event)=>{
        event.preventDefault();
        let name = document.querySelector("input[name='name']");
        let amount = document.querySelector("input[name='amount']");
        if(name.value!="" && amount.value!=""){
          this.addToList(name.value, amount.value);
          name.value = "";
          amount.value = "";
        }
      });
    }
    addToList(name, amount){
      let ul = document.querySelector(".transactionList ul");
      let li = document.createElement("li");
      let spanName = document.createElement("span");
      spanName.classList.add("liName");
      spanName.innerText = name;
      let spanUSD = document.createElement("span");
      spanUSD.classList.add("liUSD");
      spanUSD.innerText = (parseFloat(amount)).toFixed(2) + "USD";
      let spanEUR = document.createElement("span");
      spanEUR.classList.add("liEUR");
      spanEUR.innerText = ((Math.floor(parseFloat(amount)*100)*exchange.value)/10000).toFixed(2) + "EUR";
      let button = document.createElement("button");
      button.innerText = "-";

      li.appendChild(spanName);
      li.appendChild(spanUSD);
      li.appendChild(spanEUR);
      li.appendChild(button);
      ul.appendChild(li);

      let listElementsLi = document.querySelectorAll(".transactionList li");
      let newLi = listElementsLi.length-1;
      button.addEventListener("click", function(){
        listElementsLi[newLi].parentNode.removeChild(listElementsLi[newLi]);
        sum.refresh();
        impTransaction.show();
      });
      sum.refresh();
      impTransaction.show();
    }
    refresh(newValue){
      let listElementsUSD = document.querySelectorAll(".transactionList .liUSD");
      let listElementsEUR = document.querySelectorAll(".transactionList .liEUR");
      let listLength = listElementsUSD.length;
      for(let i=0; i<listLength; i++){
        listElementsEUR[i].innerText = ((newValue*Math.floor(parseFloat(listElementsUSD[i].innerText)*100))/10000).toFixed(2) + "EUR";
      }
      sum.refresh();
    }
  }

  class Sum{
    refresh(){
      let listElementsUSD = document.querySelectorAll(".transactionList .liUSD");
      let listElementsEUR = document.querySelectorAll(".transactionList .liEUR");
      let listLength = listElementsUSD.length;
      let sumUSD = document.querySelector(".sum .sumUSD");
      let sumEUR = document.querySelector(".sum .sumEUR");
      let USD = 0;
      let EUR = 0;
      for(let i=0; i<listLength; i++){
        USD += (parseFloat(listElementsUSD[i].innerText))*100;
        EUR += (parseFloat(listElementsEUR[i].innerText))*100;
      }
      sumUSD.innerText = (USD/100).toFixed(2) + "USD";
      sumEUR.innerText = (EUR/100).toFixed(2) + "EUR";
    }
  }

  class ImpTransaction{
    show(){
      let listElementsUSD = document.querySelectorAll(".transactionList .liUSD");
      let listElementsEUR = document.querySelectorAll(".transactionList .liEUR");
      let listElementsName = document.querySelectorAll(".transactionList .liName");
      let topName = document.querySelector("#importantTransaction .topName");
      let topUSD = document.querySelector("#importantTransaction .topUSD");
      let topEUR = document.querySelector("#importantTransaction .topEUR");
      let listLength = listElementsUSD.length;
      let maxUSD = 0;
      let indexOfMaxI = 0;
      if(listLength > 0){
        for(let i=0; i<listLength; i++){
          if(parseFloat(listElementsUSD[i].innerText) > maxUSD){
            maxUSD = parseFloat(listElementsUSD[i].innerText);
            indexOfMaxI = i;
          }
        }
        topName.innerText = listElementsName[indexOfMaxI].innerText;
        topUSD.innerText = listElementsUSD[indexOfMaxI].innerText;
        topEUR.innerText = listElementsEUR[indexOfMaxI].innerText;
      } else {
        topName.innerText = "Add transaction to see";
        topUSD.innerText = "0USD";
        topEUR.innerText = "0EUR";
      }
    }
  }

  let exchange = new Exchange();
  let transactions = new Transactions();
  let sum = new Sum();
  let impTransaction = new ImpTransaction();

  transactions.add();
  exchange.watch();

});
