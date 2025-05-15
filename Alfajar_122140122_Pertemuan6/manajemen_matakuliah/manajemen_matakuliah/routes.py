def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # Tambah route untuk API
    config.add_route('matakuliah', '/api/matakuliah', request_method='GET')
    config.add_route('get_matakuliah_by_id', '/api/matakuliah/{id}', request_method='GET')
    config.add_route('add_matakuliah', '/api/matakuliah', request_method='POST')
    config.add_route('update_matakuliah', '/api/matakuliah/{id}', request_method='PUT')
    config.add_route('delete_matakuliah', '/api/matakuliah/{id}', request_method='DELETE')