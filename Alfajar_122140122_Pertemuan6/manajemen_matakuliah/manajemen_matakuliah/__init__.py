from pyramid.config import Configurator
from pyramid.response import Response

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application. """
    with Configurator(settings=settings) as config:
        config.include('pyramid_jinja2')
        config.include('pyramid_tm')  
        config.include('.models')
        config.include('.routes')
        config.include('.views')
        config.scan()
        return config.make_wsgi_app()
