

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
     const expense=await axios.post('http://localhost:3000/expense/addexpense',product,{headers:{"Authorization":token}})
        

              console.log(expense);
              showOnScreen(expense.data)
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
       const product=await axios.get('http://localhost:3000/expense/getexpense',{headers:{"Authorization":token}})
           
             console.log(product)
             isPremiumUser(product.data.premium);
             for(let i=0;i<product.data.expense.length;i++){
                 showOnScreen(product.data.expense[i])
             }
            }
            catch(err){
                console.log('err has been in get expense block' ,err)
                document.body.innerHTML+=`<div style="color:red;">${err}</div>`
            }     
            })
          
 
  
function showOnScreen(product){
   console.log(product);
     const parentNode=document.querySelector('.listofitems')
   console.log(parentNode);
     const expensecard=document.createElement('div')
     expensecard.classList.add('card');
     expensecard.setAttribute('id',`${product.id}`)
     expensecard.innerHTML=`
     <div>amount:${product.amount}</div>
     <div>category:${product.category}</div>
     <div>description:${product.description}</div>
     <button class='btn' onClick=deleteProduct(${product.id})>Delete</button>`
     parentNode.appendChild(expensecard)

}
   
async function deleteProduct(id){
   try{
     console.log(id);
     const token=localStorage.getItem('token');
   const product=await axios.delete(`http://localhost:3000/expense/delete-expense/${id}`,{headers:{"Authorization":token}})
         console.log(product)
         console.log(product.id)
         removeFromScreen(product.data.id);
         console.log('product deleted');
   }
     catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
                 console.log("there is a error in delete product",err)
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
    console.log('raxorpay')

  const response=await axios.get('http://localhost:3000/purchase/gopremiumuser',{headers:{'Authorization':token}})

  console.log(response.data.order.id)
   
          var options={
            "key":response.data.key_id,
            'amount':response.data.order.amount,
            "orderid":response.data.order.id,
            "handler":async function(response){
                await axios.post('http://localhost:3000/purchase/updatepremiumuser',{
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
            console.log(response);
            await axios.post('http://localhost:3000/purchase/updatepremiumuser',{
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
  console.log('leadeeboard')

  const token=localStorage.getItem('token');

const leadeeboardbtn=document.getElementById('leaderboardbtn')

const leaderboardcontainer=document.querySelector('.leaderboard-container');

leaderboardcontainer.classList.add('block');


axios.get('http://localhost:3000/premium/leaderboard',{headers:{'Authorization':token}}).then(res=>{
          const listofexpenses=document.getElementById('listofexpenses')
          leadeeboardbtn.style.display='none'
         console.log(res)
          res.data.forEach(response=>{
            
                   listofexpenses.innerHTML+=`<li> name:${response.username} total_amount:${response.totalExpense}</li>`
              
          })
         
})
.catch(err=>{
  console.log(err)
})

}

function expensereport(event){

  const token=localStorage.getItem('token')


  console.log('hello');

  axios.get('http://localhost:3000/premium/expensereport',{headers:{'Authorization':token}})
  .then((response)=>{

             //let say i got expense report data in array with each having date name category total amount etc
             //then i need to add to table using js for each method

             if(response.status==200){


              const fileURL=response.data.fileURL;
              console.log(fileURL);

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

downloadreportbtn.addEventListener('click',()=>{

  var a = document.createElement("a");
  a.href = response.data.fileURL;
  a.download = 'myexpense.csv';
  a.click();

//  axios.get('http://localhost:3000/premium/downloadreport',{headers:{''})

})
       
  }
})
  .catch(err=>{
    console.log(err)
  })

  console.log('when its clicks report butn i should show a table with date and its expenses of that user')
}

