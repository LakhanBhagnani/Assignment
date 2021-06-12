const sql = require("mssql");

var dbCOnfig = {
	server: "DESKTOP-V5FSTDD\\SQLEXPRESS",
	user: "lakhan",
	password: "lakhan",
	options: {
		trustedConnection: true,
		trustServerCertificate: true,
	},
};
sql.on("error", (err) => {
	console.log(err.message);
});
async function getDetails() {
	try {
		let pool = await sql.connect(dbCOnfig);
		// to select let result=await pool.request().query("select * from persons ");
		//to update
		//let result=await pool.request().query("update persons set FirstName='deepak'").then(result=>{
		// 	console.log(result);
		// });
		//to insert
		// let result=await pool.request().query("insert into persons values(2,'Bhagnani','Lakhan','Pune','Pune')").then(result=>{
		// 	console.log(result);
		// });
		let result = await pool
			.request()
			.query("select * from candidate")
			.then((result) => {
				console.log(result);
			});
	} catch (error) {
		console.log(error);
	} finally {
		sql.close();
	}
}

