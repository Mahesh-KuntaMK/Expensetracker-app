async function forgotpassword(event){
    event.preventDefault();


const email=event.target.email.value

//console.log(email);
 const response=await axios.post('http://54.89.10.176:3000/password/forgotpassword',{email})

if(response.status==200){
    alert('reset link was sent successfully')
    window.location.href='/'
}



}
