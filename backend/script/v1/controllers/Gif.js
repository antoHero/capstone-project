const db = require('../../../database/db');

const Pool = require('pg').Pool;

const Helper = require('./Helper');

const cloud = require('../middleware/cloudinary');

const Gif = {
  createGif(req, res) {
    const url = req.protocol + '://' + req.get('host');
    const gifUrl = url + '../images/' + req.file.filename;

    if (!req.body.title || !req.body.gifUrl) {
      return res.status(400).json({
        message: 'Some fields are missing'
      });
    }

    const id = parseInt(req.params.id);
    const createQuery = `INSERT INTO gifs(title, gifUrl, user_id) 
        VALUES($1, $2, $3)
            returning *`;
    const values = [req.body.title, gifUrl, req.user.id];

    try {
      const {
        rows
      } = Pool.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      cloud.v2.uploader.upload(url, {
        public_id: 'gifUrl'
      }, function (error, result) {
        console.log(result);
      });
      return res.status(201).json({
        token
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Error while creating your gif'
      });
    }
  },

  async getAllGifs(req, res) {
    const queryText = 'SELECT * FROM gifs ORDER BY id ASC';

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
      return res.status(400).send({
        message: `Couldn't fetch gifs`
      });
    }
  },

  async getOneGif(req, res) {
    const readQuery = 'SELECT * FROM gifs WHERE id=$1 AND user_id=$2';

    try {
      const {
        rows
      } = await db.query(readQuery, [req.params.id, req.user.id]);

      if (!rows[0]) {
        return res.status(404).json({
          message: 'Oops Gif does not exist!'
        });
      }

      return res.status(200).json(rows[0]);
    } catch (err) {
      return res.status(400).json({
        err
      });
    }
  },

  async updateGif(req, res) {
    const fineOneGif = 'SELECT * FROM gifd WHERE id=$1 AND user_id=$2';
    const updateQuery = `UPDATE gifs SET title=$1, comment=$2,
        gif_id=$3, user_id=$4 WHERE id=$5 AND user_id=$5 returning *`;

    try {
      const {
        rows
      } = await db.query(fineOneGif, [req.body.params, req.user.id]);

      if (!rows[0]) {
        return res.status(404).json({
          message: 'Oops Gif does not exist!'
        });
      }

      const values = [req.body.title || rows[0].title, req.body.article || rows[0].article, moment(new Date()), req.params.id, req.user.id];
      const result = await db.query(updateQuery, values);
      return res.status(201).json(result.rows[0]);
    } catch (err) {
      return res.status(400).json({
        error
      });
    }
  },

  async deleteGif(req, res) {
    const deleteQuery = 'DELETE * FROM gifs WHERE id=$1 AND user_id=$2 returning *';

    try {
      const {
        rows
      } = await db.query(deleteQuery, [req.params.id, req.user.id]);

      if (!rows[0]) {
        return res.status(404).json({
          message: 'Oops Gif does not exist!'
        });
      }

      return res.status(200).json({
        message: 'Gif deleted successfully'
      });
    } catch (err) {
      return res.status(400).json({
        err
      });
    }
  },

  async commentOnGif(req, res) {
    const getOne = 'SELECT * FROM gifs WHERE id=$1 AND user_id=$2';
    const commentQuery = `INSERT INTO gifComments(comment,gif_id,user_id)
        VALUES($1,$2,$3,$4,$5) returning *`;

    try {
      const {
        rows
      } = await database.query(getOne, [req.params.id, req.user.id]);

      if (!rows[0]) {
        return res.status(404).json({
          message: 'Oops Gif does not exist!'
        });
      }

      const values = [uuidv4(), req.body.comment, moment(new Date()), req.gif.id, req.user.id, moment(new Date())];
      const response = await database.query(commentQuery, values);
      return res.status(201).json({
        message: 'Successfully added comment'
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

};
module.exports = Gif;
//# sourceMappingURL=Gif.js.map