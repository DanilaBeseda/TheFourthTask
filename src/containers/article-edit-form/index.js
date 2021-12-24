import React, { useCallback, useState } from 'react'
import propTypes from 'prop-types'
import { cn } from '@bem-react/classname'
import Input from '../../components/input'
import Select from '../../components/select'
import './styles.css'

function ArticleEditForm(props) {
  const [data, setData] = useState(props.article)

  const className = cn('ArticleEditForm');

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const onSelectHandler = (e) => {
    const item = props[e.target.name].find(item => item.title === e.target.value)
    setData({ ...data, [e.target.name]: { ...item, title: item.title.replace(/-\s/gm, '') } })
  }

  const onSubmitHandler = (e) => {
    props.onSubmit(data)
    e.preventDefault()
  }

  return (
    <form className={className()} onSubmit={onSubmitHandler}>
      <div className={className('item')}>
        <div>Название</div>
        <Input value={data.title} placeholder='название' onChange={onChangeHandler} name='title' theme='big' />
      </div>
      <div className={className('item')}>
        <div>Описание</div>
        <textarea type='text' placeholder='описание товара' name='description' value={data.description} onChange={onChangeHandler} />
      </div>
      <div className={className('item')}>
        <div>Страна производитель</div>
        <Select options={props.maidIn} value={data.maidIn?.title} name='maidIn' onChange={onSelectHandler} />
      </div>
      <div className={className('item')}>
        <div>Категория</div>
        <Select options={props.category} value={props.category.find(item => item.title.replace(/-\s/gm, '') === data.category?.title)?.title} name='category' onChange={onSelectHandler} />
      </div>
      <div className={className('item')}>
        <div>Год выпуска</div>
        <Input type='number' placeholder='год выпуска' name='edition' value={data.edition} onChange={onChangeHandler} />
      </div>
      <div className={className('item')}>
        <div>Цена</div>
        <Input type='number' placeholder='цена товара' name='price' value={data.price} onChange={onChangeHandler} s />
      </div>
      <input type='submit' value='Сохранить' />
    </form>
  )
}

ArticleEditForm.propTypes = {
  article: propTypes.object,
  maidIn: propTypes.arrayOf(propTypes.object),
  category: propTypes.arrayOf(propTypes.object),
  onSubmit: propTypes.func
}

ArticleEditForm.defaultProps = {
  article: {},
  maidIn: [],
  category: [],
  onSubmit: () => { }
}

export default React.memo(ArticleEditForm)
