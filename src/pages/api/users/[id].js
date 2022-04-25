import db from '../../../utils/user_database'

export default function handler(req, res) {
    res.json(db.find(user => user.id === req.query.id));
}