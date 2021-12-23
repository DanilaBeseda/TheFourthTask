import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cn } from '@bem-react/classname'
import './styles.css'

function ArticleEditForm({ article, countries, categories, onSubmit }) {
  const [data, setData] = useState(article)

  const className = cn('ArticleEditForm');

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSelectHandler = (e) => {
    let arr
    switch (e.target.name) {
      case 'maidIn':
        arr = countries
        break;
      case 'category':
        arr = categories
        break;
    }

    const item = arr.find(item => item.title === e.target.value)
    setData({ ...data, [e.target.name]: { ...item, title: item.title.replace(/-\s/gm, '') } })
  }

  const onSubmitHandler = (e) => {
    onSubmit(data)
    e.preventDefault()
  }

  return (
    <form className={className()} onSubmit={onSubmitHandler}>
      <div className={className('title')}>
        <label htmlFor='title'>Название</label>
        <input
          type='text'
          name='title'
          id='title'
          value={data.title}
          onChange={onChangeHandler}
        />
      </div>

      <div className={className('description')}>
        <label htmlFor='description'>Описание</label>
        <textarea
          type='text'
          name='description'
          id='description'
          value={data.description}
          onChange={onChangeHandler}
        />
      </div>

      <div className={className('country')}>
        <label htmlFor='country'>Страна производитель</label>
        <select id='description' value={data.maidIn?.title} name='maidIn' onChange={onSelectHandler}>
          {countries.map(item => (
            <option key={item._id}>{item.title}</option>
          ))}
        </select>
      </div>

      <div className={className('category')}>
        <label htmlFor='category'>Категория</label>
        <select id='category' value={categories.find(item => item.title.replace(/-\s/gm, '') === data.category?.title)?.title} name='category' onChange={onSelectHandler}>
          {categories.map(item => (
            <option key={item._id}>{item.title}</option>
          ))}
        </select>
      </div>

      <div className={className('edition')}>
        <label htmlFor='edition'>Год выпуска</label>
        <input
          type='text'
          name='edition'
          id='edition'
          value={data.edition}
          onChange={onChangeHandler}
        />
      </div>

      <div className={className('price')}>
        <label htmlFor='price'>Цена</label>
        <input
          type='text'
          name='price'
          id='price'
          value={data.price}
          onChange={onChangeHandler}
        />
      </div>

      <input type='submit' value='Сохранить' />
    </form>
  )
}

ArticleEditForm.propTypes = {
  article: propTypes.object,
  countries: propTypes.arrayOf(propTypes.object),
  categories: propTypes.arrayOf(propTypes.object),
  onSubmit: propTypes.func
}

ArticleEditForm.defaultProps = {
  article: {},
  countries: [],
  categories: [],
  onSubmit: () => { }
}

export default React.memo(ArticleEditForm)
