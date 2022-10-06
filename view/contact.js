const nextBtns = document.querySelectorAll(".btn-next");

function validation()
{
    var msg = document.getElementById('msg').value;
    var name = document.getElementById('name').value;
    var mail = document.getElementById('mail').value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(msg == ""){
        document.getElementById('fnameError').innerHTML ="Please fill the first name field";
        return false;
    }
    if((msg.length <= 2) || (fname.length > 200)) {
        document.getElementById('msgError').innerHTML ="The max length is 200";
        return false;
    }
    if(name == ""){
        document.getElementById('nameError').innerHTML ="Please fill the name field";
        return false;
    }
    if((name.length <= 2) || (name.length > 20)) {
        document.getElementById('nameError').innerHTML ="The max length is 20";
        return false;
    }
    if (mail.value.match(validRegex)) 
    {
        return true;
    } 
    else 
    {
        document.getElementById('mailError').innerHTML ="Email is not correct";
        return false;
    }

}