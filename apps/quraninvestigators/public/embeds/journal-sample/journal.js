// Renders posts.csv as cards. No libraries, no external requests.
// Columns: date,title,category,excerpt,url,image  (image is a path next to this file, or empty)
;(function () {
  function parseCsv(text) {
    var rows = []
    var row = []
    var field = ''
    var quoted = false
    for (var i = 0; i < text.length; i++) {
      var c = text[i]
      if (quoted) {
        if (c === '"' && text[i + 1] === '"') {
          field += '"'
          i++
        } else if (c === '"') {
          quoted = false
        } else {
          field += c
        }
      } else if (c === '"') {
        quoted = true
      } else if (c === ',') {
        row.push(field)
        field = ''
      } else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++
        row.push(field)
        rows.push(row)
        row = []
        field = ''
      } else {
        field += c
      }
    }
    if (field !== '' || row.length) {
      row.push(field)
      rows.push(row)
    }
    return rows.filter(function (r) {
      return r.some(function (v) {
        return v.trim() !== ''
      })
    })
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag)
    Object.keys(attrs || {}).forEach(function (k) {
      node.setAttribute(k, attrs[k])
    })
    ;(children || []).forEach(function (child) {
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child)
    })
    return node
  }

  function card(post) {
    var body = [el('p', { class: 'meta' }, [[post.date, post.category].filter(Boolean).join(' · ')])]
    body.push(el('h2', {}, [post.title]))
    if (post.excerpt) body.push(el('p', {}, [post.excerpt]))
    if (post.url) body.push(el('a', { href: post.url, target: '_top' }, ['Read more']))
    var parts = []
    if (post.image) parts.push(el('img', { src: post.image, alt: '', loading: 'lazy' }))
    parts.push(el('div', { class: 'body' }, body))
    return el('article', { class: 'card' }, parts)
  }

  var root = document.getElementById('posts')

  fetch('posts.csv')
    .then(function (r) {
      return r.text()
    })
    .then(function (text) {
      var rows = parseCsv(text)
      var header = rows.shift() || []
      var posts = rows
        .map(function (r) {
          var post = {}
          header.forEach(function (h, i) {
            post[h.trim()] = (r[i] || '').trim()
          })
          return post
        })
        .filter(function (p) {
          return p.title
        })
        .sort(function (a, b) {
          return a.date < b.date ? 1 : -1
        })
      root.textContent = ''
      if (!posts.length) {
        root.appendChild(el('p', { class: 'empty' }, ['No posts yet.']))
        return
      }
      posts.forEach(function (p) {
        root.appendChild(card(p))
      })
    })
    .catch(function () {
      root.textContent = ''
      root.appendChild(el('p', { class: 'empty' }, ['Posts could not be loaded.']))
    })
})()
