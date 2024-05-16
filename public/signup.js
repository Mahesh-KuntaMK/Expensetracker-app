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
 const  signupdata=await axios.post('http://3.82.59.114:3000/user/signup',userdata)

     if(signupdata.status===201){
        window.location.href='/user/loginpage'
     }
     else{
        //console.log(signupdata);

        throw new Error(err);;
     }
    }
    catch(err){
        
        document.body.innerHTML+=`<div style="color:red;">${err.msg}</div>`
    }

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
