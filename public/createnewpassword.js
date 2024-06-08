function createnewpassword(event){

    event.preventDefault();


    console.log(event.target.password.value);
    
    axios.post('http://34.207.229.200:3000/password/updatepassword')
    .then((response)=>{

        //console.log(response.data);

    })
    .catch(err=>{
        console.log(err)
    })
}