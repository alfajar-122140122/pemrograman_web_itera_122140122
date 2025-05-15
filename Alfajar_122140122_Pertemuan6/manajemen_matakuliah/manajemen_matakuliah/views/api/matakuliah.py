from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound,
    HTTPCreated,
    HTTPOk,
    HTTPBadRequest,
    HTTPInternalServerError
)
from sqlalchemy.exc import DBAPIError

from ...models.matakuliah import MataKuliah

@view_config(route_name='matakuliah', renderer='json', request_method='GET')
def get_matakuliah(request):
    """Get all MataKuliah records."""
    try:
        matakuliah = request.dbsession.query(MataKuliah).all()
        return {'matakuliah': [m.to_dict() for m in matakuliah]}
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Database error occurred'})

@view_config(route_name='get_matakuliah_by_id', renderer='json', request_method='GET')
def get_matakuliah_by_id(request):
    """Get a single MataKuliah record by ID."""
    try:
        matakuliah_id = request.matchdict['id']
        matakuliah = request.dbsession.query(MataKuliah).get(matakuliah_id)
        if matakuliah is None:
            return HTTPNotFound(json={'error': 'MataKuliah not found'})
        return {'matakuliah': matakuliah.to_dict()}
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Database error occurred'})

@view_config(route_name='add_matakuliah', renderer='json', request_method='POST')
def add_matakuliah(request):
    """Add a new MataKuliah record."""
    try:
        data = request.json_body
        # Validate required fields
        required_fields = ['kode_matkul', 'nama_matkul', 'sks', 'semester']
        if not all(field in data for field in required_fields):
            return HTTPBadRequest(json={'error': 'Missing required fields'})

        matakuliah = MataKuliah(
            kode_matkul=data['kode_matkul'],
            nama_matkul=data['nama_matkul'],
            sks=data['sks'],
            semester=data['semester']
        )
        request.dbsession.add(matakuliah)
        request.dbsession.flush()
        return HTTPCreated(json={'matakuliah': matakuliah.to_dict()})
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Database error occurred'})
    except json.JSONDecodeError:
        return HTTPBadRequest(json={'error': 'Invalid JSON format'})

@view_config(route_name='update_matakuliah', renderer='json', request_method='PUT')
def update_matakuliah(request):
    """Update an existing MataKuliah record."""
    try:
        matakuliah_id = request.matchdict['id']
        data = request.json_body
        matakuliah = request.dbsession.query(MataKuliah).get(matakuliah_id)
        
        if matakuliah is None:
            return HTTPNotFound(json={'error': 'MataKuliah not found'})
        
        # Update fields if they exist in the request
        if 'kode_matkul' in data:
            matakuliah.kode_matkul = data['kode_matkul']
        if 'nama_matkul' in data:
            matakuliah.nama_matkul = data['nama_matkul']
        if 'sks' in data:
            matakuliah.sks = data['sks']
        if 'semester' in data:
            matakuliah.semester = data['semester']
        
        request.dbsession.flush()
        return HTTPOk(json={'matakuliah': matakuliah.to_dict()})
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Database error occurred'})
    except json.JSONDecodeError:
        return HTTPBadRequest(json={'error': 'Invalid JSON format'})

@view_config(route_name='delete_matakuliah', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    """Delete a MataKuliah record."""
    try:
        matakuliah_id = request.matchdict['id']
        matakuliah = request.dbsession.query(MataKuliah).get(matakuliah_id)
        
        if matakuliah is None:
            return HTTPNotFound(json={'error': 'MataKuliah not found'})
        
        request.dbsession.delete(matakuliah)
        return HTTPOk(json={'message': 'MataKuliah deleted successfully'})
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Database error occurred'})