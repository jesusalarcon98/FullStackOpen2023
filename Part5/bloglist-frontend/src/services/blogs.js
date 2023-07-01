import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const CreateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config)
  return response.data;
}

const EditBlog = (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog);
  return request.then((response) => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, CreateBlog, EditBlog, deleteBlog }