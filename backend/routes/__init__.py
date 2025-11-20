def register_routes(app):
    from .projects_router import bp as projects_bp
    from .funding_router import bp as funding_bp
    from .users_router import bp as users_bp
    from .content_router import bp as content_bp
    app.register_blueprint(projects_bp)
    app.register_blueprint(funding_bp)
    app.register_blueprint(users_bp)
    app.register_blueprint(content_bp)
    return app
