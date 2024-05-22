async function login(event){


try{

    event.preventDefault()
    //console.log('hello')
    const userdata={
        email:event.target.email.value,
        password:event.target.password.value
    }

    //console.log(userdata);
    const response =await axios.post('http://3.82.4.129:3000/user/login',userdata)

   if(response.status===201){
         alert('login successful');
         //console.log('yep id excuted fter alert')
         localStorage.setItem('page',1);
         localStorage.setItem('token',response.data.token)
         localStorage.setItem('noofrows',5)
         window.location.href='/expense'

   }
   else{
    throw  new Error(err)
   }
}
catch(err){
    document.body.innerHTML+=`<div style="color:red;">${err}</div>`
}
}
const button = document.getElementById("forgotpasswordbtn");

button.addEventListener("click", (event) => {
    event.preventDefault();
    //console.log('forgotbtn')

    window.location.href='/password/forgotpassword'
})