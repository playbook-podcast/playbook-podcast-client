import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { MainContainer } from '../components';
import { ERouting } from '../constants';
import { PageCreateSubject, PageHome, PageNotFound, PageSubject } from '../pages';

export const ProviderRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainContainer />} path={ERouting.HOME}>
          <Route path={ERouting.HOME} element={<PageHome />} />
          <Route path={ERouting.CREATE_SUBJECT} element={<PageCreateSubject />} />
          <Route path={ERouting.SUBJECT} element={<PageSubject />} />
          <Route path={'*'} element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
