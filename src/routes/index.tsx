import { Switch } from 'react-router-dom';
import { FormActive } from '../pages/formActives';
import { FormCompany } from '../pages/formCompany';
import { FormUnit } from '../pages/formUnits';
import { FormUser } from '../pages/formUser';
import { Home } from '../pages/home';
import { ListActives } from '../pages/listActives';
import { ListCompany } from '../pages/listCompany';
import { ListUnits } from '../pages/listUnits';
import { ListUsers } from '../pages/listUsers';
import { UpdateActive } from '../pages/updateActives';
import { UpdateCompany } from '../pages/updateCompany';
import { UpdateUnit } from '../pages/updateUnits';
import { UpdateUser } from '../pages/updateUsers';


import {Route} from './Route';



export function Routes() {
  return(
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path='/lcompany' component={ListCompany}/>
      <Route path='/lusers' component={ListUsers}/>
      <Route path='/lunits' component={ListUnits}/>
      <Route path='/lactives' component={ListActives}/>
      <Route path='/fcompany' component={FormCompany}/>
      <Route path='/funit' component={FormUnit}/>
      <Route path='/fuser' component={FormUser}/>
      <Route path='/factive' component={FormActive}/>
      <Route path='/ucompany/:id' component={UpdateCompany}/>
      <Route path='/uunits/:id' component={UpdateUnit}/>
      <Route path='/uusers/:id' component={UpdateUser}/>
      <Route path='/uactives/:id' component={UpdateActive}/>
    </Switch>
  );
}