const db = require('../../../database/db');

const Pool = require('pg').Pool;

const Helper = require('./Helper');

const User = {
  /**
   * Create A User
   */
  async create(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        'message': 'Some values are missing'
      });
    }

    if (!Helper.emailIsValid(req.body.email)) {
      return res.status(400).json({
        'message': 'Invalid Email. Enter a valid one'
      });
    }

    const hashPassword = Helper.hashUserPassword(req.body.password);
    const createQuery = `INSERT INTO
      users(firstname, lastname, email, password, gender, jobRole, 
        department, address)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
    const values = [req.body.firstname, req.body.lastname, req.body.email, hashPassword, req.body.gender, req.body.jobRole, req.body.department, req.body.address];

    try {
      const {
        rows
      } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201).json({
        token
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).json({
          'message': 'This EMAIL has already been taken'
        });
      }

      return res.status(400).json({
        error
      });
    }
  },

  //get users
  async getUsers(req, res) {
    const queryText = 'SELECT * FROM users ORDER BY id ASC';

    try {
      const {
        rows,
        rowCount
      } = await db.query(queryText);
      return res.status(200).json({
        rows,
        rowCount
      });
    } catch (err) {
      return res.status(400).json({
        message: `Couldn't fetch users`
      });
    }
  },

  getOneUser(req, res) {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }

      return res.status(200).json(results.rows);
    });
  },

  getOneUser(req, res) {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM users WHERE id=$1', [id], (error, results) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }

      return res.status(200).json(results.rows);
    });
  },

  updateUser(req, res) {
    const id = parseInt(req.params.id);
    const {
      firstname,
      lastname,
      email,
      gender,
      jobRole,
      department,
      address
    } = req.body;
    pool.query(`UPDATE users SET firstname=$1, lastname=$2,
     email=$3, gender=$4, jobRole=$5, department=$6, address=$7 
     WHERE id=$8`, [firstname, lastname, email, gender, jobRole, department, address], (error, results) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }

      return res.status(201).json({
        message: 'User updated successfully'
      });
    });
  },

  deleteUser(req, res) {
    const id = parseInt(req.params.id);
    pool.query(`DELETE FROM users WHERE id=$1`, [id], (error, results) => {
      if (error) {
        return res.status(400).json({
          error: error
        });
      }

      return res.status(200).json({
        message: 'User deleted successfully'
      });
    });
  },

  /**
   * Login
   */
  async signin(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Email or Password field is blank'
      });
    }

    if (!Helper.emailIsValid(req.body.email)) {
      return res.status(400).json({
        message: 'Invalid email. Please enter a valid one'
      });
    }

    const queryText = 'SELECT * FROM users WHERE email=$1';

    try {
      const {
        rows
      } = await db.query(queryText, [req.body.email]);

      if (!rows[0]) {
        return res.status(400).json({
          message: 'Invalid Email/Password Combination'
        });
      }

      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          message: 'Incorrect password'
        });
      }

      const token = Helper.generateToken(rows[0].id);
      return res.status(200).json({
        token
      });
    } catch (err) {
      return res.status(400).json({
        err
      });
    }
  }

};
module.exports = User;
//# sourceMappingURL=User.js.map