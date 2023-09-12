/* 
	CRUD de la entidad 'User'
	La clase userHandler contiene una serie de atributos que serán datos personales que se le solicitará
	al usuario. También contiene una serie de métodos que serán cada unas de de las fases del CRUD:
	userCreate, userRead, userUpdate y userDelete.
*/

class userHandler
{
	constructor(userID, username, password)
	{
		this.userID = userID;
		this.username = username;
		this.password = password;
	}

	userCreate(ID, user, pass)
	{
        // console.log('Crear usuario: ' + this.userID + ' ' + this.username + ' ' + this.password);
        this.userID = ID;
        this.username = user;
        this.password = pass;
	}

	userRead()
	{
		return this.userID;
		return this.username;
		return this.password;
	}

	userUpdate()
	{

	}

	userDelete()
	{

	}
}

//Creo el primer usuario
let userOne = new userHandler('01', 'nacho223', '1234');
userOne.userID = 1;
userOne.username = 'nacho223';
userOne.password = '1234';

//Leo el usuario
console.log(userOne.ID);
console.log(userOne.user);
console.log(userOne.pass);