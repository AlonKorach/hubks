function formValidation() {
    document.getElementById('error').setAttribute("hidden", "true");
    let form            = document.getElementsByTagName("form").item(0);
    let firstName       = form.elements.item(0).value;
    let lastName        = form.elements.item(1).value;
    let school          = form.elements.item(3).value;
    let phone           = form.elements.item(5).value;
    let paretnPhone     = form.elements.item(8).value;
    let ID              = form.elements.item(7).value;
    let schoolClass     = form.elements.item(2).value;
    let paretnName      = form.elements.item(6).value;
    let noSchool        = form.elements.item(8).value;
    if (firstName == "" || lastName == "" || (school == "" && noSchool != "nan") || paretnPhone == "" || phone == "" || ID == "" || schoolClass == "") {
       
        //  first name
        if (!nameValidation(firstName)) {
            if (!nameValidation(firstName, 1)){
                document.getElementById('error').innerText = "חסר שם:   ״לכל איש יש שם״ - חוה אלברשטיין. גם לנערים.";
            } else if (!nameValidation(firstName, 0)) {
                document.getElementById('error').innerText = "אות אחת: אצלנו לא חוסכים באותיות, פרגנו בכל השם.";
            } else if (!nameValidation(firstName, 2)) {
            document.getElementById('error').innerText = "תווים לא תקינים: ההורים שלך יצירתיים בשמות, לא חשבו על אותיות?";
        }
            document.getElementById('error').removeAttribute("hidden");
            return false;
        }
        
        // last name
        if (!nameValidation(lastName)) {
            if (!nameValidation(lastName, 1)){
                document.getElementById('error').innerText = "חסר שם: שם משפחה לא בוחרים, זה לא סיבה להסתיר אותו.";
            } else if (!nameValidation(lastName, 0)){
                document.getElementById('error').innerText = "אות אחת: שם משפחה לא בוחרים, זה לא סיבה לקצר אותו.";  
            } else if (!nameValidation(lastName, 2)) {
                document.getElementById('error').innerText = "תווים לא תקינים: וואו, זה מקורי! יש מצב לקבל את זה באותיות?";
            }
            document.getElementById('error').removeAttribute("hidden");
            return false;
        }
        // school 
        if (!schoolValidation(school) && noSchool != "nan"){
            document.getElementById('error').innerHTML = "חסר בית ספר: אפשר גם לכתוב <a href='javascript:noSchool();'>ללא מסגרת חינוכית</a>";
            document.getElementById('error').removeAttribute("hidden");
            return false;
        }
        // class
        if (!classValidation(schoolClass)) {
            document.getElementById('error').innerHTML = "חסרה כיתה: מממ… משהו חסר פה…";
            document.getElementById('error').removeAttribute("hidden");
            return false;
        }
        // phone 
        if (!phoneValidation(phone) && phone != ""){
            document.getElementById('error').innerText = "מספר לא תקין: לא ביקשתי להתחיל איתך, צריך מספר הגיוני…";
            document.getElementById('error').removeAttribute('hidden');
        }
        
        // parent phone
        if (!phoneValidation(paretnPhone)) {
            document.getElementById('error').innerText = "מספר לא תקין: אף אחד לא ענה, כדאי לבדוק את המספר שוב...";
            document.getElementById('error').removeAttribute('hidden');
        }

        if (!isValidIsraeliID(ID) && ID != "") {
            document.getElementById('error').innerHTML = "תעודת זהות לא תקינה: משהו פה לא מסתדר…";
            document.getElementById('error').removeAttribute('hidden');
        }

        return false;
    }
    return true;
}

function nameValidation(name, numb = null) {
    switch (numb) {
        case 0:
            if (name.length < 2) {
                return false;
            }
        break;   
        case 1:
            if(name == "") {
                return false;
            }
        break;
        case 2:
            var alphaExp = /^[a-zA-Z]+$/;
            if (!name.value.match(alphaExp)) {
                return false;
            }
        default:
        if (name.length < 2 || name == "") {
            return false;
        }
            break;
    }
    return true;
}

function schoolValidation(school) {
    if (school == "") {
        return false;
    }
    return true;
}
function classValidation(Class) {
    if (Class == "") {
        return false;
    }
    return true;
}

function phoneValidation(phone) {
    if (phone.length != 10) {
        return false;
    }
    return true;
}

function isValidIsraeliID(id) {
	var id = String(id).trim();
	if (id.length > 9 || id.length < 5 || isNaN(id)) return false;

	// Pad string with zeros up to 9 digits
  	id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

  	return Array.from(id, Number)
  		    .reduce((counter, digit, i) => {
			const step = digit * ((i % 2) + 1);
			return counter + (step > 9 ? step - 9 : step);
    		    }) % 10 === 0;
}

function noSchool(){
    document.getElementById('noSchool').setAttribute("name", "school");
    document.getElementById('noSchool').setAttribute("value", "nan");
}