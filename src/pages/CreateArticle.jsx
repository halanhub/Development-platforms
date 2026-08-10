import { useState } from 'react'
import { supabase } from '../supabaseClient'

function CreateArticle() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()

    // Get the currently logged-in user
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setMessage('You must be logged in to create an article.')
      return
    }
// Save the new article to the Supabase database

    const { error } = await supabase
      .from('articles')
      .insert({
        title: title,
        category: category,
        body: body,
        submitted_by: user.id,
      })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Article created successfully.')

      setTitle('')
      setCategory('')
      setBody('')
    }
  }

  return (
    <div>
      <h1>Create Article</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Category</label>
          <br />

          <input
            type="text"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Article</label>
          <br />

          <textarea
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Create Article
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  )
}

export default CreateArticle