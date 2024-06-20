import {sqlFetch} from '../lib/sql.js' //引入spl.js

export var R = {}
let _id=0, _title=1, _body=2
//(使用chatgpt) 監聽 hash
window.onhashchange = async function () {
  var r
  var tokens = window.location.hash.split('/')
  console.log('tokens=', tokens)
  switch (tokens[0]) {
    case '#show':
      let r = await sqlFetch('blog', `SELECT id, title, body FROM posts WHERE id=${tokens[1]}`)
      R.show(r[0]) // 取得第一筆傳入 (雖然只會有一筆，但 SELECT 預設會傳回很多比，所以用 results[0] 只取第一筆)
      break
    case '#new':
      R.new()
      break
    default:
      let posts = await sqlFetch('blog', `SELECT id, title, body FROM posts`)
      R.list(posts)
      break
  }
}
// 初始化
window.onload = async function () {
  await sqlFetch('blog', `CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)`)
  window.onhashchange()
}
//設置 title & content
R.layout = function (title, content) {
  document.querySelector('title').innerText = title 
  document.querySelector('#content').innerHTML = content
}
//建立 list
R.list = function (posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${post[_title]}</h2>
      <p><a id="show${post[_id]}" href="#show/${post[_id]}">Read post</a></p>
    </li>
    `)
  }
  // 新增裡面的元素
  let content = `
  <h1>Posts</h1>
  <p>You have <strong>${posts.length}</strong> posts!</p>
  <p><a id="createPost" href="#new">Create a Post</a></p>
  <ul id="posts">
    ${list.join('\n')}
  </ul>
  `
  return R.layout('Posts', content)
}

R.new = function () {
  R.layout('New Post', `
  <h1>New Post</h1>
  <p>Create a new post.</p>
  <form>
    <p><input id="title" type="text" placeholder="Title" name="title"></p>
    <p><textarea id="body" placeholder="Contents" name="body"></textarea></p>
    <p><input id="savePost" type="button" value="Create"></p>
  </form>
  `)
  document.querySelector('#savePost').onclick = ()=>R.savePost()//建立保存按鈕事件
}
//呈現
R.show = function (post) {
  return R.layout(post[_title], `
    <h1>${post[_title]}</h1>
    <p>${post[_body]}</p>
  `)
}
//(這塊程式碼使用chatgpt) 
R.savePost = async function () {
  let title = document.querySelector('#title').value
  let body = document.querySelector('#body').value
  await sqlFetch('blog', `INSERT INTO posts (title, body) VALUES ('${title}', '${body}')`)// 执行 SQL 插入操作，将新文章插入到数据库
  window.location.hash = '#list' // 更新 URL hash，跳转到文章列表页面
}
