import React from 'react'
import IconWithBadge from '../Components/IconWithBadge'

const SearchIconWithBadge = (props) => {
  // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={0} />;
}
export default SearchIconWithBadge
