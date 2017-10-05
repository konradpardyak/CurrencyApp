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
      }
    }
  }

  class Transactions{
    add(){
      let sub = document.querySelector("input[name='add']");
      let self = this;

      sub.addEventListener("click", function(event){
        event.preventDefault();
        let name = document.querySelector("input[name='name']");
        let amount = document.querySelector("input[name='amount']");
        if(name.value!="" && amount.value!=""){
          self.addToList(name.value, amount.value);
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
      });
    }
    refresh(newValue){
      let listElementsUSD = document.querySelectorAll(".transactionList .liUSD");
      let listElementsEUR = document.querySelectorAll(".transactionList .liEUR");
      let listLength = listElementsUSD.length;
      for(let i=0; i<listLength; i++){
        listElementsEUR[i].innerText = ((newValue*Math.floor(parseFloat(listElementsUSD[i].innerText)*100))/10000).toFixed(2) + "EUR";
      }
    }
  }

  let exchange = new Exchange();
  let transactions = new Transactions();

  transactions.add();
  exchange.watch();

});
