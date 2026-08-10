import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Articles() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    getArticles()
  }, [])

  async function getArticles() {
    const { data, error } = await supabase
      .from('articles')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setArticles(data)
    }
  }

  return (
    <div>
      <h1>Articles</h1>
{/* Display each article from the database */}
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.category}</p>
          <p>{article.body}</p>
        </div>
      ))}
    </div>
  )
}

export default Articles