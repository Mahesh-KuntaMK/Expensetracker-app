function createnewpassword(event){

    event.preventDefault();


    console.log(event.target.password.value);
    
    axios.post('http://3.82.4.129:3000/password/updatepassword')
    .then((response)=>{

        //console.log(response.data);

    })
    .catch(err=>{
        console.log(err)
    })
}