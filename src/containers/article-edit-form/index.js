import React, { useCallback } from 'react'
import Input from '../../components/input'
import Select from '../../components/select'
import useStore from '../../utils/use-store'
import useSelector from '../../utils/use-selector'
import LayoutForm from '../../components/layout-form'

function ArticleEditForm() {
  const store = useStore()

  const select = useSelector(state => ({
    article: state.article.data,
    maidIn: state.countries.data,
    category: state.categories.data
  }))

  const callbacks = {
    onChangeInput: useCallback((e) => store.article.setArticle(e), [store]),
    onChangeSelect: useCallback((e, item) => store.article.setArticle(e, item), [store]),
    onSubmit: useCallback(() => store.article.pushToServer(), [store])
  }

  function onSubmitHandler(e) {
    callbacks.onSubmit()
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <LayoutForm>
        <Input value={select.article.title} placeholder='название' onChange={callbacks.onChangeInput} name='title' theme='big' label='Название' />
        <textarea type='text' placeholder='описание товара' name='description' value={select.article.description} onChange={callbacks.onChangeInput} label='Описание' />
        <Select options={select.maidIn} value={select.article?.maidIn?.title} name='maidIn' onChange={callbacks.onChangeSelect} label='Страна производитель' />
        <Select options={select.category} value={select.category.find(item => item.title.replace(/-\s/gm, '') === select.article?.category?.title)?.title} name='category' onChange={callbacks.onChangeSelect} label='Категория' />
        <Input type='number' placeholder='год выпуска' name='edition' value={select.article.edition} onChange={callbacks.onChangeInput} label='Год выпуска' />
        <Input type='number' placeholder='цена товара' name='price' value={select.article.price} onChange={callbacks.onChangeInput} label='Цена' />
        <input type='submit' value='Сохранить' />
      </LayoutForm>
    </form>
  )
}

export default React.memo(ArticleEditForm)
