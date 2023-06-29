import { useState } from "react";

const CreateFormBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <div>
      <h2>Create new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)} />
          <br></br>
          Author:
          <input type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)} />
          <br></br>
          Url:
          <input type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreateFormBlog