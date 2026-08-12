import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getArticles()
  }, [])

  async function getArticles() {
    const { data, error: fetchError } = await supabase
      .from('articles')
      .select('*')

      if (fetchError) {
        setError('Could not load articles.')
      } else {
        setArticles(data)
      }
      
      setLoading(false)
  }

  if (loading) {
    return <p>Loading articles...</p>
  }
  
  if (error) {
    return <p>{error}</p>
  }
  return (
    <div>
      <h1>Articles</h1>
{/* Display each article from the database */}
{articles.length === 0 ? (
  <p>No articles have been added yet.</p>
) : (
      articles.map((article) => (
        <div className="article-card" key={article.id}>
    <h2>{article.title}</h2>
    <p className="category">{article.category}</p>
    <p>{article.body}</p>
    </div>
      )))}
    </div>
  )
}

export default Articles