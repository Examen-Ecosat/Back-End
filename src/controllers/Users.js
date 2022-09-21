const jwt = require('jsonwebtoken');
const db = require('../database/db');
const bcrypt = require('bcrypt');

const Time = (1000 * 60 * 60 * 3);

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '3h'
    })
}

module.exports.signup_post = async (req, res) => {

    try {
        let { usuario, password } = await req.body

        const salt = await bcrypt.genSaltSync(12);
        const hash = await bcrypt.hashSync(password, salt);

        password = hash;

        const newUser = {
            usuario,
            password
        }

        let insert = 'INSERT INTO usuarios set ?';
        await db.query(insert, [newUser], function (error, results) {
            if (error) console.log(error.message);
            // console.log(results.insertId)
            const token = createToken(results.insertId);
            res.cookie('jwt', token, { httpOnly: true, maxAge: Time, sameSite: false, secure: false, sameSite: 'lax' });
            res.status(200).json({ mensaje: 'Nuevo usuario generado' });
            console.log('Nuevo usuario generado');
        });

    } catch (error) {
        console.log(error.message);
        res.send('Ha ocurrido un error');
    }

}

module.exports.login_post = async (req, res) => {
    try {
        let { usuario, password } = req.body;
        console.log({ usuario: usuario, password: password })
        const pass = password;

        await db.query('select * from usuarios where usuario=?', [usuario], function (error, results) {
            if (error) {
                res.json({ mensaje: 'Usuario no encontrado', validado: false });
                throw error;
            }
            if (results[0] !== undefined) {
                console.log(pass, results[0].password);
                const auth = bcrypt.compare(pass, results[0].password);
                console.log({ auth: auth });
                if (auth) {
                    const token = createToken(results[0].id_usuario);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: Time, sameSite: false, secure: false, sameSite: 'lax' });
                    res.status(200).json({ usuario: results[0].usuario, mensaje: 'Sesión iniciada', validado: true });
                }
                else {
                    console.log('Usuario o contraseña incorrecta');
                    res.send({ mensaje: 'Usuario o contraseña incorrecta', validado: false });
                }
            }
            else {
                console.log('Usuario o contraseña incorrecta');
                res.send({ mensaje: 'Usuario o contraseña incorrecta', validado: false });
            }

        })


    } catch (error) {
        console.log(error.message);
        res.json('Ha ocurrido un error');
    }
}

module.exports.login_get = async (req, res) => {
    try {
        const token = req.cookies['jwt'];
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;

            db.query('select * from usuarios where id_usuario=?', [userId], function (error, results) {
                if (error) throw error;

                if (results) {
                    res.status(200).json({ usuario: results[0].usuario, token: token });
                }
            })
        } else {
            res.send('No existe token de autorización');
        }


    } catch (error) {
        console.log(error.message);
    }
}

module.exports.logout_get = async (req, res) => {
    try {
        const token = req.cookies['jwt'];
        if (token) {
            res.cookie('jwt', 'expired', { maxAge: 1 });
            res.status(200).json('Sesión cerrada exitosamente');
        } else {
            res.json('No has iniciado sesión');
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.delete_user = async (req, res) => {
    try {
        const token = req.cookies['jwt'];
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decoded.id;
            await db.query('delete from usuarios where id_usuario=?', [userId], function (error) {
                if (error) throw error;
            });
        }
        res.cookie('jwt', 'expired', { maxAge: 1 });
        res.status(200).json('Usuario eliminado exitosamente');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports.user_test = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync('1234', salt);


        const compare = await bcrypt.compareSync('1234', hash);
        console.log({ isTrue: compare })
        res.json({ isTrue: compare })
    } catch (error) {
        console.log(error.message);
    }
}