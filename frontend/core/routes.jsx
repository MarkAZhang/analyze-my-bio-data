import {Route, Switch} from 'react-router'

import {Survey, Anova, Analysis} from '../pages'

export default (
  <Switch>
    <Route path='/anova' component={Anova} />
    <Route path='/analysis' component={Analysis} />
    <Route path='/' component={Survey} />
  </Switch>
)
