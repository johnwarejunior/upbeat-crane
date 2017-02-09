const GoogleSheets = require('google-drive-sheets');
const credentials = require('../credentials.json')
const sheetID = '1DLGHWgPD-hfG391DZp6kUV9MuKj-4KF4xrVEKPd4Tbs'
const connect = new GoogleSheets(sheetID, credentials)


export default (email, password, done)=>{
  connect.useServiceAccountAuth(credentials, (err) => {
    return connect.getInfo((err, sheetInfo) => {
      let memberList = sheetInfo.worksheets[0]
      memberList.getRows({start: 1, max: 10}, (error, rows) => {
        let userRow = rows.filter(row => row.email === email)[0]
        let user = {id: userRow.id, email: userRow.email, password: userRow.password, isAsmin: userRow.isAsmin }
        if (!user) return done(null, false, { message: `There is no record of the email ${email}.` });
        if( user.password === password){
          console.log('got here ');
          return done(null, user)
        } else done(null, false, { message: 'Your email/password combination is incorrect.' });
      });
    })
  })
}









// authenticateLocally('johnthopkins@gmail.com', 'youllneverguess', () => console.log('complete'))
