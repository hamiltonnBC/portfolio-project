// src/router.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/home/home_page';
import ProjectsPage from './pages/projects/projects_page';
import AboutPage from './pages/about/about_page';

function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/about" component={AboutPage} />
    </Switch>
  );
}

export default AppRouter;
