window.app = {
    config: {
      gatekeeper_url: 'http://transformer-gatekeeper.herokuapp.com',
      oauth_client_id: '2bab62e2f6b27c3ebe1f'
    },
    models: {},
    views: {},
    routers: {},
    utils: {},
    templates: _($('script[name]')).reduce(function(memo, el) {
      memo[el.getAttribute('name')] = _(el.innerHTML).template();
      return memo;
    }, {}),
    state: {'repo': ''},
    instance: null
};

window.args = _(window.app).toArray();

(function(config, models, views, routers, utils, templates) {
  $(function() {

    if (models.authenticate()) {
      models.loadApplication(function(err, data) {
        // Start the engines
        window.app.instance = new views.Application({ el: '.transformer-app', model: {} }).render();

        // Start responding to routes
        Backbone.history.start();
      });
    }
  });
}).apply(this, window.args);
