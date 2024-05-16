

async function expense(event){
    try{
   event.preventDefault();
   console.log('expense.js')
   const token=localStorage.getItem('token');

   
   console.log(token,'addtoken')
        let product={
            amount:document.getElementById('amount').value,
            description:document.getElementById('description').value,
            category:document.getElementById('category').value
         }
     const expense=await axios.post('http://3.82.59.114:3000/expense/addexpense',product,{headers:{"Authorization":token}})
        

              console.log(expense);
              showexpenseonUI(expense.data)
        }
    
    catch(err){
        console.log(err)
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }
}
     
window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const token=localStorage.getItem('token');
        console.log(token)
        
     

        const  objUrlParams=new URLSearchParams(window.location.search);

        const  page=localStorage.getItem('page');

        const noofrows=localStorage.getItem('noofrows')

        console.log(noofrows)

        console.log(page);

        console.log('current page',page)

       const product=await axios.get(`http://3.82.59.114:3000/expense/getexpense?page=${page}&noofrows=${noofrows}`,{headers:{"Authorization":token}})
           
             console.log(product);
            
            isPremiumUser(product.data.premium);
            
            showOnScreen(product.data.expense);
             
             pagination(product.data.pagedata);
            }
            catch(err){
                console.log('err has been in get expense block' ,err)
                document.body.innerHTML+=`<div style="color:red;">${err}</div>`
            }     
            })


const paginationcontainer=document.querySelector('.pagination');
function pagination({
  currentPage,
  prevPage,
  hasnextPage ,
  nextPage,
  hasPrevPage,
 lastPage
}){

 
console.log(lastPage,hasPrevPage,hasnextPage,currentPage,prevPage,nextPage)
 

     //previouspagebtn

     paginationcontainer.innerHTML='';

     //choose number of rows:

     if(hasPrevPage){
       const btn2=document.createElement('button');
      
       btn2.innerHTML=prevPage;
       btn2.addEventListener('click',()=>getproducts(prevPage));
       paginationcontainer.appendChild(btn2)

     }

     const btn1=document.createElement('button');
       btn1.innerHTML=currentPage;
       btn1.addEventListener('click',()=>getproducts(currentPage));
       btn1.classList.add('active');
       paginationcontainer.appendChild(btn1)
       localStorage.setItem('page',`${currentPage}`)

    

   
    

    if(hasnextPage){
      const btn3=document.createElement('button');
       btn3.innerHTML=nextPage;
       btn3.addEventListener('click',()=>getproducts(nextPage));
       paginationcontainer.appendChild(btn3)
    }

     //presentpagebtn


     //nextpagebtn
}            
 
const pageSizeSelect = document.getElementById('pageSizeSelect');

console.log(pageSizeSelect);

pageSizeSelect.addEventListener('change', ()=>{

        console.log(pageSizeSelect.value)

         localStorage.setItem('noofrows',pageSizeSelect.value)

         window.location.href = window.location.href;

});

function getproducts(page){
  const token=localStorage.getItem('token');

  axios.get(`http://3.82.59.114:3000/expense/getexpense?page=${page}`,{headers:{"Authorization":token}})
  .then(response=>{

   
      showOnScreen(response.data.expense)

  

//showOnScreen(response.data.expense);

    //console.log(response.data.pagedata)

    pagination(response.data.pagedata)
  })
 .catch(err=>{
  console.log(err)

 })
  
}
function showexpenseonUI(product){

  const listofitems=document.querySelector('.listofitems')
  const expensecard=document.createElement('div')
    
  expensecard.classList.add('card');
  expensecard.setAttribute('id',`${product.id}`)
  expensecard.innerHTML=`
  <div>amount:${product.amount}</div>
  <div>category:${product.category}</div>
  <div>description:${product.description}</div>
  <button class='btn' onClick=deleteProduct(${product.id})>Delete</button>`
  listofitems.appendChild(expensecard)

}
  
function showOnScreen(product){


  //console.log(product);


const listofitems=document.querySelector('.listofitems')

listofitems.innerHTML='';


  product.forEach(product=>{

  const expensecard=document.createElement('div')
    
  expensecard.classList.add('card');
  expensecard.setAttribute('id',`${product.id}`)
  expensecard.innerHTML=`
  <div>amount:${product.amount}</div>
  <div>category:${product.category}</div>
  <div>description:${product.description}</div>
  <button class='btn' onClick=deleteProduct(${product.id})>Delete</button>`
  listofitems.appendChild(expensecard)

})


  
}
   
async function deleteProduct(id){
   try{
     //console.log(id);
     const token=localStorage.getItem('token');
   const product=await axios.delete(`http://3.82.59.114:3000/expense/delete-expense/${id}`,{headers:{"Authorization":token}})
         //console.log(product)
         //console.log(product.id)
         removeFromScreen(product.data.id);
         //console.log('product deleted');
   }
     catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
                // console.log("there is a error in delete product",err)
 }
}



function removeFromScreen(id){
 let parentNode=document.querySelector('.listofitems')
 let nodetobedeleted=document.getElementById(`${id}`)
 if(nodetobedeleted){
     parentNode.removeChild(nodetobedeleted);
 }
}

