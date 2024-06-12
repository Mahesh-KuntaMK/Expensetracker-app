


async function login(event){
try{

    event.preventDefault()
    //console.log('hello')

    
    const userdata={
        email:event.target.email.value,
        password:event.target.password.value
    }

    //console.log(userdata);
    const response =await axios.post('http://localhost:3000/user/login',userdata)

    console.log(response);
    console.log(response.data)

   if(response.status===201){
         alert('login successful');
         //console.log('yep id excuted fter alert')
         localStorage.setItem('page',1);
         localStorage.setItem('token',response.data.token)
         localStorage.setItem('noofrows',5)
         window.location.href='/expense'

   }
   else{
    
    console.log('hello')
    console.log(response.status)
    //  errorpage(response.status);
   }

}
catch(err){
 
    errorpage(err.response.status);

    

}


}
function createaccount(event){
    event.preventDefault();
    
    
    
        window.location.href='/user/createaccount'
    


}

function errorpage(statuscode){
      

    const error_page=document.getElementById('error-page-container');
    console.log(error_page)

    error_page.style.display='block';
    const error_h4=document.getElementById('error');
    error_h4.innerHTML="";
    if(statuscode==401){
    error_h4.innerHTML='Password does not match try again :)'
    }
    else if(statuscode==400){
         error_h4.innerHTML='The parameters are not entered correctly (:';
    }
    else {
         error_h4.innerHTML='The Email does not exit!'

    }
}