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
             for(let i=0;i<product.data.length;i++){
                 showOnScreen(product.data[i])
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


document.getElementById('rzpbtn').onclick=async ()=>{

        

}