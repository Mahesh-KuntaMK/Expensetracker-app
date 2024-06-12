async function signup(event){
    try{
    event.preventDefault();
   // console.log('hello')
    const userdata={
        username:event.target.username.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    //console.log(userdata);
 const  signupdata=await axios.post('http://54.89.10.176:3000/user/signup',userdata)

     if(signupdata.status===201){
        alert('your account created succussfully login this credentials')
        window.location.href='/'
     }
    
     else
       throw new Error(err)
        
     
    }
    catch(err){
       errorpage(err)
    }




}
function loginhere(event){
    event.preventDefault();
    
    
    
        window.location.href='/'
  

}
function errorpage(err){
    const error_page=document.getElementById('error-page-container');
    //console.log(error_page)

    error_page.style.display='block';
        const error_h4=document.getElementById('error');
    error_h4.innerHTML="";
    error_h4.innerHTML='The entered email already exited'
}


// const page=+req.query.page||1;

// const ITEMS_PER_PAGE=10;

// const expense=await Expense.findAll({
//     where:{userId:req.user.id},
//     offset:(page-1)*ITEMS_PER_PAGE,
//     limit:ITEMS_PER_PAGE
// });

// const pagedata={
   
//         currentPage:page,
//         prevPage:page-1,
//       //  hasnextPage: ITEMS_PER_PAGE*page<totalitems,
//         nextPage:page+1,
//         hasPrevPage:page>1,
//         //:Math.ceil(totalitems/ITEMS_PER_PAGE)
      
// }


//   res.json({expense,premium:req.user.isPremiumUser,pagedata});
// }
// catch(err){
// console.log(err)
// }
