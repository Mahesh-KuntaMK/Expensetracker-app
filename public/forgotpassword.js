async function forgotpassword(event){
    event.preventDefault();


const email=event.target.email.value

console.log(email);
 const response=await axios.post('http://localhost:3000/password/forgotpassword',{email})


 console.log(response.data);



}
