async function signup(event){
    try{
    event.preventDefault();
    console.log('hello')
    const userdata={
        username:event.target.username.value,
        email:event.target.email.value,
        password:event.target.password.value
    }
    console.log(userdata);
 const  signupdata=await axios.post('http://localhost:3000/user/signup',userdata)

     if(signupdata.status===201){
        window.location.href='/user/loginpage'
     }
     else{
        throw new Error(err);;
     }
    }
    catch(err){
        document.body.innerHTML+=`<div style="color:red;">${err}</div>`
    }

}
