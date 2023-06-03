const express = require('express');
const app = express();
const cors = require('cors');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
const genericPool = require("generic-pool")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Verbindungspooling-Optionen
const poolOptions = {
    user: "",
    password: "",
    connectionString: "",
    poolMin: 1,
    poolMax: 10
};
// Erstellen des Verbindungspools
const pool = genericPool.createPool(
    {
        create: async function () {
            return oracledb.getConnection(poolOptions);
        },
        destroy: async function (connection) {
            await connection.close();
        }
    },
    {
        min: poolOptions.poolMin,
        max: poolOptions.poolMax
    }
);

//REGISTRATION
app.post('/register', async (request, response) => {
    const { email, password, adresse } = request.body;
    let connection;
    try {
        connection = await pool.acquire();

        const sql = `INSERT INTO KUNDENDATEN (EMAIL, PASSWORD, ADRESSE) values(:email, :password, :adresse)`;

        const result = await connection.execute(sql, [
            request.body.email,
            request.body.password,
            request.body.adresse
        ])
        console.log(result.rowsAffected, "Rows Inserted");
        connection.commit();

        const data = await connection.execute(`SELECT * FROM KUNDENDATEN`);
        console.log(data.rows);

        response.status(200).send({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});


//LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let con;
    let result;
    try {
        con = await pool.acquire();
        result = await con.execute(
            `SELECT * FROM KUNDENDATEN
            WHERE email = :email AND password = :password`,
            [email, password]
        );
    } catch (err) {
        console.error(err);
    } finally {
        if (con) {
            pool.release(con);
        }
    }
    if (result.rows.length > 0) {
        res.json({ success: true, data: result.rows[0] });
    } else {
        res.json({ success: false, data: null });
    }
});

//LOGIN FÜR ADMIN
app.post('/admin', async (req, res) => {
    const { email, password } = req.body;
    let con;
    let result;
    try {
        con = await pool.acquire();
        result = await con.execute(
            `SELECT * FROM ADMIN
            WHERE email = :email AND password = :password`,
            [email, password]

        );
    } catch (err) {
        console.error(err);
    } finally {
        if (con) {
            pool.release(con);
        }
    }
    if (result.rows.length > 0) {
        res.json({ success: true, data: result.rows[0] });
    } else {
        res.json({ success: false, data: null });
    }
});

//GET PIZZEN
app.get("/pizzen", async (req, res) => {
    let con;
    let pizzen = [];

    try {
        con = await pool.acquire();
        result = await con.execute(`SELECT * FROM SPEISEKARTE WHERE KATEGORIE = 'pizzen'`);

        console.log(result);

        if (result.rows.length > 0) {
            for (const row of result.rows) {
                const clob = row.BILD;
                // console.log('Clob: ', clob);
                const buffer = await clob.getData();
                const base64 = buffer.toString('base64');
                // console.log('Base64: ', base64);



                pizzen.push({
                    id: row.PRODUKT_ID,
                    kategorie: row.KATEGORIE,
                    name: row.NAME,
                    preis: row.PREIS,
                    dataUrl: "" + base64
                });
            }
            console.log('Image loaded: ', pizzen);
        }

        res.json(pizzen);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (con) {
            pool.release(con);
        }
    }
});

//AB HIER WEITER MACHEN!!!!

//POST PIZZEN 
app.post('/pizzen', async (request, response) => {
    const { name, kategorie, preis, bild } = request.body;
    let connection;

    try {
        connection = await pool.acquire();

        const base64String = request.body.bild;

        const buffer = Buffer.from(base64String.split(',')[1], 'base64');
        console.log('Buffer:', buffer);

        const sql = `insert into SPEISEKARTE (NAME, KATEGORIE, PREIS, BILD) values(:name, :kategorie, :preis, :bild)`;

        const result = await connection.execute(sql, {
            name,
            kategorie,
            preis,
            bild: {
                dir: oracledb.BIND_IN,
                type: oracledb.CLOB,
                val: base64String
            }
        });


        console.log(result.rowsAffected, "Rows Inserted");
        connection.commit();

        const data = await connection.execute(`SELECT * FROM SPEISEKARTE`);
        console.log(data.rows);

        response.status(200).send({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }

});

//DELETE PIZZEN
app.delete('/pizzen/:produkt_id', async (request, response) => {
    const { produkt_id } = request.params;

    let connection;

    try {
        connection = await pool.acquire();

        console.log("Successfully connected to Oracle Database");

        const sql = `DELETE FROM SPEISEKARTE WHERE PRODUKT_ID = :produkt_id`;

        const result = await connection.execute(sql, [produkt_id], { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.error('Error deleting data: no data found for the given product ID');
            return response.status(404).send({ message: 'Error deleting data: no data found for the given product ID' });
        } else {
            console.log('Data deleted successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error deleting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//UPDATE PIZZEN
app.patch('/pizzen', async (request, response) => {
    const { produkt_id, name, preis } = request.body;
    let connection;
    try {
        connection = await pool.acquire();

        console.log("Successfully connected to Oracle Database");
        console.log(produkt_id, name, preis)
        const sql = `UPDATE SPEISEKARTE SET name = :name, preis = :preis WHERE PRODUKT_ID = :produkt_id`;

        const result = await connection.execute(sql, { produkt_id: produkt_id, name: name, preis: preis, }, { autoCommit: true });

        /*result
            .then(data => response.json({ success: data }))
            .catch(err => console.log(err));*/
        if (result.rowsAffected === 0) {
            console.error('Error updating data: no data found for the given product ID');
            return response.status(404).send({ message: 'Error updating data: no data found for the given product ID' });
        } else {
            console.log('Data updated successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error updating data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//GET GETRÄNKE
app.get("/getraenke", async (req, res) => {
    let con;
    let getraenke = [];
    try {
        con = await pool.acquire();
        result = await con.execute(`SELECT * FROM SPEISEKARTE WHERE KATEGORIE = 'getraenke'`);
        console.log(result)

        if (result.rows.length > 0) {
            for (const row of result.rows) {
                const clob = row.BILD;
                // console.log('Clob: ', clob);
                const buffer = await clob.getData();
                const base64 = buffer.toString('base64');
                // console.log('Base64: ', base64);



                getraenke.push({
                    id: row.PRODUKT_ID,
                    kategorie: row.KATEGORIE,
                    name: row.NAME,
                    preis: row.PREIS,
                    dataUrl: "" + base64
                });
            }
            console.log('Image loaded: ', getraenke);
        }


        res.json(getraenke);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (con) {
            pool.release(con);
        }
    }
});

//POST GETRÄNK 
app.post('/getraenke', async (request, response) => {
    const { name, kategorie, preis, bild } = request.body;
    let connection;

    try {
        connection = await pool.acquire();
        const base64String = request.body.bild;

        const buffer = Buffer.from(base64String.split(',')[1], 'base64');
        console.log('Buffer:', buffer);

        const sql = `insert into SPEISEKARTE (NAME, KATEGORIE, PREIS, BILD) values(:name, :kategorie, :preis, :bild)`;

        const result = await connection.execute(sql, {
            name,
            kategorie,
            preis,
            bild: {
                dir: oracledb.BIND_IN,
                type: oracledb.CLOB,
                val: base64String
            }
        });


        console.log(result.rowsAffected, "Rows Inserted");
        connection.commit();

        const data = await connection.execute(`SELECT * FROM SPEISEKARTE`);
        console.log(data.rows);

        response.status(200).send({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//DELETE GETRÄNK
app.delete('/getraenke/:produkt_id', async (request, response) => {
    const { produkt_id } = request.params;

    let connection;

    try {
        connection = await pool.acquire();

        console.log("Successfully connected to Oracle Database");

        const sql = `DELETE FROM SPEISEKARTE WHERE PRODUKT_ID = :produkt_id`;

        const result = await connection.execute(sql, [produkt_id], { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.error('Error deleting data: no data found for the given product ID');
            return response.status(404).send({ message: 'Error deleting data: no data found for the given product ID' });
        } else {
            console.log('Data deleted successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error deleting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//UPDATE GETRÄNK
app.patch('/getraenke', async (request, response) => {
    const { produkt_id, name, preis } = request.body;
    let connection;
    try {
        connection = await pool.acquire();

        console.log("Successfully connected to Oracle Database");
        const sql = `UPDATE SPEISEKARTE SET name = :name, preis = :preis WHERE PRODUKT_ID = :produkt_id`;

        const result = await connection.execute(sql, { produkt_id: produkt_id, name: name, preis: preis, }, { autoCommit: true });
        /*result
            .then(data => response.json({ success: data }))
            .catch(err => console.log(err));*/
        if (result.rowsAffected === 0) {
            console.error('Error updating data: no data found for the given product ID');
            return response.status(404).send({ message: 'Error updating data: no data found for the given product ID' });
        } else {
            console.log('Data updated successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error updating data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//GET KUCHEN
app.get("/kuchen", async (req, res) => {
    let con;
    let kuchen = [];
    try {
        con = await pool.acquire();

        result = await con.execute(`SELECT * FROM SPEISEKARTE WHERE KATEGORIE = 'kuchen'`);
        console.log(result);

        if (result.rows.length > 0) {
            for (const row of result.rows) {
                const clob = row.BILD;
                // console.log('Clob: ', clob);
                const buffer = await clob.getData();
                const base64 = buffer.toString('base64');
                // console.log('Base64: ', base64);



                kuchen.push({
                    id: row.PRODUKT_ID,
                    kategorie: row.KATEGORIE,
                    name: row.NAME,
                    preis: row.PREIS,
                    dataUrl: "" + base64
                });
            }
            console.log('Image loaded: ', kuchen);
        }
        res.json(kuchen);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (con) {
            pool.release(con);
        }
    }
});


//POST KUCHEN 
app.post('/kuchen', async (request, response) => {
    const { name, kategorie, preis, bild } = request.body;
    let connection;

    try {
        connection = await pool.acquire();

        const base64String = request.body.bild;

        const buffer = Buffer.from(base64String.split(',')[1], 'base64');
        console.log('Buffer:', buffer);

        const sql = `insert into SPEISEKARTE (NAME, KATEGORIE, PREIS, BILD) values(:name, :kategorie, :preis, :bild)`;

        const result = await connection.execute(sql, {
            name,
            kategorie,
            preis,
            bild: {
                dir: oracledb.BIND_IN,
                type: oracledb.CLOB,
                val: base64String
            }
        });



        console.log(result.rowsAffected, "Rows Inserted");
        connection.commit();

        const data = await connection.execute(`SELECT * FROM SPEISEKARTE`);
        console.log(data.rows);

        response.status(200).send({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//DELETE KUCHEN
app.delete('/kuchen/:produkt_id', async (request, response) => {
    const { produkt_id } = request.params;

    let connection;

    try {
        connection = await pool.acquire();
        console.log("Successfully connected to Oracle Database");

        const sql = `DELETE FROM SPEISEKARTE WHERE PRODUKT_ID = :produkt_id`;

        const result = await connection.execute(sql, [produkt_id], { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.error('Error deleting data: no data found for the given product ID');
            return response.status(404).send({ message: 'Error deleting data: no data found for the given product ID' });
        } else {
            console.log('Data deleted successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error deleting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//UPDATE KUCHEN
app.patch('/kuchen', async (request, response) => {
    const { produkt_id, name, preis } = request.body;
    let connection;
    try {
        connection = await pool.acquire();

        console.log("Successfully connected to Oracle Database");
        console.log(produkt_id, name, preis)
        const sql = `UPDATE SPEISEKARTE SET name = :name, preis = :preis WHERE PRODUKT_ID = :produkt_id`;

        const result = await connection.execute(sql, { produkt_id: produkt_id, name: name, preis: preis, }, { autoCommit: true });

        /*result
            .then(data => response.json({ success: data }))
            .catch(err => console.log(err));*/
        if (result.rowsAffected === 0) {
            console.error('Error updating data: no data found for the given product ID');
            return response.status(404).send({ message: 'Error updating data: no data found for the given product ID' });
        } else {
            console.log('Data updated successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error updating data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//POST Bestellung 
app.post('/bestellung', async (request, response) => {
    const { order_list, kunden_email, kunden_adresse } = request.body;
    let connection;

    try {
        connection = await pool.acquire();
        const body = request.body;
        console.log("Successfully connected to Oracle Database");

        const sql = `insert into ORDER_MODEL2 (ORDER_LIST, KUNDEN_EMAIL, KUNDEN_ADRESSE) values(:order_list, :kunden_email, :kunden_adresse)`;

        const result = await connection.execute(sql, [JSON.stringify(order_list), kunden_email, kunden_adresse]);

        console.log(result.rowsAffected, "Rows Inserted");
        connection.commit();

        const data = await connection.execute(`SELECT * FROM ORDER_MODEL2`);
        console.log(data.rows);

        response.status(200).send({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//GET Bestellung
app.get("/bestellung", async (req, res) => {
    let connection;

    try {
        connection = await pool.acquire();

        const result = await connection.execute(`SELECT * FROM ORDER_MODEL2`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//GET Bestellung
app.get("/bestellung/:kunden_email", async (req, res) => {
    let connection;

    try {
        connection = await pool.acquire();


        const result = await connection.execute(`SELECT * FROM ORDER_MODEL2 WHERE KUNDEN_EMAIL = :kunden_email`, [req.params.kunden_email]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

app.patch('/bestellung', async (request, response) => {
    const { bestell_nr, status } = request.body;
    let connection;
    try {
        connection = await pool.acquire();

        console.log("Successfully connected to Oracle Database");
        const sql = `UPDATE ORDER_MODEL2 SET STATUS = :status WHERE BESTELL_NR = :bestell_nr`;

        const result = await connection.execute(sql, { bestell_nr: bestell_nr, status: status }, { autoCommit: true });

        /*result
            .then(data => response.json({ success: data }))
            .catch(err => console.log(err));*/
        if (result.rowsAffected === 0) {
            console.error('Error updating data: no data found for the given bestell_nr');
            return response.status(404).send({ message: 'Error updating data: no data found for the given bestell_nr' });
        } else {
            console.log('Data updated successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error updating data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

///POST Rechnungen
app.post('/rechnungen', async (request, response) => {
    const { bestell_nr, kunden_id, summe } = request.body;
    let connection;

    try {
        connection = await pool.acquire();
        const body = request.body;
        console.log("Successfully connected to Oracle Database");

        const sql = `insert into RECHNUNGEN_KUNDEN (BESTELL_NR, KUNDEN_ID, SUMME) values(:bestell_nr, :kunden_id, :summe)`;

        const result = await connection.execute(sql, [bestell_nr, kunden_id, summe]);

        console.log(result.rowsAffected, "Rows Inserted");
        connection.commit();

        const data = await connection.execute(`SELECT * FROM RECHNUNGEN_KUNDEN`);
        console.log(data.rows);

        response.status(200).send({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//Get Rechnungen
app.get("/rechnungen", async (req, res) => {
    let connection;

    try {
        connection = await pool.acquire();

        const result = await connection.execute(`SELECT * FROM RECHNUNGEN_KUNDEN`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//GET Admin
app.get("/admin", async (req, res) => {
    let connection;

    try {
        connection = await pool.acquire();

        const result = await connection.execute(`SELECT * FROM ADMIN`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});


//CREATE ADMIN 
app.post('/admin', async (request, response) => {
    const { email, password } = request.body;
    let connection;

    try {
        connection = await pool.acquire();
        const body = request.body;
        console.log("Successfully connected to Oracle Database");

        const sql = `insert into ADMIN (EMAIL, PASSWORD) values(:email, :password)`;

        const result = await connection.execute(sql, [
            body.email,
            body.password,

        ])

        console.log(result.rowsAffected, "Rows Inserted");
        connection.commit();

        const data = await connection.execute(`SELECT * FROM ADMIN`);
        console.log(data.rows);

        response.status(200).send({ message: 'Data inserted successfully' });
    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});


//DELETE ADMIN
app.delete('/admin/:email', async (request, response) => {
    const { email } = request.params;

    let connection;

    try {
        connection = await pool.acquire();
        console.log("Successfully connected to Oracle Database");

        const sql = `DELETE FROM ADMIN WHERE EMAIL = :email`;

        const result = await connection.execute(sql, [email], { autoCommit: true });

        if (result.rowsAffected === 0) {
            console.error('Error deleting data: no data found for the given email');
            return response.status(404).send({ message: 'Error deleting data: no data found for the given email' });
        } else {
            console.log('Data deleted successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error deleting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//UPDATE ADMIN
app.patch('/admin', async (request, response) => {
    const { email, password } = request.body;
    let connection;
    try {
        connection = await pool.acquire();

        console.log("Successfully connected to Oracle Database");
        const sql = `UPDATE ADMIN SET EMAIL = :email WHERE EMAIL = :email`;

        const result = await connection.execute(sql, { email: email, password: password }, { autoCommit: true });

        /*result
            .then(data => response.json({ success: data }))
            .catch(err => console.log(err));*/
        if (result.rowsAffected === 0) {
            console.error('Error updating data: no data found for the given email');
            return response.status(404).send({ message: 'Error updating data: no data found for the given email' });
        } else {
            console.log('Data updated successfully');
            return response.json({ success: true });
        }

    } catch (err) {
        console.error(err);
        response.status(500).send({ message: 'Error updating data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});



//GET ALLE DATEN von Speisekarte
app.get("/data", async (req, res) => {
    let connection;

    try {
        connection = await pool.acquire();

        const data = await connection.execute(`SELECT * FROM SPEISEKARTE`);
        res.json(data.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});

//GET ALLE DATEN von Kundendaten
app.get("/customerdata/:email", async (req, res) => {
    let connection;
    let customerdata;
    try {
        connection = await pool.acquire();

        const result = await connection.execute(
            `SELECT * FROM KUNDENDATEN WHERE email = :email`,
            [req.params.email]
        );
        console.log(result);
        if (result.rows.length > 0) {
            customerdata = result.rows[0];
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
    res.json(customerdata);
});

//GET ALLE (Alle Kunden) DATEN von Kundendaten
app.get("/customerdata", async (req, res) => {
    let connection;
    let customerdata;
    try {
        connection = await pool.acquire();

        const result = await connection.execute(
            `SELECT * FROM KUNDENDATEN`
        );
        console.log(result);
        if (result.rows.length > 0) {
            customerdata = result.rows;
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
    res.json(customerdata);
});

//GET ALLE DATEN von ADMIN
app.get("/admin/:email", async (req, res) => {
    let connection;
    let customerdata;
    try {
        connection = await pool.acquire();

        const result = await connection.execute(
            `SELECT * FROM ADMIN WHERE email = :email`,
            [req.params.email]
        );
        console.log(result);
        if (result.rows.length > 0) {
            customerdata = result.rows[0];
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
    res.json(customerdata);
});

//Test für Bild
//GET BILD
app.get("/bild", async (req, res) => {
    let connection;
    let customerdata = [];

    try {
        connection = await pool.acquire();

        const result = await connection.execute(
            `SELECT * FROM TESTBILD`
        );
        // console.log(result);
        if (result.rows.length > 0) {
            for (const row of result.rows) {
                const clob = row.BILD;
                //   console.log('Clob: ', clob);

                //
                const buffer = await clob.getData();
                // console.log('Buffer: ', buffer);

                const base64 = buffer.toString('base64');
                // console.log('Base64: ', base64);
                //
                //+clob data:image/png;base64,
                const dataUrl = '' + base64;

                customerdata.push({
                    id: row.ID,
                    dataUrl: dataUrl
                });
            }
            // console.log('Image loaded: ', customerdata);
        }
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
    res.json(customerdata);
});


const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//POST BILD
app.post('/bild', async (req, res) => {
    let connection;

    try {
        connection = await pool.acquire();
        console.log('Successfully connected to Oracle Database');

        const base64String = req.body.bild;

        if (base64String) {
            const buffer = Buffer.from(base64String.split(',')[1], 'base64');
            // console.log('Buffer:', buffer);
            const sql = 'INSERT INTO TESTBILD (BILD) VALUES (:bild)';

            const result = await connection.execute(sql, {
                bild: { dir: oracledb.BIND_IN, type: oracledb.CLOB, val: base64String }
            });
            //console.log(result.rowsAffected, 'Rows Inserted');
            connection.commit();

            res.send('Image saved');
        } else {
            console.error('Base64 string not found in the request');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error inserting data' });
    } finally {
        if (connection) {
            pool.release(connection);
        }
    }
});


app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});



