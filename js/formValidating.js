function formValidation() {
    document.getElementById('error').setAttribute('hidden');
    let form            = document.getElementsByTagName("form").item(0);
    let firstName       = form.elements.item(0).value;
    let lastName        = form.elements.item(1).value;
    let school          = form.elements.item(2).value;
    let paretnPhone     = form.elements.item(3).value;
    let phone           = form.elements.item(4).value;
    let ID              = form.elements.item(5).value;
    let schoolClass     = form.elements.item(6).value;
    if (firstName == "" || lastName == "" || school == "" || paretnPhone == "" || phone == "" || ID == "" || schoolClass == "") {
        document.getElementById('error').removeAttribute('hidden');
        return false;
    }
    if (parseInt(paretnPhone).length != 10 || parseInt(phone).length != 10) {
        document.getElementById('error1').removeAttribute('hidden');
        return false;
    }
    return true;
}
