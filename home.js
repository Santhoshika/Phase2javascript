function myFunction(){

    var input, filter, ul, li, a, i, txtValue;
     input = document.getElementById('myInput');
     filter = input.value.toUpperCase();
     console.log("filter valus is" , filter);
     console.log("srach is entered");
     li = document.getElementsByTagName('span')
     
   
     //LOOP through all list items 
   
     for (i=0; i < li.length ; i++)
     {
       a=  li[i].innerText || li[i].innerHTML
       console.log("value of text", a);
       console.log(typeof a);
       if(a.toUpperCase().indexOf(filter) > -1){
           
           li[i].style.display="block"
   
       }
       else{
           li[i].style.display = "none";
       }
     }
   
   
    
   }
   
   
   //declare all products in cart 
   
   let products = [{
   
       name:"Brinjal",
       tag:"Vege1",
       price:15,
       incart:0
   },

   {
   
    name:"Cauliflower",
    tag:"vege2",
    price:10,
    incart:0
},

{
   
    name:"carrot",
    tag:"Vege3",
    price:15,
    incart:0
},

{
   
    name:"Tomato",
    tag:"Vege4",
    price:25,
    incart:0
},
   {
   
   
       name:"lemon",
       tag:"vege5",
       price:25,
       incart:0

       
   }]
   
   //working on add cart 
   let cart= document.getElementsByClassName("addcart");
   for(let i = 0 ; i <cart.length;i++){
       cart[i].addEventListener("click",function(){
           console.log("you clicked");
           cartnumbers(products[i]);
           totalcost(products[i]);
       })
   
   }
   
   
   
   function onloadcartnumbers(){
       let productnumbers =localStorage.getItem('cartnumbers');
       if(productnumbers){
           document.querySelector('.cart span').textContent = productnumbers;
       }
   }
   function cartnumbers(product){
     
       let productnumbers = localStorage.getItem('cartnumbers');
       
       productnumbers =parseInt(productnumbers);
   
       if(productnumbers){
           localStorage.setItem('cartnumbers',productnumbers+1);
           document.querySelector('.cart span').textContent = productnumbers + 1;
       }
       
       else{
           localStorage.setItem('cartnumbers' ,1);
           document.querySelector('.cart span').textContent = 1;
       }
   
      setItems(product);
     }
   
   function setItems(product){
     let cartitems = localStorage.getItem("productsincart");
     cartitems =JSON.parse(cartitems);
    
     if(cartitems != null){
         if(cartitems[product.tag] == undefined){
          cartitems = {
               ...cartitems,
               [product.tag] :product
   
           }
         }
         cartitems[product.tag].incart += 1;
      }
      else{
       product.incart =1;
       cartitems = {
        [product.tag]:product
       }
   
      }
     localStorage.setItem("productsincart" ,JSON.stringify(cartitems));
   }
   
   //total cost 
   
   function totalcost(product){
   
       let cartcost = localStorage.getItem("totalcost");
      
       if(cartcost != null){
           cartcost = parseInt(cartcost);
           localStorage.setItem("totalcost" , cartcost+product.price);
       }
   
           else{
   
               localStorage.setItem("totalcost" , product.price);
           } 
   
   
   
   }
   
   //Clear items in cart 
   let clearcart = document.getElementsByClassName('clear');
   
   for(let i = 0 ; i <clearcart.length;i++){
       clearcart[i].addEventListener("click",function(){
           clearcart1();
           
       })
   
   }
   
   function clearcart1()
   {
       let cost = 0 ;
       let clear = localStorage.getItem('cartnumbers');
       let c1 = localStorage.getItem('totalcost');
       //console.log("console log" , c1);
       let c2 = localStorage.setItem('totalcost' , cost);
       //console.log("console log" , c2);
       clear = parseInt(clear);
       //console.log(clear);
       let cc = localStorage.setItem('cartnumbers' , 0)
       //console.log(cc);
       document.querySelector('.cart span').textContent = 0 ;
       //get products in cart 
       let cartitems = localStorage.getItem("productsincart");
       localStorage.removeItem("productsincart");
     
      
   
   }
   
   
   function displaycart(){
   
       let cartitems = localStorage.getItem("productsincart");
       cartitems = JSON.parse(cartitems)
       console.log(cartitems);
       let productcontainer = document.querySelector(".products");
       let cartcost = localStorage.getItem("totalcost");
      if(cartitems && productcontainer){
         productcontainer.innerHTML='';
         Object.values(cartitems).map(item =>{
          
            var table = document.getElementById("cartTable");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = item.name;
    cell2.innerHTML = item.price;
   cell3.innerHTML = item.incart;
    cell4.innerHTML = item.incart * item.price;
  
             productcontainer.innerHTML += `
     
             <!--
             <div class="product">
             <span>${item.name}</span>
             </div>
   
             <div class="price">
             <span>${item.price}</span>
             </div>
   
             <div class="qty">
             <span>${item.incart}</span>
             </div>
             <div class="total">
             $${item.incart * item.price} ,00
             </div> -->
             `;
  
         });
  
  
          var table = document.getElementById("cartTable");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "";
    cell2.innerHTML = "";
   cell3.innerHTML = "Basket Total($)";
    cell4.innerHTML = cartcost,00;
        
   
   /**
         productcontainer.innerHTML +=`
         <div class="baskettotalconatiner">
         <h4 class="basketballtotal">Basket Total</h4>
         <h4 class="basketballtotal">$${cartcost},00</h4>
         </div>
         `;
  **/
      }
   
   }
   
   function checkout(){
       var checkout = document.getElementsByClassName("Checkout");
       for (let i = 0 ; i<checkout.length;i++){
           checkout[i].addEventListener("click" , function(){
               console.log("checkout is been clicked");
               window.location.href="checkout.html"
           })
       }
   }
   

   
   
   onloadcartnumbers();
   displaycart();
   checkout();
  
   