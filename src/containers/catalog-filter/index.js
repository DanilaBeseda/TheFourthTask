import React, { useCallback, useMemo } from "react";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Select from "../../components/select";
import LayoutTools from "../../components/layout-tools";
import Input from "../../components/input";
import Categories from "../../components/categories";

function CatalogFilter() {

  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    categories: state.categories.categories,
    category: state.catalog.params.category,
  }));

  // Опции для полей
  const options = {
    sort: useMemo(() => ([
      { _id: 'key', title: 'По коду' },
      { _id: 'title.ru', title: 'По именованию' },
      { _id: '-price', title: 'Сначала дорогие' },
      { _id: 'edition', title: 'Древние' },
    ]), [])
  }

  const callbacks = {
    onSort: useCallback(sort => store.catalog.setParams({ sort }), [store]),
    onSearch: useCallback(query => store.catalog.setParams({ query, page: 1 }), [store]),
    onReset: useCallback(() => store.catalog.resetParams(), [store]),
    onChangeCategory: useCallback(category => store.catalog.setParams({ category, page: 1 }), [store]),
  }

  return (
    <LayoutTools>
      <Categories onChange={callbacks.onChangeCategory} categories={select.categories} value={select.category} />
      <Input onChange={callbacks.onSearch} value={select.query} placeholder={'Поиск'} theme="big" delay />
      <label>Сортировка:</label>
      <Select onChange={callbacks.onSort} value={select.sort} options={options.sort} />
      <button onClick={callbacks.onReset}>Сбросить</button>
    </LayoutTools>
  );
}

export default React.memo(CatalogFilter);
