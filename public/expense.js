

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
           premiumclass.innerHTML=`Your a premium user<button onclick=leaderboard(event) id='leaderboardbtn' class='btn'>Leaderboard</button>`
           
           

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
         
          res.data.forEach(response=>{
            
                   listofexpenses.innerHTML+=`<li> name:${response.name} total_amount:${response.total_amount}</li>`
              
          })
         
})
.catch(err=>{
  console.log(err)
})

}