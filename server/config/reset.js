import { pool } from './database.js'
import '../config/dotenv.js'
import tips from '../data/events.js'

const createTipsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS tips;

    CREATE TABLE IF NOT EXISTS tips (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(255) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      keyPoint TEXT NOT NULL,
      actions JSONB NOT NULL,
      image TEXT NOT NULL,
      sourceTitle VARCHAR(255) NOT NULL,
      sourceUrl TEXT NOT NULL
    );
  `
  try {
    await pool.query(createTableQuery)
    console.log('tips table created successfully')
  } catch (err) {
    console.error('error creating tips table', err)
  }
}

const seedTipsTable = async () => {
  await createTipsTable()

  for (const tip of tips) {
    const insertQuery = {
      text: `INSERT INTO tips
        (slug, title, category, keyPoint, actions, image, sourceTitle, sourceUrl)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
        ON CONFLICT (slug) DO UPDATE SET
          title=EXCLUDED.title,
          category=EXCLUDED.category,
          keyPoint=EXCLUDED.keyPoint,
          actions=EXCLUDED.actions,
          image=EXCLUDED.image,
          sourceTitle=EXCLUDED.sourceTitle,
          sourceUrl=EXCLUDED.sourceUrl;`
    }
    const values = [
      tip.slug,
      tip.title,
      tip.category,
      tip.keyPoint,
      JSON.stringify(tip.actions),
      tip.image,
      tip.sourceTitle,
      tip.sourceUrl
    ]

    try {
      await pool.query(insertQuery, values)
      console.log(`${tip.title} added/updated successfully`)
    } catch (err) {
      console.error('error inserting tip', tip.slug, err)
    }
  }
  console.log('Seeding complete!')
}

seedTipsTable().then(() => process.exit(0))
