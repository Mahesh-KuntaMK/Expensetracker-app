async function login(event){


try{

    event.preventDefault()
    console.log('hello')
    const userdata={
        email:event.target.email.value,
        password:event.target.password.value
    }

    console.log(userdata);
    const response =await axios.post('http://localhost:3000/user/login',userdata)

   if(response.status===201){
         alert('login successful');
         console.log('yep id excuted fter alert')
         localStorage.setItem('token',response.data.token)
         window.location.href='/expense'

   }
   else{
    throw new Error(err)
   }
}
catch(err){
    document.body.innerHTML+=`<div style="color:red;">${err}</div>`
}
}