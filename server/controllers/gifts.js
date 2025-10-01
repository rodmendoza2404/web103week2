import { pool } from '../config/database.js'

const getTips = async (_req, res) => {
  try {
    const results = await pool.query(
      `SELECT id, slug, title, category, keyPoint, actions, image, sourceTitle, sourceUrl
       FROM tips
       ORDER BY id`
    )
    res.status(200).json(results.rows)
  } catch (error) {
    console.error('Database error in getTips:', error)
    res.status(500).json({ error: error.message || 'Database connection error' })
  }
}

const getTipBySlug = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, slug, title, category, keyPoint, actions, image, sourceTitle, sourceUrl
         FROM tips WHERE slug = $1`,
      [req.params.slug]
    )
    if (!rows[0]) return res.status(404).json({ error: 'Not found' })
    res.status(200).json(rows[0])
  } catch (error) {
    console.error('Database error in getTipBySlug:', error)
    res.status(500).json({ error: error.message || 'Database connection error' })
  }
}

export default { getTips, getTipBySlug }