function isPremiumUser(premium){
    const premiumbtn=document.getElementById('rzpbtn');
    const premiumclass=document.querySelector('.premiumbtn');

  if(premium){
           //disable button
           premiumbtn.style.display='none'
           premiumclass.innerHTML=`Your a premium user<button onclick=leaderboard(event) id='leaderboardbtn' class='btn'>Leaderboard</button><button onclick='expensereport(event)' id='expensereport' class='btn'>Show Report</button>`
           
           

  }
  else{
    premiumbtn.style.display='block'
       //enable button
  }
}


document.getElementById('rzpbtn').onclick=async (e)=>{
      
    const token=localStorage.getItem('token');
    //console.log('raxorpay')

  const response=await axios.get('http://3.82.59.114:3000/purchase/gopremiumuser',{headers:{'Authorization':token}})

 // console.log(response.data.order.id)
   
          var options={
            "key":response.data.key_id,
            'amount':response.data.order.amount,
            "orderid":response.data.order.id,
            "handler":async function(response){
                await axios.post('http://3.82.59.114:3000/purchase/updatepremiumuser',{
                        order_id:options.orderid,
                        payment_id:response.razorpay_payment_id
                },{
                    headers:{'Authorization':token}
                }).then((response)=>{
                    console.log(response);
                    //let make button disable and and he is premium user

                    
                    alert('payment is successful ')
                    isPremiumUser(true)
                    document.getElementById('rzpbtn').style.display='none'
                })
            }
          }
          const rzp1=new Razorpay(options);
          rzp1.open();
          e.preventDefault();
       
          rzp1.on('payment.failed',async function (response){ 
            //console.log(response);
            await axios.post('http://3.82.59.114:3000/purchase/updatepremiumuser',{
                order_id:options.orderid,
                payment_id:response.razorpay_payment_id
        },{
            headers:{'Authorization':token}
        }).then(response=>{

            alert("This step of Payment Failed"); 
            isPremiumUser(false)
        })
           
      }); 
}


function leaderboard(event){
 // console.log('leadeeboard')

  const token=localStorage.getItem('token');

const leadeeboardbtn=document.getElementById('leaderboardbtn')

const leaderboardcontainer=document.querySelector('.leaderboard-container');

leaderboardcontainer.classList.add('block');


axios.get('http://3.82.59.114:3000/premium/leaderboard',{headers:{'Authorization':token}}).then(res=>{
          const listofexpenses=document.getElementById('listofexpenses')
          leadeeboardbtn.style.display='none'
        // console.log(res)
          res.data.forEach(response=>{
            
                   listofexpenses.innerHTML+=`<li> name:${response.username} total_amount:${response.totalExpense}</li>`
              
          })
         
})
.catch(err=>{
  console.log(err)
})

}

function expensereport(event){

  const token=localStorage.getItem('token');


  //console.log('hello');

  axios.get('http://3.82.59.114:3000/premium/expensereport',{headers:{'Authorization':token}})
  .then((response)=>{

             //let say i got expense report data in array with each having date name category total amount etc
             //then i need to add to table using js for each method

             if(response.status==200){

              console.log(response.data.fileURL)


              const fileURL=response.data.fileurls;
              //console.log(fileURL);

              //table creation
              
             const divtable=document.querySelector('.table-container')

              const table=document.createElement('table');

              table.classList.add('addclasstbalehere');
              table.innerHTML=`<tr>
          <th>Date</th>
          <th>amount</th>
          <th>category</th>
          <th>description</th>
        </tr>`

         response.data.expensereport.forEach(data=>{
          
          const newRow = document.createElement('tr');

          // Populate cells with data
          newRow.innerHTML = `
              <td>${data.date}</td>
              
              <td>${data.amount}</td>
              <td>${data.category}</td>
              
              <td>${data.description}</td>
          `;

          // Append the new row to the table body
          table.appendChild(newRow);
        // `<tr>
        //   <td>${data.username}</td>
        //   <td>${data.amount}</td>
        //   <td></td>
        // </tr>`
         })     
           
          
       divtable.appendChild(table);
       const downloadreportbtn=document.createElement('button');

       downloadreportbtn.innerText='Download report'

       downloadreportbtn.classList.add('btn');

       downloadreportbtn.setAttribute('id','downloadreportbtn');
       divtable.appendChild(downloadreportbtn);

       //const downloadreport=document.getElementById('downloadreportbtn');

downloadreportbtn.addEventListener('click',async()=>{

  //date    on expense click here to download

  //
  const fileurls_container=document.querySelector('.fileurls-container')

  //console.log(fileURL);
  fileURL.forEach(data=>{
    var li=document.createElement('li')
    var a = document.createElement("a");
    a.href = data.urls;
    a.innerHTML=`${data.urls}`
    li.appendChild(a)
    fileurls_container.appendChild(li)
  })
  
 

//  axios.get('http://3.82.59.114:3000/premium/downloadreport',{headers:{''})

})
       
  }
})
  .catch(err=>{
    console.log(err)
  })

 // console.log('when its clicks report butn i should show a table with date and its expenses of that user')
}

