import React, { useCallback } from 'react'
import propTypes from "prop-types"
import { cn } from '@bem-react/classname'

function Categories({ categories, onChange, value }) {
  const className = cn('Select');

  const onSelect = useCallback((e) => {
    onChange(e.target.value);
  }, [onChange])

  return (
    <select className={className()} onChange={onSelect} value={value}>
      <option value={''}>Все</option>
      {categories.map(item => (
        <option key={item._id} value={item._id}>{item.title}</option>
      ))}
    </select>
  )
}

Categories.propTypes = {
  categories: propTypes.arrayOf(propTypes.object)
}

Categories.defaultProps = {
  categories: []
}

export default React.memo(Categories)
