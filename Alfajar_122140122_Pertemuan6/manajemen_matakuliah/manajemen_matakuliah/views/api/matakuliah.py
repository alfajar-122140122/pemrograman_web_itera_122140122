"""
Modul ini berisi endpoint API untuk manajemen data mata kuliah.
Menyediakan operasi CRUD (Create, Read, Update, Delete) untuk entitas mata kuliah.
"""

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
    """Mengambil semua data mata kuliah."""
    try:
        matakuliah = request.dbsession.query(MataKuliah).all()
        return {'matakuliah': [m.to_dict() for m in matakuliah]}
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Terjadi kesalahan pada database'})

@view_config(route_name='get_matakuliah_by_id', renderer='json', request_method='GET')
def get_matakuliah_by_id(request):
    """Mengambil data mata kuliah berdasarkan ID."""
    try:
        matakuliah_id = request.matchdict['id']
        matakuliah = request.dbsession.query(MataKuliah).get(matakuliah_id)
        if matakuliah is None:
            return HTTPNotFound(json={'error': 'Mata kuliah tidak ditemukan'})
        return {'matakuliah': matakuliah.to_dict()}
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Terjadi kesalahan pada database'})

@view_config(route_name='add_matakuliah', renderer='json', request_method='POST')
def add_matakuliah(request):
    """Menambahkan data mata kuliah baru."""
    try:
        data = request.json_body
        # Validasi field yang wajib diisi
        required_fields = ['kode_matkul', 'nama_matkul', 'sks', 'semester']
        if not all(field in data for field in required_fields):
            return HTTPBadRequest(json={'error': 'Data yang dikirim tidak lengkap'})

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
        return HTTPInternalServerError(json={'error': 'Terjadi kesalahan pada database'})
    except json.JSONDecodeError:
        return HTTPBadRequest(json={'error': 'Format JSON tidak valid'})

@view_config(route_name='update_matakuliah', renderer='json', request_method='PUT')
def update_matakuliah(request):
    """Memperbarui data mata kuliah yang sudah ada."""
    try:
        matakuliah_id = request.matchdict['id']
        data = request.json_body
        matakuliah = request.dbsession.query(MataKuliah).get(matakuliah_id)
        
        if matakuliah is None:
            return HTTPNotFound(json={'error': 'Mata kuliah tidak ditemukan'})
        
        # Memperbarui field jika ada di permintaan
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
        return HTTPInternalServerError(json={'error': 'Terjadi kesalahan pada database'})
    except json.JSONDecodeError:
        return HTTPBadRequest(json={'error': 'Format JSON tidak valid'})

@view_config(route_name='delete_matakuliah', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    """Menghapus data mata kuliah."""
    try:
        matakuliah_id = request.matchdict['id']
        matakuliah = request.dbsession.query(MataKuliah).get(matakuliah_id)
        
        if matakuliah is None:
            return HTTPNotFound(json={'error': 'Mata kuliah tidak ditemukan'})
        
        request.dbsession.delete(matakuliah)
        return HTTPOk(json={'message': 'Mata kuliah berhasil dihapus'})
    except DBAPIError:
        return HTTPInternalServerError(json={'error': 'Terjadi kesalahan pada database'})