async function forgotpassword(event){
    event.preventDefault();


const email=event.target.email.value

console.log(email);
 const response=await axios.post('http://localhost:3000/password/forgotpassword',{email})

if(response.status==200){
    alert('reset link was sent successfully')
    window.location.href='/user/login'
}



}
