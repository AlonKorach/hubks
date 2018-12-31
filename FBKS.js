'use strict'
class FB {
    /* admin;
    serviceAccount;
    app; */

    constructor(admin, serviceAccount, dbURL){
        this.admin = admin;
        this.serviceAccount = serviceAccount;
        this.connnect(dbURL);
        this.db = this.admin.database();
    }

    connnect(dbURL) {
        this.app = this.admin.initializeApp({
            credential: this.admin.credential.cert(this.serviceAccount),
            databaseURL: `https://${dbURL}.firebaseio.com`
        });
        // console.log(this.app);
    }
    addDBRow(path, firstName, lastname, school, Class, parentPhone, ID, mobilePhone){
        var ref =  this.db.ref("/");
        var ItemREF = ref.child(path).set({
        firstName: firstName,
        lastName: lastname,
        school: school,
        class: Class,
        parentPhone: parentPhone,
        id: ID,
        mobilePhone: mobilePhone
        });

        var key = ItemREF.key;
        return key;
    }

    updateDBRow(path, object, ID){
        var ref = this.db.ref(`/`);
        ref.child(path).update(object);
    }

    readDBItems(path, order){
        var db = this.admin.database();
        var ref = db.ref(`/`);
        var itemsREF = ref.child(path);
        itemsREF.orderByChild(`${path}/${order}`).on('value', (snapshot) => {
            return (snapshot.val());
        })
    }

    readDBItem(id) {
        var itemsREF = ref.child("users/" + id);
        itemsREF.orderByChild().on("value", (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                return snapshot.val();
            }
            console.log("Cannot read a TODO ite with TODO ID %s!", id);
            return null;
        })
    }
}
module.exports = FB;