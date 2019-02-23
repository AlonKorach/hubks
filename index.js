const express = require('express');
app = express();
const bodyParser = require('body-parser');
const ejs = require("ejs");
const admin = require('firebase-admin');
const FB = require('./FBKS');
const path = require('path');

app.set('view engine', 'ejs');

app.engine('ejs', ejs.renderFile);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(__dirname));

// parse application/json
app.use(bodyParser.json())

app.get('/', indexPage);

app.get('/index', indexPage);

app.post('/register', doRegister); // Temp!!! To delete!

app.get('/*', error404)

let error;

function indexPage(req, res) {
    res.status(200).render('../index.ejs');
}

function doRegister(req, res) {
    let form = req.body;
    formValidation(form);
    if (error != null) {
        res.send(`שגיאה: ${error} <br> נא לחזור לטופס ולתקן בהתאם.`);
        return;
    }
    let FBKS = new FB(admin, require('./hubks-b0507-firebase-adminsdk-t8hxc-741d85cc26'), 'hubks-b0507');    

    FBKS.addDBRow('/users', req.body.firstName, req.body.lastName, req.body.school, req.body.class, req.body.parentPhone, req.body.ID, req.body.phone, req.body.parentName);
    res.redirect('/');
}

function error404(req, res) {
    res.status(404).render('../errors/404.ejs');
}

function formValidation(form) {
    let firstName       = form.firstName;
    let lastName        = form.lastName;
    let school          = form.school;
    let phone           = form.phone;
    let paretnPhone     = form.parentPhone;
    let ID              = form.ID;
    let schoolClass     = form.schoolClass;
    let paretnName      = form.paretnName;
    let noSchool        = form.noSchool;
    if (firstName == "" || lastName == "" || (school == "" && noSchool != "nan") || paretnPhone == "" || phone == "" || ID == "" || schoolClass == "") {
       
        //  first name
        if (!nameValidation(firstName)) {
            if (!nameValidation(firstName, 1)){
                error = "חסר שם:   ״לכל איש יש שם״ - חוה אלברשטיין. גם לנערים.";
            } else if (!nameValidation(firstName, 0)) {
                error = "אות אחת: אצלנו לא חוסכים באותיות, פרגנו בכל השם.";
            } else if (!nameValidation(firstName, 2)) {
            error = "תווים לא תקינים: ההורים שלך יצירתיים בשמות, לא חשבו על אותיות?";
        }
            
            return false;
        }
        
        // last name
        if (!nameValidation(lastName)) {
            if (!nameValidation(lastName, 1)){
                error = "חסר שם: שם משפחה לא בוחרים, זה לא סיבה להסתיר אותו.";
            } else if (!nameValidation(lastName, 0)){
                error = "אות אחת: שם משפחה לא בוחרים, זה לא סיבה לקצר אותו.";  
            } else if (!nameValidation(lastName, 2)) {
                error = "תווים לא תקינים: וואו, זה מקורי! יש מצב לקבל את זה באותיות?";
            }
            
            return false;
        }
        // school 
        if (!schoolValidation(school) && noSchool != "nan"){
            error = "חסר בית ספר: אפשר גם לכתוב <a href='javascript:noSchool();'>ללא מסגרת חינוכית</a>";
            
            return false;
        }
        // class
        if (!classValidation(schoolClass)) {
            error = "חסרה כיתה: מממ… משהו חסר פה…";
            
            return false;
        }
        // phone 
        if (!phoneValidation(phone) && phone != ""){
            error = "מספר לא תקין: לא ביקשתי להתחיל איתך, צריך מספר הגיוני…"
        }
        
        // parent phone
        if (!phoneValidation(paretnPhone)) {
            error = "מספר לא תקין: אף אחד לא ענה, כדאי לבדוק את המספר שוב...";
        }

        if (!isValidIsraeliID(ID) && ID != "") {
            error = "תעודת זהות לא תקינה: משהו פה לא מסתדר…";
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


app.listen(process.env.PORT || 3000);