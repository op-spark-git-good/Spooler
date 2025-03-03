import React from 'react'
import SearchApi from './SearchApi'
const NotionsForm = (props) => {
  return (
    <div>

      <input name="query"
        defaultValue={'brand'}
      />
      <input defaultValue={'name'} />
      <SearchApi />

      <button type="submit">Add Notion</button>

    </div>
  )
}
export default NotionsForm