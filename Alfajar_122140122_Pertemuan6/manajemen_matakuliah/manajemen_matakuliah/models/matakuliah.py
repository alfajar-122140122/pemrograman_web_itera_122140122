from sqlalchemy import (
    Column,
    Integer,
    String,
)

from .meta import Base


class MataKuliah(Base):
    """ Model untuk tabel mahasiswa """
    __tablename__ = 'mahasiswa'
    id = Column(Integer, primary_key=True)
    kode_matkul = Column(String, unique=True, nullable=False)
    nama_matkul = Column(String, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'kode_matkul': self.kode_matkul,
            'nama_matkul': self.nama_matkul,
            'sks': self.sks,
            'semester': self.semester
        }