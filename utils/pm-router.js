export default class PMRouter {
  constructor(app) {
    this.router = app.router;
    this.app = app;
  }

  go(link) {
    this.router.go(link);
  }

  push(to) {
    if (!to) return;
    if (typeof to === 'string') {
      this.router.push(this.resolveLink(to));
    } else if (typeof to === 'object') {
      const dependenceId = this.getDependenceId();
      const { path, name, params, query } = to;
      if (path) {
        this.router.push({ path, query: { ...query, dependenceId } });
      } else if (name) {
        this.router.push({ name, params, query: { ...query, dependenceId } });
      }
    }
  }

  getDependenceId() {
    const { selectedDependenceId } = this.app.store.state.layout;
    return selectedDependenceId;
  }

  resolveLink(link) {
    const dependenceId = this.getDependenceId();
    if (link.indexOf('dependenceId=') !== -1) {
      return link;
    }
    if (link.indexOf('?') !== -1) {
      link += `&dependenceId=${dependenceId}`;
    } else {
      link += `?dependenceId=${dependenceId}`;
    }
    return link;
  }

  back(params) {
    this.router.back(params);
  }
}
