def register_routes(app):
    from .projects import bp as projects_bp
    from .funding import bp as funding_bp
    from .users import bp as users_bp
    from .content import bp as content_bp
    app.register_blueprint(projects_bp)
    app.register_blueprint(funding_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(content_bp)
